
# CLIMATERIA · 气候万象志 ｜ AI 驱动的气候叙事与地理科普交互网站

> Climateria=Climate + Materia
    万物有灵，气候亦然。

## 团队 / 作者

个人开发者：SunnyLiyuxin

## 我做了什么

CLIMATERIA 是一款“无论你是否学过地理，都能在这里找到乐趣。”的 AI 交互式气候叙事 Web 应用。

很多人提及地理，脑海里浮现的是经纬线、气压带、洋流箭头，是考试前背不完的图和定义。
但地理，从来不只是这些。
很多初探者在接触气候知识时，只能面对地图上冰冷的色块和枯燥的数据，很难真正理解：不同气候带之间有何联系与差异、洋流与纬度如何塑造文明。传统的地理科普停留在"告知"层面，难以让人产生共鸣与记忆。

CLIMATERIA 将这一过程变成了一条可探索、可对话、可检验的旅程：

- **以全球真实气候分布图为底图，基于真实地理特征创作**，为27种气候类型建立了完整的“双血脉”谱系——父系以气候形态划分（雨林、草原、季风等），母系以温度带划分（热带、温带、寒带等），让每一种气候都拥有一个完整的身份坐标。
- **悬停 / 点击地图中任一圆点，展开四折经折装详情卡：**灵性 · 灵力 · 血脉 · 图鉴，含"敲黑板"地理考点
- **AI 可交互**：接入阿里云百炼通义千问，让每位气候之灵成为"可对话的智能体"，支持自由问答、角色扮演与上下文记忆。
- **AI 根据角色设定实时出题考验**，检验用户的地理知识掌握程度
- **集成通义万相文生图**与 CosyVoice 语音合成，让角色既能生成专属卡牌，又能"开口说话"。（正在开发此功能）
- **跨端自适应**：基于视口单位与 CSS 媒体查询的响应式布局引擎，同一套代码在桌面宽屏与移动窄屏间无缝切换；桌面端支持鼠标悬停预览、滚轮缩放，移动端支持多点触控、惯性滑动与边界阻尼回弹，圆点与底图始终同步对齐

> 我希望通过 CLIMATERIA，把过去望而却步的气候知识，转化为一种更加直观、人格化、可对话的学习方式——让气候被感知、被记住、被回望。

### 适合谁？
**不需要地理基础，不需要知识储备——只要你曾对世界好奇过，就能走进来。**
以及——
- **地理热爱者**：对世界气候充满好奇，想要探索不同气候带之间的联系与差异，喜欢从全局视角俯瞰地球脉络的人
- **地理启蒙者**：初次接触气候知识，希望寓教于乐，通过形象生动的方式让地理知识丝滑进入大脑的学习者
- **万物有灵者**：相信万物皆有灵魂，着迷于为自然现象赋予人格与故事，想了解每一种气候独特性与生命叙事的人
- **地理学习者**：需要在实践中检验知识掌握程度的学习者——系统配备 AI 自由问答与实时出题考验，让每一次学习都被即时反馈

## 使用的工具

**百炼能力 / 模型**
- Provider 为 `aliyun`，通过阿里云百炼（DashScope）平台直接接入，未使用 OpenWork
- 通义千问 `qwen-plus`：角色对话、自由问答、智能出题、上下文记忆（流式 SSE 透传）
- 通义万相 `wanx2.1-t2i-turbo`：文生图，为角色生成专属卡牌画像
- CosyVoice / TTS：语音合成，让气候之灵"开口说话"
- Skill 名称：暂无独立发布的 Skill，目前采用应用内多阶段对话工作流与结构化输出约束

**前端**
- HTML5 + CSS3 + 原生 JavaScript（无任何框架依赖）
- 自研触控交互算法：惯性滑动 + 边界阻尼回弹，支持 touch / mouse 双输入
- 响应式布局：视口单位 + 媒体查询，桌面宽屏与移动窄屏同一套代码无缝切换

**后端 / 部署**
- Node.js 零依赖代理服务（仅用内置 http/https/fs/path 模块，无需 `npm install`）
- 阿里云 ECS：应用部署环境，Nginx 静态资源服务
- 本地 JSON 文件：27 位角色档案持久化（传记、地理数据、彩蛋、画像路径）

