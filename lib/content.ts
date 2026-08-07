/* eslint-disable @typescript-eslint/no-unused-vars */
export type Difficulty = "入门" | "中等" | "进阶";
export type ContentStatus = "published" | "coming-soon";

export type Source = { title: string; url?: string; note?: string };
export type Region = { slug: string; name: string; countrySlugs: string[] };
export type Country = { slug: string; name: string; nativeName: string; regionSlug: string; flag: string; gameSlugs: string[]; status: ContentStatus };
export type Deck = { id: string; name: string; cards: number; description: string };
export type Mechanism = { slug: string; name: string; description: string };
export type Variant = { name: string; summary: string; status: ContentStatus };
export type RuleSet = { summary: string; steps: string[] };
export type Game = {
  slug: string; name: string; nativeName: string; countrySlugs: string[]; regionSlugs: string[];
  mechanismSlugs: string[]; duration: string; durationMinutes: number; players: string;
  playerCount: number; difficulty: Difficulty; accent: string; blurb: string; history: string;
  deckId: string; rules: RuleSet; variants: Variant[]; relatedGameSlugs: string[];
  sources: Source[]; playable: boolean; status: ContentStatus;
};

export const regions: Region[] = [
  { slug: "europe", name: "欧洲", countrySlugs: ["italy", "russia"] },
  { slug: "east-asia", name: "东亚", countrySlugs: ["japan", "korea"] },
  { slug: "southeast-asia", name: "东南亚", countrySlugs: ["vietnam"] },
  { slug: "eastern-europe", name: "东欧", countrySlugs: ["russia"] },
];

export const countries: Country[] = [
  { slug: "italy", name: "意大利", nativeName: "Italia", regionSlug: "europe", flag: "🇮🇹", gameSlugs: ["scopa", "briscola"], status: "published" },
  { slug: "japan", name: "日本", nativeName: "日本", regionSlug: "east-asia", flag: "🇯🇵", gameSlugs: ["koi-koi"], status: "coming-soon" },
  { slug: "russia", name: "俄罗斯", nativeName: "Россия", regionSlug: "eastern-europe", flag: "🇷🇺", gameSlugs: ["durak"], status: "coming-soon" },
  { slug: "vietnam", name: "越南", nativeName: "Việt Nam", regionSlug: "southeast-asia", flag: "🇻🇳", gameSlugs: ["tien-len"], status: "coming-soon" },
];

export const decks: Deck[] = [{ id: "italian-40", name: "意大利牌（40 张）", cards: 40, description: "传统意大利地区牌组，分为杯、金币、剑与棍四种花色。" }, { id: "standard-52", name: "标准 52 张牌", cards: 52, description: "国际通用的四花色标准牌组。" }];
export const mechanisms: Mechanism[] = [
  { slug: "capture", name: "捕鱼与抓牌", description: "通过点数匹配或组合捕获桌面牌。" },
  { slug: "trick-taking", name: "墩牌", description: "每轮出牌并比较牌力，赢得一墩。" },
  { slug: "shedding", name: "脱手", description: "以合法组合压过前一手，尽快出完手牌。" },
];

const scopaRules = { summary: "轮流从手牌打出一张牌，捕获桌面上点数相等或相加等于它的牌。", steps: ["桌面摆出 4 张牌，每位玩家获得手牌。", "出牌时捕获相同点数，或捕获一组点数总和相等的牌。", "清空桌面称为 Scopa；牌局结束后按牌数与特殊牌计分。"] };
export const games: Game[] = [
  { slug: "scopa", name: "Scopa", nativeName: "Scopa", countrySlugs: ["italy"], regionSlugs: ["europe"], mechanismSlugs: ["capture"], duration: "15–30 分钟", durationMinutes: 20, players: "2–4 人", playerCount: 2, difficulty: "入门", accent: "coral", blurb: "用一张牌捕获桌面上相加等于它的牌，收走最多牌的人获胜。", history: "Scopa 源自意大利，至少在 18 世纪已经广泛流行。它保留了地中海地区抓牌游戏的核心乐趣：读牌、记牌，以及在恰当时机清空桌面。", deckId: "italian-40", rules: scopaRules, variants: [{ name: "Scopone", summary: "四人组队版本，强调记牌和合作推断。", status: "published" }, { name: "地方计分法", summary: "不同地区会调整 Primiera 与最多牌的计分方式。", status: "published" }], relatedGameSlugs: ["briscola"], sources: [{ title: "Federazione Italiana Scala 40", note: "意大利纸牌传统与牌组资料" }, { title: "Scopa · Wikipedia", url: "https://en.wikipedia.org/wiki/Scopa" }], playable: true, status: "published" },
  { slug: "briscola", name: "Briscola", nativeName: "Briscola", countrySlugs: ["italy"], regionSlugs: ["europe"], mechanismSlugs: ["trick-taking"], duration: "20 分钟", durationMinutes: 20, players: "2–4 人", playerCount: 2, difficulty: "入门", accent: "gold", blurb: "翻开一张王牌，判断时机，赢下分值最高的墩。", history: "Briscola 是意大利最具代表性的墩牌游戏之一，今日仍常见于家庭聚会与酒吧牌桌。", deckId: "italian-40", rules: { summary: "每轮出一张牌，王牌花色决定胜负；赢得高分牌更多的一方获胜。", steps: ["翻开一张牌确定王牌花色。", "每位玩家依次出牌，不必跟花色。", "比较王牌与首出花色，赢墩者先抽下一张牌。"] }, variants: [{ name: "四人组队", summary: "对坐玩家组成两队。", status: "published" }], relatedGameSlugs: ["scopa"], sources: [{ title: "Italian playing-card traditions", note: "整理中" }], playable: false, status: "published" },
  ...([ ["durak", "Durak", "Дурак", "俄罗斯", "blue", "攻防与脱手"], ["tien-len", "Tiến Lên", "Tiến Lên", "越南", "violet", "爬梯与脱手"], ["koi-koi", "Koi-Koi", "こいこい", "日本", "rose", "配对与组合"] ] as const).map(([slug,name,nativeName,country,accent,mechanism]) => ({ slug, name, nativeName, countrySlugs: [slug === "durak" ? "russia" : slug === "tien-len" ? "vietnam" : "japan"], regionSlugs: [slug === "durak" ? "eastern-europe" : slug === "tien-len" ? "southeast-asia" : "east-asia"], mechanismSlugs: ["shedding"], duration: "整理中", durationMinutes: 0, players: "整理中", playerCount: 0, difficulty: "中等" as Difficulty, accent, blurb: `${country} 的代表性纸牌玩法，内容正在整理中。`, history: "该游戏的起源与历史资料正在整理中。", deckId: "standard-52", rules: { summary: "基础规则整理中。", steps: [] }, variants: [], relatedGameSlugs: [], sources: [], playable: false, status: "coming-soon" as ContentStatus }))
];
export const getCountry = (slug: string) => countries.find((item) => item.slug === slug);
export const getGame = (slug: string) => games.find((item) => item.slug === slug);
export const getDeck = (id: string) => decks.find((item) => item.id === id);
export const getMechanisms = (slugs: string[]) => mechanisms.filter((item) => slugs.includes(item.slug));
