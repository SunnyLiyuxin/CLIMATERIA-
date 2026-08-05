/*
 * CLIMATERIA · 气候万象志 —— 阿里云百炼 AI 代理服务器
 * ------------------------------------------------------------
 * 作用：浏览器直连 DashScope 会被 CORS 拦截，本服务作为同源代理，
 *      转发三类请求到阿里云百炼（DashScope）：
 *        1) POST /api/chat   → 通义千问对话（流式 SSE）
 *        2) POST /api/tts    → 语音合成（让人物“开口说话”）
 *        3) POST /api/image  → 通义万相文生图（生成人物卡牌）
 *      同时把本目录作为静态站点对外提供。
 *
 * 零依赖：仅使用 Node.js 内置模块（http/https/fs/path/url），无需 npm install。
 *
 * API Key 读取顺序（任选其一）：
 *   1) 环境变量 DASHSCOPE_API_KEY
 *   2) 同目录下 bailian-key.txt 文件（把 sk-xxxx 粘贴进去即可）
 *
 * 启动： node server.js    然后浏览器打开 http://localhost:3000/
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;

// —— 读取 API Key ——
function loadApiKey() {
    if (process.env.DASHSCOPE_API_KEY && process.env.DASHSCOPE_API_KEY.trim()) {
        return process.env.DASHSCOPE_API_KEY.trim();
    }
    const keyFile = path.join(ROOT, 'bailian-key.txt');
    try {
        if (fs.existsSync(keyFile)) {
            const raw = fs.readFileSync(keyFile, 'utf8').trim();
            // 取文件里第一个 sk- 开头的串，忽略注释行
            // 支持 Key 中含字母、数字、点、下划线、减号（部分新版 Key 形如 sk-ws-H.ELRLIL...）
            const m = raw.match(/sk-[A-Za-z0-9._-]+/);
            if (m) return m[0];
        }
    } catch (e) { /* 忽略 */ }
    return '';
}
const API_KEY = loadApiKey();
const DASHSCOPE_HOST = 'dashscope.aliyuncs.com';

// —— 静态文件 MIME ——
const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.mp3': 'audio/mpeg',
    '.wav': 'audio/wav'
};

// —— 工具：读取请求体 ——
function readBody(req) {
    return new Promise((resolve) => {
        let buf = '';
        req.on('data', c => buf += c);
        req.on('end', () => resolve(buf));
    });
}

// —— 工具：发送 JSON ——
function sendJson(res, code, obj) {
    const body = JSON.stringify(obj);
    res.writeHead(code, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    });
    res.end(body);
}

// —— 向 DashScope 发起请求，返回 {status, headers, body} ——
function dashscopeRequest(method, pathStr, bodyObj, extraHeaders) {
    return new Promise((resolve) => {
        const payload = bodyObj ? JSON.stringify(bodyObj) : null;
        const headers = Object.assign({
            'Authorization': 'Bearer ' + API_KEY,
            'Content-Type': 'application/json'
        }, extraHeaders || {});
        if (payload) headers['Content-Length'] = Buffer.byteLength(payload);

        const opts = {
            hostname: DASHSCOPE_HOST,
            port: 443,
            path: pathStr,
            method: method,
            headers: headers
        };
        const r = https.request(opts, (resp) => {
            let data = '';
            resp.on('data', c => data += c);
            resp.on('end', () => resolve({ status: resp.statusCode, headers: resp.headers, body: data }));
        });
        r.on('error', (e) => resolve({ status: 0, error: String(e) }));
        if (payload) r.write(payload);
        r.end();
    });
}

