"use client";
import Link from "next/link";
import { useState } from "react";

export default function PlayPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  return <main className="play-page"><nav className="nav"><Link className="brand" href="/"><span className="brand-mark">✦</span> WORLD CARD <small>ATLAS</small></Link><Link className="back-link" href="/">← 返回探索</Link></nav><section className="play-shell"><div className="play-intro"><p className="eyebrow">SCOPA · INTERACTIVE TUTORIAL</p><h1>三分钟，<br/><em>学会 Scopa。</em></h1><p>这是意大利最受欢迎的传统纸牌游戏之一。捕获桌面上的牌，积累分数，先理解目标，再慢慢掌握技巧。</p><div className="rule-list"><div><b>01</b><span>从手牌中选择一张牌</span></div><div><b>02</b><span>捕获点数相加等于它的牌</span></div><div><b>03</b><span>捕获最多牌，赢得胜利</span></div></div><Link className="text-link" href="/">查看完整游戏档案 →</Link></div><div className="table"><div className="table-top"><span>SCOPA · 新手桌</span><span>第 1 / 3 步</span></div><div className="instruction">{selected===null?"从手牌中选择一张牌":selected===0?"很好！A 可以捕获桌面上的 A。":"这张牌暂时没有可捕获的组合。"}<small>目标：捕获桌面上的牌，拿到最多分数。</small></div><div className="table-cards center"><div className="playing-card mini red">A</div><div className="playing-card mini">7</div><div className="playing-card mini">4</div></div><div className="table-cards hand">{["A","5","7"].map((x,i)=><button key={x} className={`playing-card ${i===0||i===2?"glow":""} ${selected===i?"picked":""}`} onClick={()=>{setSelected(i);if(i===0)setScore(s=>s+1)}}>{x}<small>♠</small></button>)}</div><div className="table-bottom"><span>你的得分 <b>{score}</b></span><span>AI · 意大利奶奶 🤖</span></div></div></section></main>;
}