**开发工具**
- Trae IDE：需求拆解、代码实现、调试与工程验收
- GPT image2：项目素材生图（角色画像、底图、视觉元素辅助生成）
- 阿里云 Workbench：服务器文件管理与远程部署
- GitHub：源码管理、版本治理与问题追踪

## 效果展示

CLIMATERIA 当前可完成"首页叙事 → 灵契签订（虚拟登录）→万象图、谱系、罗盘探索 → 人物详情阅读 → 剧情观看模式→ AI 对话 → 知识检验 "的完整流程。

主要效果包括：

- 三段式卷轴叙事开场，以"传说"方式进入世界

<img width="3028" height="1644" alt="Image" src="https://github.com/user-attachments/assets/20e5e166-ae94-4018-aa14-16a165994cb2" />

- 27 个发光圆点悬浮于世界气候图之上，悬停预览、点击阅读、左右拖拽

<img width="3024" height="1628" alt="Image" src="https://github.com/user-attachments/assets/d526c9e0-6773-4331-b55c-851b9331f1dd" />

- 四折经折装人物详情卡：灵性 · 灵力 · 血脉 · 图鉴，含"敲黑板"地理考点
<img width="3040" height="1630" alt="Image" src="https://github.com/user-attachments/assets/516eb00c-b5c7-4794-a431-3e20b537bea5" />

<img width="3014" height="1624" alt="Image" src="https://github.com/user-attachments/assets/111ec89b-9f3b-4374-84b0-a056ea7368ab" />

<img width="3036" height="1632" alt="Image" src="https://github.com/user-attachments/assets/8d9d206b-251a-4f24-ba8b-bb96b92953eb" />

- 8 种自然化身（雨/阳/云/雪/风/雷/虹/月）灵契系统，单击选中、签订保存
- 谱系：以血脉星树的形式呈现9大家族的亲缘关系，点击任意角色节点，可查看其完整详情卡片。
   罗盘：以同心圆温度星盘展示气候带分布，点击任意角色节点，可查看其完整详情卡片。
<div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
  <a href="https://github.com/user-attachments/assets/52e512d7-f9cd-4386-a990-a20cacb2eebe" target="_blank">
    <img width="400" src="https://github.com/user-attachments/assets/52e512d7-f9cd-4386-a990-a20cacb2eebe" alt="罗盘" />
  </a>
  <a href="https://github.com/user-attachments/assets/9484891e-44bb-4778-aecb-0cbd8f3d9581" target="_blank">
    <img width="400" src="https://github.com/user-attachments/assets/9484891e-44bb-4778-aecb-0cbd8f3d9581" alt="谱系" />
  </a>
</div>

- 气候之灵的交互式对话剧场——以视觉小说形式呈现不同气候之间的相遇、对峙与约定
<img width="3022" height="1620" alt="Image" src="https://github.com/user-attachments/assets/83e52283-cf1f-44d9-8a18-3324ba76c139" />

<img width="3038" height="1506" alt="Image" src="https://github.com/user-attachments/assets/a5869396-a23f-40f6-afce-39c0f5b20809" />

- AI 驱动的对话与答题：与气候之灵自由对话、生成并本地保存人物卡片、跨家族叙事、智能出题考验
<div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
  <a href="https://github.com/user-attachments/assets/ec76d901-52af-4597-9064-1421c4345310" target="_blank">
    <img width="400" src="https://github.com/user-attachments/assets/ec76d901-52af-4597-9064-1421c4345310" alt="人物问答卡片" />
  </a>
  <a href="https://github.com/user-attachments/assets/2c923ec6-0f14-4784-92d6-a33dc08ff404" target="_blank">
    <img width="400" src="https://github.com/user-attachments/assets/2c923ec6-0f14-4784-92d6-a33dc08ff404" alt="人物自由问答" />
  </a>
  <a href="https://github.com/user-attachments/assets/b69d2081-ef20-4822-9c75-becbb5c94e54" target="_blank">
    <img width="400" src="https://github.com/user-attachments/assets/b69d2081-ef20-4822-9c75-becbb5c94e54" alt="人物知识点小测试" />
  </a>
  <a href="https://github.com/user-attachments/assets/5f3237cf-0249-49c6-85bd-37dd17b3b7b8" target="_blank">
    <img width="400" src="https://github.com/user-attachments/assets/5f3237cf-0249-49c6-85bd-37dd17b3b7b8" alt="人物实时生图" />
  </a>
