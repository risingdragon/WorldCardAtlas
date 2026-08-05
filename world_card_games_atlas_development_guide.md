# World Card Games Atlas：产品与开发指南

> 项目定位：一个收集全球特色纸牌游戏、介绍其文化背景，并提供在线试玩与对战功能的世界纸牌游戏平台。

---

## 1. 项目愿景

### 1.1 核心目标

建设一个兼具以下三种属性的网站：

1. **纸牌游戏百科**
   - 收录世界各国、各地区有代表性的纸牌游戏。
   - 提供规则、历史、牌具、流行区域、玩法变体等资料。

2. **在线试玩平台**
   - 用户无需安装客户端，即可直接在浏览器中学习和游玩。
   - 优先支持人机对战，后续扩展实时联机。

3. **纸牌文化地图**
   - 以国家、地区、牌系和玩法机制为线索，帮助用户探索纸牌文化。
   - 不只是“列出游戏”，而是解释不同游戏之间的联系。

### 1.2 核心差异化

本项目不应被定位为另一个普通的在线棋牌网站。

真正的差异化是：

- 按国家和地区探索游戏；
- 同时介绍牌具、文化和历史；
- 将不同国家的游戏按机制建立关联；
- 提供低门槛、可交互的在线教学；
- 让用户从“我会玩什么”出发，发现世界上的相似游戏。

一句话定位：

> 探索世界纸牌文化，并立即开始游玩。

---

## 2. 产品原则

### 2.1 内容与游戏并重

网站不能只有百科，也不能只有游戏大厅。

每个游戏页面都应同时回答：

- 这是什么游戏？
- 它来自哪里？
- 使用什么牌？
- 为什么当地人喜欢它？
- 它与哪些游戏相似？
- 我如何在三分钟内开始玩？
- 我能否立即试玩？

### 2.2 先降低学习成本，再追求竞技深度

特色纸牌游戏最大的进入障碍不是技术，而是规则陌生。

因此，初次体验必须优先解决：

- 不知道牌面含义；
- 不知道轮到谁；
- 不知道当前能出什么；
- 不知道为什么输；
- 不理解特殊结算；
- 一次性规则说明过多。

产品必须通过交互式教学、合法操作提示和局后解释降低门槛。

### 2.3 规则实现必须数据化

不要为每一个游戏完全重写一套客户端逻辑。

应尽早抽象：

- 玩家数量；
- 牌堆组成；
- 发牌规则；
- 回合顺序；
- 合法操作；
- 牌型比较；
- 得分规则；
- 结束条件；
- 阶段转换；
- 特殊规则。

目标是形成可复用的“规则引擎 + 游戏配置”体系。

### 2.4 文化内容必须可验证

历史、起源和“最受欢迎”等信息应有来源。

应区分：

- 已证实事实；
- 普遍观点；
- 地区性说法；
- 尚有争议的起源。

避免使用无法验证的绝对表述，例如：

- “所有意大利人都会玩”；
- “这是某国最流行的游戏”；
- “该游戏起源于某一年”。

---

## 3. 目标用户

### 3.1 文化探索型用户

需求：

- 想了解不同国家的纸牌文化；
- 喜欢历史、旅行、民俗；
- 不一定是重度玩家。

核心功能：

- 世界地图；
- 国家专题页；
- 牌具介绍；
- 游戏历史；
- 文化故事；
- 相关推荐。

### 3.2 休闲试玩型用户

需求：

- 想快速玩一局；
- 不愿阅读长规则；
- 希望无需注册。

核心功能：

- 游客试玩；
- AI 陪练；
- 三分钟教程；
- 操作提示；
- 快速重开。

### 3.3 纸牌爱好者

需求：

- 寻找冷门游戏；
- 比较不同规则变体；
- 研究机制和谱系；
- 希望有准确、完整的规则。

核心功能：

- 高级规则；
- 地区变体；
- 术语表；
- 机制分类；
- 游戏关系图谱；
- 规则来源与参考资料。

### 3.4 竞技玩家

需求：

- 和真人对战；
- 排名、战绩、赛事；
- 更强的策略深度。

该用户群不应作为 MVP 第一优先级，但会决定后期留存和商业化空间。

---

## 4. 产品信息架构

### 4.1 一级导航建议

- 首页
- 世界地图
- 游戏库
- 牌具与牌系
- 在线游玩
- 学习中心
- 关于项目

登录后增加：

