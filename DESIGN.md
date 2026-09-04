# Elio Workbench · DESIGN.md
> 2026 Vibe Coding 品牌设计系统 · 基于「液态玻璃 2.0 + 果冻气泡 Signature + 赤陶橙反 AI 五件套」

---

## 0. 品牌识别速查

| 维度 | 标识 | 示例 |
|---|---|---|
| 主色（反AI 赤陶橙） | `#E07A5F → #E76F51 → #F4A261` 渐变 | 所有 CTA 主按钮 `.btn-primary` |
| 品牌识别色（果冻深紫） | `#5D3FD3 → #311E85` + `#C4B5FD` 高光 | sidebar logo-mark / banner-jelly / 品牌角标 |
| 主标题字体（反AI 衬线） | 霞鹜文楷 / LXGWWenKai / serif 家族 | `.page-title` / `.card-title` / `.section-title` |
| 正文字体（无衬线） | -apple-system / SF Pro / HarmonyOS Sans / Inter | `body` 默认 |
| 差异化半径系统 | `--r-banner:0` / `--r-card:26px` / `--r-btn:14px` | 避免「全是胶囊」的 AI 感 |

---

## 1. 色彩系统：6 套 Aurora 主题

**调用方式**：`body.theme-<id>`；JS 入口：`applyTheme(id, persist=true)`。

| id | 名称 | 主色调 + 背景光斑 | 典型场景 |
|---|---|---|---|
| `default` | 🌌 银河紫（默认） | `#5D3FD3 / #3B82F6 / #EC4899` 三层 aurora-glow | 工作台日常 |
| `sunrise` | 🌅 日出赤陶 | `#E07A5F / #F4A261 / #FBBF24` · 暖色光斑 | 早晨 / 创作 |
| `ocean` | 🌊 海洋青蓝 | `#0EA5A5 / #38BDF8 / #6366F1` · 清凉光斑 | 下午 / 冷静型任务 |
| `forest` | 🌲 森林冷绿 | `#059669 / #14B8A6 / #86EFAC` | 绿色 / 冥想 / 习惯打卡 |
| `sakura` | 🌸 樱雪粉金 | `#DB2777 / #F472B6 / #FBBF24` | 少女 / 财经 / 美学模式 |
| `night` | 🌙 深夜紫黑 | `#1E1B4B → #581C87 → #831843` 径向 dark 背景 | 深夜 / PWA 独立使用 |

> **`theme-night` 特殊处理**：自动写 `document.documentElement.style.colorScheme = 'dark'`；卡片 / sidebar / topbar 全部切 `rgba(30, 22, 70, 0.55)` 半透明 + `backdrop-filter: blur(24px) saturate(1.4)`。

---

## 2. 组件体系

### 2.1 🫧 Liquid Glass 2.0（曲率高光 + 滚动收缩 + 场景强度）

**核心 CSS**：`.card::before, .widget::before` 用「双层高光」：
```css
/* 顶部 30% 曲面折射 radial-gradient + 160° 左下↗对角 signature 光带 */
.card::before {
  background:
    radial-gradient(ellipse 120% 50% at 30% 0%, rgba(255,255,255,0.42*var(--glass-curvature)) 0%, transparent 60%),
    linear-gradient(160deg, rgba(255,255,255,0.18*var(--glass-curvature)) 0%, transparent 35%, ...);
}
```

- **滚动收缩**：`window.scrollY > 60` → `body.topbar-compact`，顶栏变 44px 高、模糊加强；
- **场景强度**：`--glass-curvature` 由 `body[data-aes-variance]`（美学旋钮 Variance）控制，3 档位 0.5 / 1 / 1.5。

### 2.2 🔘 新拟态轻量（柔光软塑）

只用于「操作型单元」，不滥用：

| 组件 | 类 | 说明 |
|---|---|---|
| 番茄钟主按钮 | `.pomo-main-btn` | 148×148 圆形赤陶橙渐变，双高光 + 按压内阴影 |
| 习惯勾选 | `.habit-check` | 32×32 圆角 10px，checked 时切深紫渐变 + ✓ 笔划 |
| 美学 / 音量滑条 | `.neumo-range` | 凹壳 + 22px 紫渐变拇指 |
| 通用按钮 | `.neumo-btn` | 基础柔光双阴影模板 |

