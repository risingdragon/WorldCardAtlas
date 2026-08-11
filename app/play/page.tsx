/* eslint-disable @next/next/no-html-link-for-pages */
"use client";
import { useState } from "react";

export default function PlayPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [step, setStep] = useState(1);
  // Scopa starts with four face-up cards on the table.
  const tableCards = [1, 7, 4, 2];
  const handCards = [1, 5, 7];
  const canCapture = (value: number) => {
    // In Scopa, an equal-value table card is captured directly; otherwise
    // any subset whose values add up to the played card can be captured.
    const findSubset = (cards: number[], target: number, start = 0): boolean => {
      if (target === 0) return true;
      for (let i = start; i < cards.length; i++) {
        if (cards[i] <= target && findSubset(cards, target - cards[i], i + 1)) return true;
      }
      return false;
    };
    return findSubset(tableCards, value);
  };
  const handleSelect = (index: number) => {
    setSelected(index);
    if (canCapture(handCards[index])) setScore((current) => current + 1);
  };
  const selectedValue = selected === null ? null : handCards[selected];
  const selectedCanCapture = selectedValue !== null && canCapture(selectedValue);
  const instruction = step === 1
    ? selected === null ? "从手牌中选择一张牌" : selectedCanCapture ? `很好！${handCards[selected]} 可以捕获桌面上的组合。` : "这张牌暂时没有可捕获的组合。"
    : step === 2 ? "捕获后，牌会从桌面移到你的牌堆。"
    : "完成！你已经掌握 Scopa 的基本捕获规则。";
  return <main className="play-page"><nav className="nav"><a className="brand" href="/"><span className="brand-mark">✦</span> WORLD CARD <small>ATLAS</small></a><a className="back-link" href="/">← 返回探索</a></nav><section className="play-shell"><div className="play-intro"><p className="eyebrow">SCOPA · INTERACTIVE TUTORIAL</p><h1>三分钟，<br/><em>学会 Scopa。</em></h1><p>这是意大利最受欢迎的传统纸牌游戏之一。捕获桌面上的牌，积累分数，先理解目标，再慢慢掌握技巧。</p><div className="rule-list"><div><b>01</b><span>从手牌中选择一张牌</span></div><div><b>02</b><span>捕获点数相加等于它的牌</span></div><div><b>03</b><span>捕获最多牌，赢得胜利</span></div></div><a className="text-link" href="/">查看完整游戏档案 →</a></div><div className="table"><div className="table-top"><span>SCOPA · 新手桌</span><span>第 {step} / 3 步</span></div><div className="instruction">{instruction}<small>目标：捕获桌面上的牌，拿到最多分数。</small></div><div className="table-cards center">{tableCards.map((x,i)=><div key={i} className={`playing-card mini ${i===0?"red":""}`}>{x === 1 ? "A" : x}</div>)}</div><div className="table-cards hand">{handCards.map((x,i)=><button key={x} className={`playing-card ${canCapture(x)?"glow":""} ${selected===i?"picked":""}`} onClick={()=>handleSelect(i)}>{x === 1 ? "A" : x}<small>♠</small></button>)}</div>{step < 3 && ((step === 1 && selectedCanCapture) || step === 2) && <div className="hero-actions"><button className="btn primary" onClick={()=>setStep(step + 1)}>{step === 1 ? "进入第 2 步 →" : "进入第 3 步 →"}</button></div>}<div className="table-bottom"><span>你的得分 <b>{score}</b></span><span>AI · 意大利奶奶 🤖</span></div></div></section></main>;
}