- 我的收藏
- 最近游玩
- 战绩
- 好友
- 设置

### 4.2 首页结构

建议从上到下排列：

1. 主视觉
   - 世界地图或全球纸牌拼贴；
   - 核心文案；
   - “探索世界”与“立即试玩”两个入口。

2. 今日推荐
   - 每日一个国家；
   - 每日一个游戏；
   - 每日一个牌具。

3. 从你熟悉的游戏出发
   - 例如“会斗地主？”
   - 推荐 Tichu、Tiến Lên、Daifugō、President 等机制相近的游戏。

4. 全球热门游戏
   - 按热度、试玩量或收藏量排序。

5. 按机制探索
   - 墩牌类；
   - 爬梯类；
   - 抓分捕鱼类；
   - 凑套类；
   - 甩牌类；
   - 赌博与竞标类；
   - 单人牌类；
   - 记忆与配对类。

6. 按地区探索
   - 东亚；
   - 东南亚；
   - 南亚；
   - 西欧；
   - 东欧；
   - 北欧；
   - 拉丁美洲；
   - 中东；
   - 非洲；
   - 大洋洲。

7. 新增内容
   - 新游戏；
   - 新文章；
   - 新上线试玩。

---

## 5. 核心页面设计

## 5.1 国家或地区页

每个国家页建议包含：

- 国家名称与地图位置；
- 当地主要牌具；
- 代表性游戏；
- 各地区玩法差异；
- 纸牌文化概述；
- 推荐入门顺序；
- 与其他国家游戏的关联；
- 可试玩游戏入口。

示例：

```text
Italy
├── 代表牌具
│   ├── Napoletane
│   ├── Piacentine
│   └── Siciliane
├── 代表游戏
│   ├── Briscola
│   ├── Scopa
│   ├── Tressette
│   └── Scopone
└── 推荐体验顺序
    ├── Scopa
    ├── Briscola
    └── Tressette
```

## 5.2 游戏详情页

每个游戏详情页建议包含以下模块。

### 基础信息

- 游戏名称；
- 原文名称；
- 中文名称；
- 常见别名；
- 起源国家或地区；
- 流行地区；
- 玩家人数；
- 游戏时长；
- 难度；
- 运气与策略比例；
- 使用牌具；
- 是否已支持在线试玩。

### 快速理解

用三到五句话解释：

- 游戏目标；
- 核心动作；
- 胜负方式；
- 最有特色的机制。

### 三分钟规则

只讲开始游戏所需的最少规则：

1. 如何发牌；
2. 轮到玩家时做什么；
3. 什么牌可以打；
4. 如何获胜；
5. 最重要的特殊规则。

### 完整规则

包括：

- 准备；
- 发牌；
- 回合；
- 合法操作；
- 比较规则；
- 得分；
- 结束条件；
- 特殊情况；
- 常见变体。

### 文化背景

- 历史；
- 地区流行情况；
- 社交场景；
- 相关节庆；
- 常见牌桌礼仪；
- 当地术语。

### 机制与关联

展示：

- 所属机制；
- 相似游戏；
- 衍生游戏；
- 同牌具游戏；
- 推荐下一款游戏。

### 在线试玩

- 立即试玩；
- 新手教学；
- 普通 AI；
- 困难 AI；
- 本地多人；
- 在线匹配。

---

## 6. 游戏分类体系

不要只按国家分类。至少建立四套并行分类。

### 6.1 按地区

```text
Region
├── Continent
├── Country
├── Province / State
└── Local tradition
```

### 6.2 按牌具

示例：

- French-suited cards；
- Spanish-suited cards；
- Italian-suited cards；
- German-suited cards；
- Swiss-suited cards；
- Tarot cards；
- Hanafuda；
- Hwatu；
- Ganjifa；
- 特制商业牌组。

### 6.3 按玩法机制

建议初步采用：

- Trick-taking：墩牌；
- Climbing / Shedding：爬梯与脱手；
- Fishing / Capturing：捕鱼与抓牌；
- Matching / Melding：配对与组合；
- Rummy：拉米体系；
- Commerce：交换与交易；
- Bluffing：诈唬；
- Auction / Bidding：叫牌与竞标；
- Battle / Comparison：直接比牌；
- Solitaire / Patience：单人牌；
- Party / Social：聚会与社交；
- Gambling：博彩型传统玩法。

一个游戏可以拥有多个机制标签。

### 6.4 按体验特征