### 2.3 🟣 深紫果冻气泡 Signature（品牌识别 2026）

**三个触点（缺一不可）**：
1. Sidebar logo-mark：右下角 **10×10 小气泡**；
2. Banner 左侧装饰 `.banner-jelly`：54×54，20px 圆角；
3. Widget 标题右上角品牌角标（需 `data-brand="1"`）。

识别公式：`radial-gradient(30%30% at 30% 25% #C4B5FD → 50% #5D3FD3 → #311E85)` + 右下角 12px signature 气泡。

---

## 3. 动画矩阵：3 主旋钮 × 12 场景

| 场景 | 触发点 | 动画 |
|---|---|---|
| 任务完成 | `.chkbox.click()` | `.celebrate` halo-pop 光晕 + 液滴飞溅 `splashAt(x,y,6,accent)` |
| 习惯完成 | `.habit-check.click()` | 同上 + 紫脉冲 |
| 添加任务 | `addTask()` / AI 指令 | `.bounce-in` 520ms 弹性弹跳 + 大三和弦音效 `playSound('add')` |
| 添加习惯 | `addHabit()` | 同上 |
| 页面切换 | `switchSection()` | `.section` section-pop 320ms 缩放淡入 |
| 按钮 hover | `.btn-primary/.neumo-btn` | shine sweep 45° 光带从左跑到右 + translateY(-1px) |
| 宜忌标签 | `.hl-tag` | candy-breath 3.5s 慢速呼吸（错相位 0/1.2s/2.3s） |
| 主题切换 | `applyTheme()` | 类名切换 + playSound('switch') 方波短音 |
| 声效点击 | 顶栏所有按钮 | WebAudio 合成 click / check / switch 等 |
| 弹出通知 | `showToast()` | 暖色胶囊 36px 高度，右侧 120% → 居中 → 跑出 |
| 滚动顶栏 | `scrollY>60` | `.topbar-compact` 变 44px 高，saturate 加强 |
| 专注模式进入 | `toggleFocusMode(true)` | `.focus-station` 480ms 淡入 + 胶囊慢光斑漂浮 |

### 3.1 美学三旋钮（Vibe Coding 核心参数）

| 旋钮 | 档位 | 影响的 CSS 变量 |
|---|---|---|
| Variance 变化度 | 克制 0.5 / 标准 1 / 狂野 1.5 | `--glass-curvature` · 光斑偏移 · 卡片错落 |
| Density 紧凑度 | 紧凑 0.8 / 标准 1 / 开阔 1.2 | `--sp-*` 全局间距 · widget padding |
| Motion 动画感 | 克制 0.6 / 标准 1 / 电影感 1.4 | `--dur* 时长` · `.aurora-glow` 动画速度 |

JS 存储：`aesData` 同步到 localStorage（`DB.set`）；快捷键：AI 指令 "旋钮调狂野/标准/克制"。

---

## 4. 🤖 AI 自然语言指令面板（本地规则解析，80% 场景）

**唤起方式**：
- 顶栏「✦ AI 指令」按钮；
- 快捷键 `⌘ / Ctrl + J`；
- 输入 Enter 执行，Esc 关闭，点击空白自动收回。

**支持的 8 条意图正则树**：

| # | 意图 | 示例输入 |
|---|---|---|
| 1 | 加任务 | 新增xxx / 加个写周报的任务 / todo xxx / 给我 xxx / task xxx |
| 2 | 番茄钟 | 开始番茄 / 番茄暂停 / 番茄钟 45 分钟 / 专注25分 |
| 3 | 切主题 | 切日出主题 / 换成樱雪 / 深夜模式 / 默认 |
| 4 | 专注模式 | 进入沉浸模式 / 退出专注 / zen |
| 5 | 完成打卡 | 完成今天运动打卡 / 勾习惯 |
| 6 | 跳页 | 去黄历页 / 跳到统计 / 打开设置 / 仪表盘 |
| 7 | 美学旋钮 | 把旋钮调狂野 / 换成标准 / 拉满 |
| 8 | 杂项快捷 | 清空完成 / 夸夸我 / 加油 / 删除已完成任务 |