// —— 1) /api/chat：对话代理（流式 SSE 透传） ——
// 前端 POST {messages:[...], model:"qwen-plus"}
async function handleChat(req, res, body) {
    if (!API_KEY) return sendJson(res, 401, { error: '服务器未配置 API Key，请在 bailian-key.txt 或环境变量 DASHSCOPE_API_KEY 中填入百炼 API Key。' });
    let parsed;
    try { parsed = JSON.parse(body); } catch (e) { return sendJson(res, 400, { error: '请求体不是合法 JSON' }); }
    const messages = Array.isArray(parsed.messages) ? parsed.messages : [];
    const model = parsed.model || 'qwen-plus';

    const payload = JSON.stringify({
        model: model,
        messages: messages,
        stream: true,
        temperature: 0.85,
        top_p: 0.9
    });

    const opts = {
        hostname: DASHSCOPE_HOST, port: 443,
        path: '/compatible-mode/v1/chat/completions', method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + API_KEY,
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream',
            'Content-Length': Buffer.byteLength(payload)
        }
    };
    const upstream = https.request(opts, (resp) => {
        if (resp.statusCode !== 200) {
            let d = '';
            resp.on('data', c => d += c);
            resp.on('end', () => sendJson(res, 502, { error: '百炼返回错误 ' + resp.statusCode, detail: d }));
            return;
        }
        // 透传 SSE 流
        res.writeHead(200, {
            'Content-Type': 'text/event-stream; charset=utf-8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        });
        resp.pipe(res);
    });
    upstream.on('error', (e) => sendJson(res, 502, { error: '无法连接百炼服务：' + String(e) }));
    upstream.write(payload);
    upstream.end();
}

// —— 2) /api/image：文生图代理（异步：建任务 + 轮询结果） ——
// 前端 POST {prompt:"...", size:"1024*1024"}
async function handleImage(req, res, body) {
    if (!API_KEY) return sendJson(res, 401, { error: '未配置 API Key' });
    let parsed;
    try { parsed = JSON.parse(body); } catch (e) { return sendJson(res, 400, { error: '请求体不是合法 JSON' }); }
    const prompt = (parsed.prompt || '').toString();
    const size = parsed.size || '1024*1024';
    if (!prompt) return sendJson(res, 400, { error: 'prompt 为空' });

    // 步骤 1：创建任务
    const create = await dashscopeRequest('POST', '/api/v1/services/aigc/text2image/image-synthesis', {
        model: 'wanx2.1-t2i-turbo',
        input: { prompt: prompt },
        parameters: { size: size, n: 1 }
    }, { 'X-DashScope-Async': 'enable' });
    if (create.status === 0) return sendJson(res, 502, { error: '网络错误：' + create.error });
    if (create.status !== 200) return sendJson(res, 502, { error: '建图任务创建失败 ' + create.status, detail: create.body });
    let taskId;
    try { taskId = JSON.parse(create.body).output.task_id; } catch (e) {}
    if (!taskId) return sendJson(res, 502, { error: '未返回 task_id', detail: create.body });

    // 步骤 2：轮询任务结果（最多约 60 秒）
    const queryPath = '/api/v1/tasks/' + taskId;
    for (let i = 0; i < 40; i++) {
        await new Promise(r => setTimeout(r, 1500));
        const q = await dashscopeRequest('GET', queryPath, null, {});
        if (q.status !== 200) continue;
        let j;
        try { j = JSON.parse(q.body); } catch (e) { continue; }
        const status = j && j.output && j.output.task_status;
        if (status === 'SUCCEEDED') {
            const results = j.output.results || [];
            const imgUrl = results[0] && results[0].url;
            if (!imgUrl) return sendJson(res, 502, { error: '任务成功但无图片 URL', detail: q.body });
            return sendJson(res, 200, { url: imgUrl });
        }
        if (status === 'FAILED') return sendJson(res, 502, { error: '文生图任务失败', detail: q.body });
        // PENDING / RUNNING 继续轮询
    }
    return sendJson(res, 504, { error: '文生图超时，请稍后重试', task_id: taskId });
}

// —— 3) /api/quiz：AI 生成高考地理选择题（非流式，返回 JSON） ——
// 前端 POST {char:{name,climate,region,country,family,...}}
async function handleQuiz(req, res, body) {
    if (!API_KEY) return sendJson(res, 401, { error: '未配置 API Key' });
    let parsed;
    try { parsed = JSON.parse(body); } catch (e) { return sendJson(res, 400, { error: '请求体不是合法 JSON' }); }
    const char = parsed.char || {};
    // 构造让通义千问生成考题的 prompt
    const sysPrompt = '你是高考地理命题专家。请基于角色设定，生成 5 道关于该气候/地理区域的单选题，' +
        '难度对标中国高考地理，考察气候成因、分布、特征、植被土壤、农业、典型地理现象等。' +
        '严格按 JSON 格式返回，不要任何额外文字。JSON 结构：' +
        '{"quiz":[{"question":"题目","options":["A选项","B选项","C选项","D选项"],"correct":0,"explanation":"解析"}]}' +
        '其中 correct 是正确选项的索引（0-3）。题目必须科学准确，符合中国高考地理教材。';
    const userPrompt = '角色：' + (char.name || '') + '\n' +
        '气候类型：' + (char.climate || '') + '\n' +
        '守护地区：' + (char.region || '') + '（' + (char.country || '') + '）\n' +
        '家族：' + (char.family || '') + '\n' +
        '人物设定：' + (char.fullDescription || '') + '\n\n' +
        '请生成 5 道关于该气候/地区的高考地理单选题。';

    const payload = JSON.stringify({
        model: 'qwen-plus',
        messages: [
            { role: 'system', content: sysPrompt },
            { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        top_p: 0.9,
        response_format: { type: 'json_object' }
    });
    const opts = {
        hostname: DASHSCOPE_HOST, port: 443,
        path: '/compatible-mode/v1/chat/completions', method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + API_KEY,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(payload)
        }
    };
    const r = await new Promise((resolve) => {
        const upstream = https.request(opts, (resp) => {
            let data = '';
            resp.on('data', c => data += c);
            resp.on('end', () => resolve({ status: resp.statusCode, body: data }));
        });
        upstream.on('error', (e) => resolve({ status: 0, error: String(e) }));
        upstream.write(payload);
        upstream.end();
    });
    if (r.status === 0) return sendJson(res, 502, { error: '网络错误：' + r.error });
    if (r.status !== 200) return sendJson(res, 502, { error: '百炼返回 ' + r.status, detail: r.body });
    try {
        const outer = JSON.parse(r.body);
        const content = outer.choices && outer.choices[0] && outer.choices[0].message && outer.choices[0].message.content;
        if (!content) return sendJson(res, 502, { error: 'AI 未返回内容', detail: r.body });
        // content 应该是 JSON 字符串
        const quizObj = JSON.parse(content);
        if (!quizObj.quiz || !Array.isArray(quizObj.quiz) || !quizObj.quiz.length) {
            return sendJson(res, 502, { error: 'AI 返回的考题格式错误', detail: content });
        }
        return sendJson(res, 200, { quiz: quizObj.quiz });
    } catch (e) {
        return sendJson(res, 502, { error: '解析 AI 考题失败：' + String(e), detail: r.body });
    }
}

// —— 静态文件服务 ——
function serveStatic(req, res, pathname) {
    let filePath = decodeURIComponent(pathname);
    if (filePath === '/' || filePath === '') filePath = '/index.html';
    filePath = path.join(ROOT, filePath);
    // 防目录穿越
    if (!filePath.startsWith(ROOT)) return sendJson(res, 403, { error: '禁止访问' });

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>404 Not Found</h1><p>' + path.basename(filePath) + '</p>');
            return;
        }
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, {
            'Content-Type': MIME[ext] || 'application/octet-stream',
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        });
        res.end(data);
    });
}