</div>
- 桌面端与移动端行为一致，触屏拖拽带惯性回弹。
- AI 服务不可用时自动降级为预设对话。


## 项目链接

- 在线访问：[点击访问 CLIMATERIA](http://116.62.139.39:3000/)  http://116.62.139.39:3000/
- 源码仓库：[https://github.com/SunnyLiyuxin/CLIMATERIA-](https://github.com/SunnyLiyuxin/CLIMATERIA-)
- 使用说明：见下方「本地部署」
> 项目已部署于阿里云 ECS，可通过「项目链接」中的在线地址直接访问。


## 踩坑记录

### 1. 浏览器直连百炼 API 会被 CORS 拦截
前端直接调用 `dashscope.aliyuncs.com` 会被跨域策略阻断。解决方案是写同源 Node 代理（`server.js`），转发 `/api/chat`、`/api/tts`、`/api/image` 三类请求。

### 2. 大模型输出不稳定，需要离线降级
通义千问角色扮演时偶现格式漂移、上下文丢失或响应超时。项目未把模型回答直接抛给用户，而是增加预设对话兜底：AI 不可用或异常时自动切换角色预设台词，保证对话不中断。

### 3. 移动端地图拖拽比桌面端复杂得多
桌面端滚轮缩放即可，移动端需同时处理多点触控判定、惯性速度计算、边界阻尼回弹、圆点与底图同步对齐。早期曾出现圆点与底图错位，最终通过将二者置于同一变换容器、共享 transform 矩阵解决。

### 4. 移动端头像网格重复渲染
化身面板在移动端曾出现 16 个化身（8 个重复两遍），上面 8 个无法选中。根因是渲染函数被重复触发却未清空容器。修复：每次渲染前 `grid.innerHTML = ''` 清空，并统一两端渲染入口。

### 5. 部署时文件属主与上传工具的坑
服务器目录原属主为 root，admin 无法直接覆盖；Workbench 文件传输偶现文件名拼接异常或文件被重复追加。

## 开源协议

本项目采用 **MIT License**。

```
MIT License

Copyright (c) 2026 SunnyLiyuxin

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

## 版权声明

本项目代码遵循 MIT License 开源，但**项目中的角色设定、人物传记、视觉体系、叙事文本等原创内容**（以下简称"原创内容"）受如下附加条款约束：

- © 2026 CLIMATERIA · 气候万象志. 作者：SunnyLiyuxin. 保留所有权利。
- **凡涉及商用或二次创作**，**必须事先取得作者书面许可**，未获许可前不得进行。
- 获得许可后，需在衍生作品中清晰标注原作者署名及本项目名称。
- 本声明不影响 MIT License 对代码部分的开源授权；如两者对同一内容存在冲突，以本声明中更为严格的条款为准。

> 即：代码可以自由使用与修改，但基于本项目原创内容的任何商业用途或二次创作，请先联系作者取得同意。

## 鸣谢 / 免责声明

### 鸣谢
- 感谢 **阿里云百炼（Bailian / DashScope）** 提供的通义千问、通义万相、CosyVoice 等 AI 能力
- 感谢 **阿里云（Alibaba Cloud）** 提供的云基础设施与部署环境

### 免责声明

1. 本项目仅供学习与个人研究使用，不得随意用于商业目的。用户应自行承担使用风险。
2. 27 位"气候之灵"的角色设定均为基于地理气候特征的**虚构创作**，不构成学术权威结论。地理知识部分力求准确，但仍建议以权威教材为准。
3. 问灵剧场对话内容由大语言模型实时生成，可能存在事实性偏差，不应作为权威知识来源。
4. AI 对话功能依赖外部 API 服务，其可用性受网络环境、服务配额、平台策略等因素影响，本项目不对服务连续性作任何保证。

---

*—— 万物有灵，气候亦然。*
