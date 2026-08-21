/* eslint-disable @next/next/no-html-link-for-pages */

const scoreItems = [
  ["01", "得牌最多", "收走牌数最多的一方得 1 分；并列最多时，此项无人得分。"],
  ["02", "Scopa（清场）", "每次捕获后桌面没有场牌，得 1 分。末轮最后一张牌造成的清场，以及末轮残牌归属，都不算 Scopa。"],
  ["03", "硬币 7", "收走硬币 7（Settebello）的一方得 1 分。"],
  ["04", "硬币最多", "收走硬币牌数量最多的一方得 1 分；并列最多时，此项无人得分。"],
  ["05", "Primiera", "每种花色只取分值最高的一张，再把四种花色相加。总和最高的一方得 1 分；并列时无人得分。没有取得的花色按 0 分计算。"],
];
const primieraValues = [["7", "21"], ["6", "18"], ["A", "16"], ["5", "15"], ["4", "14"], ["3", "13"], ["2", "12"], ["8–10", "10"]];

export default function ScopaRulesPage() {
  return <main className="rules-page">
    <nav className="nav"><a className="brand" href="/"><span className="brand-mark">✦</span> WORLD CARD <small>ATLAS</small></a><a className="back-link" href="/games/scopa/play">← 返回教学</a></nav>
    <header className="section archive-header rules-hero"><div><p className="eyebrow">SCOPA · COMPLETE RULES</p><h1>Scopa 完整规则</h1><p className="lead">从发牌、捕获到五项末轮计分。</p></div><div className="rules-hero-facts"><span><b>40</b> 张牌</span><span><b>2–4</b> 人</span><span><b>11</b> 分常用胜利线</span></div></header>
    <div className="rules-layout">
      <aside className="rules-toc" aria-label="规则目录"><p className="eyebrow">快速导航</p><a href="#setup">牌组与发牌</a><a href="#capture">出牌与捕获</a><a href="#last-round">末轮处理</a><a href="#scoring">五项计分</a><a href="#primiera">Primiera</a><a href="#winning">胜负条件</a><a className="btn primary" href="/games/scopa/play">开始互动教学 →</a></aside>
      <article className="rules-content">
        <section id="setup"><p className="rule-number">01</p><h2>牌组与发牌</h2><p>只使用 A–10，共 40 张牌，A 的游戏点数为 1。支持 2–4 人；4 人游戏时两两组队，队友间隔入座。</p><div className="rules-steps"><div><b>每人 3 张</b><span>暗发手牌，仅本人可见。</span></div><div><b>桌面 4 张</b><span>翻开放置，作为初始场牌。</span></div><div><b>分轮补牌</b><span>所有玩家打完 3 张后，再依次发 3 张；场牌保留。</span></div></div></section>
        <section id="capture"><p className="rule-number">02</p><h2>出牌与捕获</h2><p>玩家依次打出一张牌。若它与某张场牌点数相同，或若干场牌点数之和等于它，则收走对应场牌，并把打出的牌一起放入自己的得牌区。</p><div className="rule-callout"><b>单张匹配优先</b><p>如果场上存在与出牌点数相同的单张，只能收走该单张；不能改选加总相同的多张组合。没有单张匹配但存在多种加法组合时，可任选一组。</p></div><ul><li>玩家每回合必须出一张牌。</li><li>只要存在可捕获组合，就必须捕获。</li><li>没有任何可匹配组合时，打出的牌留在桌面，成为新场牌。</li></ul></section>
        <section id="last-round"><p className="rule-number">03</p><h2>末轮处理</h2><p>牌堆抽完后的轮次为末轮。所有玩家打完最后的手牌后，如果桌面仍有场牌，这些牌归最后一次成功捕获牌的玩家方。</p><p className="rule-note">末轮残牌的归属不算 Scopa；末轮所有玩家打出自己最后一张牌后造成的清场也不得 Scopa 分。</p></section>
        <section id="scoring"><p className="rule-number">04</p><h2>末轮统一计分</h2><p>所有牌打完后才统一结算普通得分。整轮共有以下五类得分：</p><div className="score-grid">{scoreItems.map(([number, title, description]) => <div className="score-card" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></div>)}</div></section>
        <section id="primiera"><p className="rule-number">05</p><h2>Primiera 牌值</h2><p>这不是把所有得牌相加：每种花色只选价值最高的一张，然后合计四张牌。</p><div className="primiera-table" role="table" aria-label="Primiera 牌值"><div className="primiera-row header" role="row"><span>牌面</span>{primieraValues.map(([card]) => <b key={card}>{card}</b>)}</div><div className="primiera-row" role="row"><span>分值</span>{primieraValues.map(([card, value]) => <b key={card}>{value}</b>)}</div></div><div className="primiera-example"><b>示例</b><p>甲的四种花色最高牌为 7、5、6、7：21 + 15 + 18 + 21 = <strong>75</strong>。</p><p>乙为 6、7、7、4：18 + 21 + 21 + 14 = <strong>74</strong>。甲赢得此项 1 分。</p></div><details><summary>可选的简化比较法</summary><p>先比较取得 7 的数量；并列则比较 6 的数量；再并列则比较 A 的数量；仍并列时无人得分。采用此简化方式前，应由所有玩家共同确认。</p></details></section>
        <section id="winning"><p className="rule-number">06</p><h2>胜负条件</h2><p>可采用单局总分最高者获胜；也可跨局累计，最先达到 11 分且处于最高分的一方获胜。还可以事先约定更高目标，例如在 11 分基础上增加 5 或 10 的倍数。</p><a className="btn primary" href="/games/scopa/play">开始互动教学 →</a></section>
      </article>
    </div>
  </main>;
}