**实现位置**：`runAICmd(raw)` — 无 LLM，纯正则，100% 离线可用。命中多个时选"回复 msg 最长=最具体"。

---

## 5. 🔮 专注沉浸模式

**触发方式**：
- 顶栏 `◉` 专注按钮；
- 快捷键 `⌘ / Ctrl + \`；
- AI 指令「进入专注」。

**效果**：`body.focus-mode` → sidebar/topbar/banner/除 `#focus-section` 外所有 section 变 0 透明度、blur 8px、zoom out 0.98；中央 `.focus-capsule` 弹出——紫黑玻璃 40×半径 + 双光斑 22s 漂浮动画：
- 任务名：取 `tasks[0].name`；
- 番茄时长：实时同步 `pomoData.timeLeft`；
- 主按钮：开始/暂停番茄（复用 togglePomo）。

---

## 6. 🕸 任务关系图谱（数据统计页，力导向 SVG）

算法：**240 步迭代的简化力导向** — 斥力 `f=4500/d²`；引力 `(d-90)*w*0.02`；向心衰减。

**节点分级（3 圈）**：
| 类型 | 色 | 位置 | 说明 |
|---|---|---|---|
| 中心「今日」 | 紫 `#8B5CF6` r=26 | 中心 | 1 个 |
| 标签 🏷 / 习惯 ✅ | 粉 `#EC4899` / 青 `#14B8A6` | 内圈 0.55R | ≤ 6+6 |
| 任务节点：高优/中优/低优 | 赤陶橙 / 琥珀 / 蓝 | 外圈 0.92R | ≤ 30，按优先级着色 |

DOM：`<div id="taskGraphWrap" class="stats-graph-wrap">` → 自动 SVG + Legend。渲染时机：`renderStats()` 末尾异步触发。

---

## 7. 🔊 WebAudio 声音反馈（默认关闭）

**7 种合成声效**：

| 名字 | 频率（Hz） | 波形 | 用途 |
|---|---|---|---|
| `click` | 660→880 | sine 50ms | 按钮 / 任务勾选单击 |
| `check` | 880→1320 | triangle 80ms | 任务/习惯 完成 庆祝 |
| `add` | 523→659→784（C 大 3 和弦） | sine 120ms | 添加任务/习惯/标签 |
| `switch` | 440→660 | square 60ms | 主题/页面切换 |
| `ai` | 1040→1560 | sine 70ms | AI 指令面板弹出 |
| `pomo` | C5→E5→G5→C6 | triangle 200ms | 番茄完成提醒 |
| `toast` | 700 | sine 40ms | 通知弹出 |

**控制开关**：
- 顶栏「声效」mini 按钮；
- 设置页底部「🔊 声音反馈」开关；
- Storage：`DB.get('sfxOn')` === '1' 为开启。
- 初始化：`init()` → 读 sfxOn → 同步两个按钮。

---

## 8. 底部胶囊通知 2.0（暖色）

- 尺寸：`h=36px` 左右 20px padding；
- 背景：`linear-gradient(135deg, #FFF3E0 → #FFE6CC → #FFDCBB)`；
- 文字色：`#6B3A1F`；
- 动画：
  - 进入：`translateX(120%) → 0`（550ms cubic-bezier(.22,1,.36,1)）
  - 停留 1.5s
  - 离开：`translateX(150%)`（650ms cubic-bezier(.55,0,.45,1)）

函数：`showToast(msg, type)`，包装了 WebAudio toast 触发。

---

## 9. 文件 & 版本

| 文件 | 版本 tag | 说明 |
|---|---|---|
| `elio-workbench-v4.html` | 本体 | 所有 HTML/CSS/JS 单文件应用 |
| `service-worker.js` | CACHE `elio-workbench-v4-vibe-v7` | 每升级必改缓存名 |
| `manifest.json` | v4 | PWA 图标配置 |
| `DESIGN.md`（本文件） | 2026 Q3 | 品牌设计系统 |

> ⚠️ 任何视觉 / 交互 / 主题变更必须同步更新：① CSS 类 ② 设置页 UI ③ AI 指令意图 ④ 本 DESIGN.md 四点，保持 1:1 对应。

---

*Made with 🌈 vibe coding spirit, Elio Workbench © 2026.*