- 入门难度；
- 对局时长；
- 玩家人数；
- 运气比例；
- 信息公开程度；
- 是否需要记牌；
- 是否适合儿童；
- 是否适合聚会；
- 是否适合竞技。

---

## 7. MVP 范围

MVP 的目标不是收录最多，而是验证以下闭环：

> 用户通过地图发现一个陌生游戏，快速看懂规则，完成一局试玩，并继续探索相似游戏。

### 7.1 MVP 必须具备

1. 世界地图浏览；
2. 国家或地区列表；
3. 至少 20 个高质量游戏条目；
4. 至少 5 个可在线试玩的游戏；
5. 游客模式；
6. AI 对手；
7. 交互式新手教学；
8. 游戏详情页；
9. 搜索与筛选；
10. 相似游戏推荐；
11. 内容管理后台；
12. 多语言基础框架。

### 7.2 MVP 暂不实现

- 复杂实时语音；
- 公会系统；
- 大型赛事；
- 直播观战；
- 交易市场；
- 用户自定义牌桌皮肤；
- UGC 规则编辑；
- 同时支持数十种真人联机游戏；
- 原生 App。

### 7.3 首批游戏选择原则

首批游戏需要覆盖不同国家、牌具和机制，而不是全部来自欧美。

推荐组合：

| 游戏 | 地区 | 机制 | 推荐原因 |
|---|---|---|---|
| Briscola | 意大利 | 墩牌 | 规则相对简单，文化辨识度高 |
| Scopa | 意大利 | 捕鱼 | 机制独特，适合教学展示 |
| Durak | 俄罗斯及周边 | 攻防、脱手 | 国际知名度高，玩法鲜明 |
| Tiến Lên | 越南 | 爬梯 | 与中国玩家熟悉的牌型体系接近 |
| Daifugō | 日本 | 爬梯 | 规则变体丰富，传播基础好 |
| Hearts | 英美 | 墩牌 | AI 和规则验证较成熟 |
| Euchre | 北美 | 墩牌 | 适合展示叫牌机制 |
| Escoba | 西班牙及拉美 | 捕鱼 | 与 Scopa 便于做关系推荐 |
| Koi-Koi | 日本 | 花札组合 | 牌具视觉价值高 |
| Go-Stop | 韩国 | 花札抓分 | 地区特色明显 |
| Belote | 法国 | 墩牌 | 欧洲代表性强 |
| Schnapsen | 奥地利 | 双人墩牌 | 适合短局和 AI |
| Tichu | 瑞士现代游戏 | 团队爬梯 | 与中国牌型体系关联明显 |
| President | 多地区 | 脱手 | 入门简单 |
| Gin Rummy | 美国 | 拉米 | 机制代表性强 |

注意：最终名单需要根据版权、牌具素材、规则实现成本和目标市场进行调整。

---

## 8. 用户核心流程

### 8.1 探索流程

```text
进入首页
→ 点击世界地图
→ 选择国家
→ 浏览代表游戏
→ 打开游戏详情页
→ 查看三分钟规则
→ 立即试玩
→ 完成一局
→ 查看相似游戏
```

### 8.2 从熟悉游戏推荐

```text
用户选择“我会斗地主”
→ 系统识别机制标签
→ 推荐同类爬梯游戏
→ 展示差异说明
→ 进入互动教学
→ 开始试玩
```

### 8.3 新手教学流程

```text
先展示目标
→ 系统发出示范牌
→ 高亮合法操作
→ 玩家执行一步
→ 即时解释结果
→ 引入下一条规则
→ 完成教学局
→ 进入普通对局
```

---

## 9. 在线游戏系统架构

建议采用“服务端权威状态”模型。

### 9.1 基本原则

- 服务端维护唯一可信游戏状态；
- 客户端只发送意图，不直接修改结果；
- 所有操作在服务端进行合法性校验；
- 对局过程必须可回放；
- AI 与真人使用同一套规则接口；
- 游戏结果可通过日志重新计算。

### 9.2 逻辑分层

```text
Presentation Layer
├── 地图与百科页面
├── 游戏桌面 UI
├── 教程 UI
└── 动画与音效

Application Layer
├── 匹配
├── 房间
├── 用户状态
├── 对局流程
└── 战绩

Game Engine
├── 状态机
├── 合法操作生成
├── 操作校验
├── 结算
├── 回放
└── 随机数管理

Game Modules
├── Briscola
├── Scopa
├── Durak
├── Tiến Lên
└── ...

Infrastructure
├── 数据库
├── 缓存
├── WebSocket
├── 日志
├── 监控
└── 内容存储
```

