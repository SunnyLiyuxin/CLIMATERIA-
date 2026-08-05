# CLIMATERIA · 气候万象志

> 万物有灵，气候亦然。

一部以"通感"方式重构气候与文明关系的交互式数字地图册。我们用文学赋予气候以人格，用地理赋予人格以根基，用交互赋予根基以生命——让每一位用户都能像翻阅一部古老的手稿，去感受那些被忽视的、沉默的联系。

---

## 一、项目简介

**CLIMATERIA · 气候万象志** 是一个以"通感"为核心方法论的 AI 交互式气候叙事 Web 应用。它以全球真实气候分布图为底图，将 27 位基于真实地理特征创作的"气候之灵"悬浮其上，通过 AI 实时对话引擎赋予每一位角色以"可对话的灵魂"——用户不仅能阅读角色的灵性档案，更能与之展开自由问答与知识考验。

这不是一套静态的科普工具，而是一个**由 AI 驱动的活态叙事场域**：文学赋予气候以人格，地理赋予人格以根基，交互赋予根基以生命。

### 它适合谁？

- **地理热爱者**：对世界气候充满好奇，想要探索不同气候带之间的联系与差异，喜欢从全局视角俯瞰地球脉络的人
- **地理启蒙者**：初次接触气候知识，希望寓教于乐，通过形象生动的方式让地理知识丝滑进入大脑的学习者
- **万物有灵者**：相信万物皆有灵魂，着迷于为自然现象赋予人格与故事，想了解每一种气候独特性与生命叙事的人
- **地理学习者**：需要在实践中检验知识掌握程度的学习者——系统配备 AI 自由问答与实时出题考验，让每一次学习都被即时反馈

---

## 二、核心亮点

### 🤖 AI 可交互 · 赋予气候以灵魂（AIGC）
- **AI 实时对话引擎**：每位气候之灵都是一个"可对话的智能体"，接入阿里云百炼大模型平台，支持自由问答、角色扮演、上下文记忆
- **智能出题考验**：AI 根据角色设定与知识库实时生成测验题目，检验用户的地理知识掌握程度
- **多模态生成**：集成文本对话、语音合成（TTS）、文生图（通义万相）能力，让角色既能"开口说话"又能生成专属卡牌
- **离线降级**：AI 服务不可用时自动切换至预设对话，体验永不中断

### 🌍 通感叙事 · 文学化地理
- **27 位气候之灵**：每位角色均基于真实气候带、洋流、纬度、海拔创作，命名、性格、意象都承载着真实的地理知识
- **四折经折装详情卡**：左图右史的人物档案，融合灵性、灵力、血脉、图鉴四重叙事结构
- **不架空的地理**：所有地理知识直接对应学科考点，知识随故事自然流淌

### ✨ 沉浸式视觉体系
- **东西方融合**：羊皮纸底图 + 金箔贴边 + 朱砂印章 + 中式工笔重彩 + 西方古典版画
- **三段式开场仪式**：卷轴摊开的叙事动画，不可跳过的入场仪式
- **金线蚀刻美学**：古星图 × 金碧山水 × 矿物色，呈现神性光辉与传世感

### 📱 跨端自适应 · 全设备一致体验
- **响应式布局引擎**：基于视口单位（vw/vh）与 CSS 媒体查询构建流式布局系统，同一套代码在桌面宽屏与移动窄屏间无缝切换，无需独立维护两套页面
- **多模态输入适配**：桌面端支持鼠标悬停预览、滚轮缩放、精确点击；移动端支持多点触控、惯性滑动、边界阻尼回弹，圆点与底图始终同步对齐
- **交互语义统一**：化身选择、灵契签订、AI 对话等核心交互在所有设备上保持行为与视觉一致，确保跨设备体验的连贯性

---

## 三、功能概览

