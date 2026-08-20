/* eslint-disable @next/next/no-html-link-for-pages */

export default function ScopaRulesPage() {
  return <main>
    <nav className="nav"><a className="brand" href="/"><span className="brand-mark">✦</span> WORLD CARD <small>ATLAS</small></a><a className="back-link" href="/games/scopa/play">← 返回教学</a></nav>
    <header className="section archive-header"><p className="eyebrow">SCOPA · COMPLETE RULES</p><h1>Scopa 完整规则</h1><p className="lead">出牌、捕获、清台与整局计分。</p></header>
    <section className="section rules-document">
      <h2>牌组与发牌</h2><p>使用 40 张意大利牌。每位玩家获得 3 张手牌，桌面公开发 4 张场牌。所有玩家打完手牌后再各发 3 张，桌面牌继续保留，直到牌堆发完。</p>
      <h2>回合与捕获</h2><p>玩家每回合必须打出 1 张牌。若桌面存在点数相同的单牌，直接捕获该牌；否则可捕获点数之和等于出牌点数的组合。存在多个组合时，选择牌张数最少的组合。</p><p>若不存在可匹配组合，打出的牌留在桌面，成为新的场牌。</p>
      <h2>Scopa</h2><p>玩家出牌并完成捕获后，如果桌面场牌被清空，则获得 1 次 Scopa；但全局最后一次出牌清空桌面不计 Scopa。</p>
      <h2>结算与计分</h2><p>所有牌打完后统一结算，不能在对局途中提前结算普通得分。</p><ol><li>每次 Scopa：+1 分。</li><li>得牌总数最多：+1 分；并列不得分。</li><li>硬币花色牌最多：+1 分；并列不得分。</li><li>得到硬币 7：+1 分。</li><li>牌分总和最高：+1 分；并列不得分。</li></ol>
      <h2>胜负</h2><p>玩家或队伍总分达到 11 分且是全场唯一最高分时获胜；否则继续下一局。</p>
      <a className="btn primary" href="/games/scopa/play">开始互动教学 →</a>
    </section>
  </main>;
}