---

## 10. 规则引擎设计

### 10.1 游戏状态

每个游戏应拥有明确的状态结构。

示例：

```ts
interface GameState {
  gameId: string;
  rulesetVersion: string;
  phase: string;
  round: number;
  turnPlayerId: string | null;
  dealerPlayerId: string;
  players: PlayerState[];
  deck: Card[];
  discardPile: Card[];
  table: TableState;
  scores: Record<string, number>;
  history: GameActionRecord[];
  randomSeed: string;
}
```

### 10.2 玩家动作

```ts
type GameAction =
  | { type: "PLAY_CARD"; playerId: string; cardIds: string[] }
  | { type: "DRAW_CARD"; playerId: string }
  | { type: "PASS"; playerId: string }
  | { type: "BID"; playerId: string; value: number }
  | { type: "DECLARE"; playerId: string; declaration: string }
  | { type: "SELECT_TARGET"; playerId: string; targetId: string };
```

### 10.3 规则模块接口

```ts
interface GameModule<State, Action> {
  createInitialState(config: GameConfig): State;

  getLegalActions(
    state: State,
    playerId: string
  ): Action[];

  validateAction(
    state: State,
    action: Action
  ): ValidationResult;

  applyAction(
    state: State,
    action: Action
  ): State;

  isGameOver(state: State): boolean;

  getResult(state: State): GameResult;

  getPublicView(
    state: State,
    viewerPlayerId: string
  ): PublicGameState;

  getAiObservation(
    state: State,
    aiPlayerId: string
  ): AiObservation;
}
```

### 10.4 状态机

每个游戏应明确阶段：

```text
WAITING
→ DEALING
→ BIDDING
→ PLAYING
→ ROUND_SCORING
→ NEXT_ROUND
→ GAME_OVER
```

不同游戏可拥有不同阶段，但所有阶段转换必须由规则引擎决定。

### 10.5 随机性

必须支持：

- 可复现随机种子；
- 服务端洗牌；
- 记录随机种子或洗牌结果；
- 防止客户端预测；
- 回放时完全重现牌序。

---

## 11. AI 设计

### 11.1 AI 分级

建议至少提供：

- 教学 AI：优先配合规则演示；
- 简单 AI：允许明显失误；
- 普通 AI：使用启发式策略；
- 困难 AI：搜索、采样或更高级模型。

### 11.2 AI 接口

```ts
interface GameAi<State, Action> {
  chooseAction(
    state: State,
    legalActions: Action[],
    difficulty: AiDifficulty
  ): Promise<Action>;
}
```

### 11.3 实现路线

第一阶段：

- 规则启发式；
- 简单打分函数；
- 随机扰动；
- 不同难度使用不同搜索深度和失误率。

第二阶段：

- Minimax；
- Alpha-Beta；
- Monte Carlo Tree Search；
- Information Set Monte Carlo Tree Search；
- 对局数据训练策略模型。

### 11.4 不完全信息游戏

AI 不能读取玩家不可见信息。

规则引擎需要向 AI 返回其合法可见状态，而不是完整服务端状态。

---

## 12. 联机架构

### 12.1 通信方式

- 普通页面请求：HTTP / REST 或 GraphQL；
- 对局实时同步：WebSocket；
- 内容分发：CDN；
- 对局事件：事件日志。

### 12.2 房间结构

```ts
interface GameRoom {
  roomId: string;
  gameSlug: string;
  rulesetVersion: string;
  hostUserId: string;
  seats: Seat[];
  spectators: string[];
  status: "WAITING" | "PLAYING" | "FINISHED";
  createdAt: string;
}
```

### 12.3 断线重连

必须支持：

- 客户端重新获取完整公开状态；
- 重放断线期间事件；
- AI 临时托管；
- 超时自动操作；
- 房间保留时间；
- 重连身份验证。

### 12.4 防作弊

- 服务端权威；
- 不向客户端发送隐藏牌；
- 操作限频；
- 异常时序检测；
- 对局日志；
- 随机数审计；
- 禁止客户端决定结果。

---

## 13. 内容数据模型

### 13.1 游戏实体