| 模块 | 状态 | 核心能力 |
|------|------|---------|
| **首页 · 卷轴摊开** | ✅ | 三段式叙事动画，以"传说"方式进入世界 |
| **万象图 · 灵性探索** | ✅ | 27 个发光圆点悬浮于世界气候图之上，悬停预览、点击阅读、左右拖拽 |
| **人物详情卡片** | ✅ | 四折经折装：灵性 · 灵力 · 血脉 · 图鉴，含"敲黑板"地理考点 |
| **灵契化身系统** | ✅ | 8 种自然化身（雨/阳/云/雪/风/雷/虹/月），单击选中、签订灵契 |
| **问灵剧场** | ✅ | AI 驱动的角色对话，跨家族叙事，支持离线降级 |
| **九州志** | 🚧 | 中国气候版图 · 五方气候之灵（开发中） |
| **谱系** | 📋 | 9 大家族血脉图谱（规划中） |
| **罗盘** | 📋 | 温度带同心罗盘（规划中） |

---

## 四、技术栈

本项目以"零框架依赖"为原则，全部基于原生 Web 技术构建，仅在 AI 能力层接入云端大模型服务。

### 前端
- **HTML5**：语义化结构，单页应用（SPA）式页面切换
- **CSS3**：自定义属性、Flexbox/Grid 布局、动画关键帧、媒体查询响应式适配
- **JavaScript（原生）**：无任何框架依赖，DOM 操作、事件系统、状态管理均为原生实现
- **触控交互**：自研惯性滑动 + 边界阻尼回弹算法，支持 touch / mouse 双输入

### 后端 / API（阿里云百炼 DashScope）
本项目接入 **阿里云百炼（Bailian）大模型服务平台**（DashScope），通过同一套 API Key 调用以下三类大模型能力：

- **通义千问（Qwen-Plus）**：驱动问灵剧场的核心对话引擎，处理角色扮演、上下文记忆、自由问答与智能出题
- **通义万相（Wanx2.1-T2I-Turbo）**：文生图模型，为角色生成专属卡牌画像
- **CosyVoice / TTS**：语音合成模型，让气候之灵"开口说话"