// —— 主服务 ——
const server = http.createServer(async (req, res) => {
    const parsed = url.parse(req.url, true);
    const pathname = parsed.pathname;
    const method = req.method;

    // CORS 预检
    if (method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        return res.end();
    }

    // 状态接口：前端用来探测 AI 是否可用
    if (method === 'GET' && pathname === '/api/status') {
        return sendJson(res, 200, {
            aiEnabled: !!API_KEY,
            model: 'qwen-plus',
            message: API_KEY ? '百炼 AI 已就绪' : '未配置 API Key，将使用离线问答模式'
        });
    }

    // API 路由
    if (method === 'POST' && pathname === '/api/chat') {
        const body = await readBody(req);
        return handleChat(req, res, body);
    }
    if (method === 'POST' && pathname === '/api/image') {
        const body = await readBody(req);
        return handleImage(req, res, body);
    }
    if (method === 'POST' && pathname === '/api/quiz') {
        const body = await readBody(req);
        return handleQuiz(req, res, body);
    }

    // 其余走静态
    return serveStatic(req, res, pathname);
});

server.listen(PORT, () => {
    console.log('==================================================');
    console.log('  CLIMATERIA · 气候万象志 —— AI 代理服务已启动');
    console.log('==================================================');
    console.log('  访问地址： http://localhost:' + PORT + '/');
    console.log('  AI 状态 ： ' + (API_KEY ? '已配置 API Key（AI 对话可用）' : '未配置 API Key（离线问答模式）'));
    if (!API_KEY) {
        console.log('  ── 配置方法 ──');
        console.log('  方式1：把百炼 API Key 粘贴进同目录 bailian-key.txt 文件');
        console.log('  方式2：启动时设置环境变量  DASHSCOPE_API_KEY=sk-xxxx node server.js');
    }
    console.log('  按 Ctrl+C 停止服务');
    console.log('==================================================');
});