```ts
interface CardGame {
  id: string;
  slug: string;
  canonicalName: string;
  localizedNames: LocalizedText[];
  aliases: string[];
  summary: LocalizedText;
  originRegions: RegionRef[];
  popularRegions: RegionRef[];
  mechanisms: MechanismRef[];
  deckTypes: DeckTypeRef[];
  playerCountMin: number;
  playerCountMax: number;
  durationMin: number;
  durationMax: number;
  difficulty: number;
  luckLevel: number;
  strategyLevel: number;
  ageRecommendation?: number;
  ruleStatus: "DRAFT" | "REVIEWED" | "PUBLISHED";
  playableStatus: "NONE" | "TUTORIAL" | "AI" | "ONLINE";
  rulesetVersions: RulesetRef[];
  relatedGames: RelatedGameRef[];
  sources: SourceRef[];
}
```

### 13.2 规则版本

```ts
interface Ruleset {
  id: string;
  gameId: string;
  version: string;
  region?: string;
  language: string;
  status: "DRAFT" | "REVIEWED" | "PUBLISHED" | "DEPRECATED";
  quickRules: RuleSection[];
  fullRules: RuleSection[];
  exceptions: RuleSection[];
  scoring: RuleSection[];
  sourceRefs: string[];
}
```

### 13.3 地区实体

```ts
interface Region {
  id: string;
  type: "CONTINENT" | "COUNTRY" | "PROVINCE" | "CITY" | "CULTURAL_REGION";
  parentId?: string;
  names: LocalizedText[];
  geoCode?: string;
  mapGeometryRef?: string;
}
```

### 13.4 牌具实体

```ts
interface DeckType {
  id: string;
  slug: string;
  names: LocalizedText[];
  suitSystem: string;
  cardCount: number;
  suits: SuitDefinition[];
  ranks: RankDefinition[];
  regions: RegionRef[];
  description: LocalizedText;
  imageSetId?: string;
}
```

---

## 14. 多语言设计

这是全球文化项目，必须从第一天支持多语言架构。

### 14.1 内容类型

需要国际化的内容包括：

- UI 文案；
- 游戏名称；
- 地区名称；
- 规则；
- 历史介绍；
- 术语；
- 教学提示；
- 错误信息；
- AI 解说；
- SEO 元数据。

### 14.2 键值设计

UI 文案应使用稳定键名：

```json
{
  "game.action.play_card": "Play card",
  "game.action.pass": "Pass",
  "tutorial.legal_move_hint": "You can play one of the highlighted cards."
}
```

不要把完整英文句子直接作为 key。

### 14.3 内容翻译

百科内容不适合全部写在代码语言包中。

建议：

- UI 文案：i18n 文件；
- 游戏规则与文章：CMS 多语言字段；
- 游戏术语：独立术语表；
- 服务端事件：传语义代码和参数，客户端本地化。

错误示例：

```json
{
  "message": "You cannot play this card."
}
```

推荐：

```json
{
  "code": "INVALID_CARD_FOR_CURRENT_TRICK",
  "params": {
    "requiredSuit": "hearts"
  }
}
```

---

## 15. 内容生产规范

### 15.1 每个游戏条目的最低要求

- 中文名；
- 原文名；
- 英文名；
- 起源与流行地区；
- 玩家人数；
- 牌具；
- 游戏目标；
- 三分钟规则；
- 完整规则；
- 得分方式；
- 常见变体；
- 机制标签；
- 相似游戏；
- 至少两个可靠来源；
- 内容审核状态。

### 15.2 来源优先级

1. 当地协会或官方规则；
2. 专业纸牌研究网站；
3. 书籍与学术资料；
4. 当地俱乐部或社区规则；
5. 高质量百科；
6. 视频或论坛经验。

论坛和个人博客可用于理解实际玩法，但不应成为唯一依据。

### 15.3 争议处理

对于存在争议的内容，使用：

- “通常认为”；
- “部分资料认为”；
- “在某地区的常见规则中”；
- “该游戏存在多种版本”；
- “此处采用某地区规则”。

不要强行合并互相冲突的地区规则。

---

## 16. CMS 与后台

后台至少需要：

- 游戏管理；
- 国家与地区管理；
- 牌具管理；
- 规则版本管理；
- 多语言管理；
- 来源管理；
- 文章管理；
- 图片管理；
- 发布审核；
- 变更历史；
- 在线游戏开关；
- 推荐关系管理。

建议内容状态：