> **API 接入方式**：API Key 在阿里云百炼控制台创建（[bailian.console.aliyun.com](https://bailian.console.aliyun.com)），格式为 `sk-xxxxxxxx`。前端不直接持有 Key，由 Node.js 代理层（`server.js`）统一转发请求至 `dashscope.aliyuncs.com`，避免凭证泄露。

### 云服务与部署
- **阿里云（Alibaba Cloud）**：基础设施托管
- **阿里云 ECS**：应用部署环境，Nginx 静态资源服务
- **Node.js 代理层**：负责 API 密钥托管与请求转发，保护后端凭证不暴露至前端

### 数据存储
- **本地 JSON 文件**：27 位角色的完整档案（传记、地理数据、彩蛋、画像路径）以 JSON 形式存储于服务端目录
- **WebP 静态资源**：所有人物画像、底图、背景图均采用 WebP 格式压缩，兼顾画质与加载性能

---

## 五、本地部署 / 安装步骤

### 环境要求
- 任意现代浏览器（Chrome 90+ / Edge 90+ / Safari 14+ / Firefox 88+）
- 如需启用 AI 对话功能：Node.js 16+（用于运行代理服务）

### 快速开始

1. **克隆或下载项目**至本地目录
2. **配置 AI 服务（推荐）**
   - **获取 API Key**：登录 [阿里云百炼控制台](https://bailian.console.aliyun.com) → 左侧「API-KEY 管理」→ 创建新的 API Key（格式 `sk-xxxxxxxx`）→ 复制保存
   - **写入 Key**：在项目根目录创建 `bailian-key.txt` 文件，将复制的 API Key 粘贴进去（仅一行，无需其他内容）
   - **（可选）环境变量方式**：也可通过 `export DASHSCOPE_API_KEY=sk-xxxxxxxx` 设置环境变量，优先级高于文件
   - **启动代理服务**：`node server.js`（默认监听 3000 端口，负责转发对话 / 文生图 / TTS 三类请求至百炼平台）
   - **验证**：启动后访问 `http://localhost:3000`，进入问灵剧场发起对话，若 AI 正常回应则配置成功
3. **打开页面**
   - 双击 `index.html` 直接在浏览器打开（基础浏览功能）
   - 或通过本地服务器访问（推荐）：`python3 -m http.server 8000`，然后访问 `http://localhost:8000`
4. **体验流程**
   - 等待首页三段式叙事动画结束
   - 点击「展开图卷」进入万象图
   - 悬停/点击圆点探索 27 位气候之灵
   - 点击右上角头像 → 选择化身 → 输入名讳 → 签订灵契

### 生产部署（阿里云 ECS）

1. 将项目文件上传至 ECS 实例的 Web 根目录（如 `/www/climateria/`）
2. 配置 Nginx 指向该目录，启用 WebP MIME 类型与 Gzip 压缩
3. 启动 Node 代理服务（建议用 PM2 守护）：`pm2 start server.js --name climateria-proxy`
4. 配置 Nginx 反向代理，将 `/api/*` 转发至 Node 服务端口

---

## 六、目录结构说明

```
climateria/
├── index.html                  # 生产部署主页面（首页 + 万象图 + 详情卡片）
├── editable_page.html          # 可编辑开发版本（与 index.html 内容同步）
├── server.js                   # Node.js 代理服务（AI API 密钥托管与请求转发）
├── bailian-key.txt             # 百炼平台 API Key（部署时创建，不入版本库）
├── README.md                   # 项目说明文档
│
├── 世界气候地图.webp           # 万象图底图（世界气候分布图）
├── 首页背景底图.webp           # 首页卷轴背景图
├── 人物详情页底图.webp         # 人物详情卡片底图
├── 底部牛皮纸（新）.webp       # 卷轴/卡片牛皮纸纹理
├── 牛皮卡牌_cutout.webp        # 卡牌镂空素材
├── 第二幕背景图.webp           # 叙事第二幕背景
│
├── *.json                      # 27 位角色档案（如 yara.json / gu_lan.json / hikari.json 等）
├── *.webp / *.png              # 27 位角色画像（静态 + 立牌）
└── images/characters/          # 角色画像目录（如使用子目录组织）
```

> 角色档案 JSON 包含字段：`name` / `climate` / `personality` / `powers` / `bloodline` / `geo` / `examPoints`（敲黑板考点）/ `easter`（地域文化彩蛋）/ `image`（画像路径）等。

---

## 七、开源协议

本项目采用 **MIT License** 开源协议。

```
MIT License

Copyright (c) 2026 摇曳的树(AI版)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 八、鸣谢 / 免责声明

### 鸣谢
- 感谢 **阿里云百炼（Bailian / DashScope）大模型服务平台** 提供的通义千问、通义万相、CosyVoice 等 AI 能力支持
- 感谢 **阿里云（Alibaba Cloud）** 提供的云基础设施与部署环境
- 感谢所有为气候科普、地理教育、文化传承贡献力量的人们

### 免责声明

1. **使用范围**：本项目仅供学习与个人研究使用，不得用于任何商业目的。用户应自行承担使用本项目的全部风险。

2. **内容性质**：项目中 27 位"气候之灵"的角色设定、命名、传记、文化彩蛋均为基于全球各民族文化与地理气候特征的**虚构创作**，不构成任何学术权威结论。地理知识部分力求准确，但仍建议以权威教材为准。

3. **AI 生成内容**：问灵剧场中的对话内容由大语言模型实时生成，可能存在事实性偏差或不准确表述。用户不应将其作为权威知识来源，重要信息请以专业资料核实。

4. **知识产权**：角色设定、视觉体系、交互逻辑均为原创设计。如第三方 AI 服务的数据使用政策与本声明存在冲突，以第三方服务条款为准。

5. **服务可用性**：AI 对话功能依赖外部 API 服务，其可用性受网络环境、服务配额、平台策略等因素影响，本项目不对服务连续性作任何保证。

---

*—— 万物有灵，气候亦然。*

*作者：摇曳的树(AI版)*