```text
DRAFT
→ FACT_CHECK
→ RULE_REVIEW
→ TRANSLATION_REVIEW
→ PUBLISHED
→ ARCHIVED
```

---

## 17. 搜索与推荐

### 17.1 搜索字段

支持搜索：

- 游戏名称；
- 原文名；
- 别名；
- 国家；
- 地区；
- 牌具；
- 机制；
- 玩家人数；
- 术语；
- 规则关键词。

### 17.2 推荐策略

第一阶段使用规则推荐：

```text
相同机制权重
+ 相同牌具权重
+ 相邻地区权重
+ 相似人数权重
+ 相似难度权重
+ 用户已玩游戏权重
```

示例评分：

```ts
score =
  mechanismSimilarity * 0.35 +
  deckSimilarity * 0.20 +
  regionSimilarity * 0.10 +
  playerCountSimilarity * 0.10 +
  difficultySimilarity * 0.10 +
  userPreference * 0.15;
```

### 17.3 推荐解释

不要只显示“猜你喜欢”。

应解释：

- “与你会玩的斗地主同属爬梯类”；
- “与 Scopa 使用相似的抓牌机制”；
- “同样使用意大利花色牌”；
- “适合两人，单局时间相近”。

---

## 18. UI 与交互规范

### 18.1 风格方向

建议避免传统博彩网站风格。

可采用：

- 博物馆；
- 世界地图；
- 旅行图鉴；
- 文化收藏册；
- 复古印刷与现代交互结合。

### 18.2 游戏桌面

必须明确展示：

- 当前玩家；
- 当前阶段；
- 当前目标；
- 合法操作；
- 剩余牌数；
- 计分；
- 最近一次操作；
- 规则帮助入口；
- 托管与退出入口。

### 18.3 新手友好功能

- 合法牌高亮；
- 不合法操作原因；
- 术语悬浮解释；
- 一键查看本轮目标；
- 可撤销教学操作；
- 关键规则动态出现；
- 局后逐步复盘；
- 关闭高级动画；
- 色弱模式；
- 手牌自动整理。

---

## 19. 技术选型建议

以下选型仅作为参考，核心原则是团队熟悉度和长期可维护性。

### 19.1 前端

可选：

- Next.js；
- React；
- TypeScript；
- Tailwind CSS 或成熟组件库；
- Canvas / WebGL 用于复杂牌桌动画；
- 普通 DOM 用于初期牌桌。

建议初期优先 DOM，实现成本更低，响应式和可访问性更好。

### 19.2 后端

可选：

- Node.js + TypeScript；
- NestJS；
- PostgreSQL；
- Redis；
- WebSocket；
- 对象存储；
- CDN。

如果团队更熟悉其他语言，也可采用：

- Go；
- Java / Kotlin；
- C#；
- Rust。

规则引擎的边界和可测试性比语言本身更重要。

### 19.3 数据与搜索

- PostgreSQL：主数据；
- Redis：房间、缓存、临时状态；
- OpenSearch / Elasticsearch：大型全文检索；
- 初期可先使用 PostgreSQL Full Text Search；
- 对象存储：图片、音频、牌面资源。

### 19.4 部署

早期建议：

- 单体应用；
- 模块化代码；
- 独立 WebSocket 服务按需拆分；
- 容器化；
- 自动化部署；
- 开发、预发布、生产环境隔离。

不要在 MVP 阶段过早拆成大量微服务。

---

## 20. 数据库初步表结构

建议主要表：

```text
users
user_profiles
user_game_preferences
regions
region_translations
deck_types
deck_type_translations
cards
card_asset_sets
games
game_translations
game_regions
game_mechanisms
mechanisms
rulesets
ruleset_sections
ruleset_sources
sources
related_games
articles
article_translations
game_sessions
game_players
game_action_logs
game_results
user_favorites
user_play_history
matchmaking_queue
rooms
content_reviews
```

---

## 21. API 草案

### 内容 API

```text
GET /api/games
GET /api/games/:slug
GET /api/regions
GET /api/regions/:slug
GET /api/decks
GET /api/decks/:slug
GET /api/search
GET /api/recommendations
```

### 对局 API

```text
POST /api/game-sessions
GET /api/game-sessions/:id
POST /api/game-sessions/:id/actions
POST /api/game-sessions/:id/reconnect
GET /api/game-sessions/:id/replay
```

### WebSocket 事件

```text
room.join
room.leave
game.state
game.action.request
game.action.accepted
game.action.rejected
game.turn.changed
game.round.ended
game.finished
player.disconnected
player.reconnected
```

---

## 22. 测试策略

规则游戏最怕“能运行，但规则错”。

### 22.1 单元测试

每个游戏至少覆盖：

- 发牌数量；
- 牌堆完整性；
- 合法操作；
- 非法操作；
- 回合转换；
- 比牌；
- 得分；
- 特殊规则；
- 结束条件。

### 22.2 属性测试

适合检查：

- 洗牌后牌不丢失、不重复；
- 总分守恒；
- 任意合法操作不会产生非法状态；
- 对局一定能结束；
- 回放结果与原局一致。

### 22.3 回归案例

每发现一个规则 Bug，就将该对局状态保存为固定测试案例。

### 22.4 内容测试

- 地区与国家是否准确；
- 名称翻译是否一致；
- 规则与实现是否一致；
- 教程是否覆盖关键规则；
- 页面是否明确标注采用的规则版本。

---

## 23. 指标体系

### 23.1 探索指标

- 地图点击率；
- 国家页访问深度；
- 游戏详情页停留时间；
- 相似游戏点击率；
- 收藏率。

### 23.2 教学指标

- 教程开始率；
- 教程完成率；
- 教程中途退出点；
- 首局完成率；
- 首局平均思考时间；
- 非法操作次数。

### 23.3 游戏指标

- DAU / WAU / MAU；
- 平均对局数；
- 对局完成率；
- 重开率；
- AI 难度选择；
- 七日留存；
- 游戏间迁移率。

### 23.4 内容指标

- 搜索无结果率；
- 规则页跳出率；
- 国家覆盖数；
- 游戏覆盖数；
- 已验证规则比例；
- 多语言完整度。

---

## 24. 商业化方向

不建议 MVP 一开始就重度商业化。

可考虑：

### 24.1 会员

- 去广告；
- 高级统计；
- 高级 AI；
- 专属牌桌；
- 收藏册；
- 离线教程；
- 多设备同步。

### 24.2 外观内容

- 牌背；
- 桌布；
- 动画；
- 地区主题；
- 历史牌面复刻。

注意牌面素材的版权和商标风险。

### 24.3 教育与文化合作

- 博物馆；
- 学校；
- 文化机构；
- 旅游机构；
- 牌具制造商；
- 游戏研究机构。

### 24.4 广告

仅适合百科和内容页面，且不应破坏游戏体验。

避免博彩类广告与未成年人风险。

---

## 25. 法律与合规

需要重点关注：

- 牌面美术版权；
- 游戏名称商标；
- 规则文本版权；
- 用户数据；
- 未成年人保护；
- 博彩相关法规；
- 地区内容合规；
- 隐私政策；
- Cookie 与追踪；
- 真人聊天审核。

传统游戏规则通常不等同于可自由复制他人的规则文本。

应采用自行整理、重写和验证的规则说明。

若游戏涉及下注、代币兑换或可提现奖励，法律风险会显著增加。建议产品定位始终保持为文化、休闲和竞技游戏，不提供现金下注或可兑换资产。

---

## 26. 开发阶段规划

## 阶段 0：研究与原型

目标：

- 明确定位；
- 建立分类体系；
- 确定首批游戏；
- 验证游戏页与地图体验；
- 制作一个可玩的技术原型。

交付：

- 产品原型；
- 数据模型；
- 内容模板；
- 规则引擎接口；
- 一个完整可玩的游戏。

## 阶段 1：MVP

目标：

- 完成“发现—学习—试玩—推荐”闭环。

交付：

- 世界地图；
- 20 个游戏条目；
- 5 个在线游戏；
- AI；
- 教程；
- 搜索；
- 推荐；
- CMS；
- 中英文基础支持。

## 阶段 2：扩充内容

目标：

- 建立内容壁垒。

交付：

- 100 个游戏；
- 20 种牌具；
- 国家专题；
- 机制专题；
- 更多语言；
- 用户收藏和历史。

## 阶段 3：真人联机

目标：

- 提升留存。

交付：

- 匹配；
- 私人房；
- 好友；
- 排行榜；
- 断线重连；
- 举报与审核。

## 阶段 4：社区与生态

目标：

- 形成内容和玩家网络。

交付：

- 规则勘误；
- 地区专家贡献；
- 俱乐部；
- 赛事；
- 开发者规则 SDK；
- 开放数据接口。

---

## 27. 团队分工建议

早期最小团队：

- 产品与项目负责人；
- 前端工程师；
- 后端与规则引擎工程师；
- 游戏策划或规则研究员；
- UI/UX 设计师；
- 内容编辑与翻译。

一人可兼任多个角色，但“规则研究”和“程序实现”必须相互审核。

---

## 28. 第一批开发任务

### 产品

- [ ] 明确产品名称与品牌方向
- [ ] 完成首页原型
- [ ] 完成地图页原型
- [ ] 完成国家页原型
- [ ] 完成游戏详情页原型
- [ ] 完成牌桌交互原型
- [ ] 定义 MVP 指标

### 内容

- [ ] 建立游戏资料模板
- [ ] 建立来源规范
- [ ] 建立机制分类表
- [ ] 建立牌具分类表
- [ ] 确定首批 20 个游戏
- [ ] 完成首批 5 个游戏的规则审核
- [ ] 确定中英文术语表

### 技术

- [ ] 初始化前端项目
- [ ] 初始化后端项目
- [ ] 建立数据库
- [ ] 实现地区与游戏内容 API
- [ ] 实现规则引擎基础接口
- [ ] 实现随机数与回放机制
- [ ] 完成第一个游戏模块
- [ ] 完成基础 AI
- [ ] 完成测试框架
- [ ] 建立 CI/CD

### 设计

- [ ] 定义视觉风格
- [ ] 建立牌面显示规范
- [ ] 建立桌面布局规范
- [ ] 设计地图交互
- [ ] 设计新手教学
- [ ] 设计移动端适配
- [ ] 设计无障碍规范

---

## 29. 第一个可玩游戏的验收标准

第一个游戏不只是“能玩”，而应满足：

- [ ] 规则经过至少两份来源核对
- [ ] 规则版本有明确说明
- [ ] 支持完整对局
- [ ] 支持重开
- [ ] 支持合法操作提示
- [ ] 支持 AI
- [ ] 支持断线恢复或状态刷新
- [ ] 支持回放
- [ ] 支持局后得分说明
- [ ] 支持移动端
- [ ] 关键规则有自动化测试
- [ ] 不向客户端泄露隐藏信息
- [ ] 教程可让首次用户完成第一局

---

## 30. 推荐的首个技术验证

建议优先选择一个：

- 规则不太复杂；
- 对局时间短；
- 文化辨识度高；
- AI 容易实现；
- 有一定国际认知；
- 不涉及复杂多人叫牌。

候选：

1. **Briscola**
   - 适合验证墩牌引擎；
   - 状态结构清晰；
   - 文化特色强。

2. **Scopa**
   - 适合验证抓牌与桌面组合；
   - 视觉表现明显；
   - 与普通扑克体验差异大。

3. **Tiến Lên**
   - 中国玩家较容易理解；
   - 适合验证牌型与爬梯规则；
   - 后续可复用到更多同类游戏。

如果团队希望最快产出，优先 Briscola。

如果希望第一眼就体现项目差异，优先 Scopa。

如果首批用户主要是中文用户，优先 Tiến Lên。

---

## 31. 项目命名方向

可考虑：

- Card Atlas
- World Card Games
- Atlas of Cards
- Card Cultures
- Global Card Table
- Decks of the World
- Around the Cards
- Card Folk
- Table of Nations

命名检查：

- 域名是否可用；
- 商标风险；
- 搜索辨识度；
- 是否容易拼写；
- 是否限制未来扩展；
- 是否容易做多语言品牌。

---

## 32. 最终判断

这个项目不是完全没有竞品，也不是从零创造一个新领域。

已有产品通常分别解决：

- 规则查询；
- 在线对战；
- 某一地区的棋牌集合；
- 少数热门游戏的休闲体验。

本项目的机会在于把以下内容整合成一个统一产品：

> 全球游戏数据库 + 纸牌文化地图 + 互动教学 + 在线试玩 + 游戏关系推荐。

成功的关键不在于第一天收录多少游戏，而在于是否建立一个可持续扩张的体系：

- 内容结构可扩展；
- 规则实现可复用；
- 多语言从底层支持；
- 文化资料可信；
- 新手能够快速学会；
- 用户会从一个游戏继续探索下一个游戏。

第一阶段最重要的产品目标是：

> 让一个从未听说过某款外国纸牌游戏的用户，在五分钟内理解它，并顺利完成第一局。
