/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect, useState } from "react";
import { canCapture, SCOPA_HAND, SCOPA_TABLE } from "../../../../lib/scopa";

type Phase = "choose" | "play" | "capture" | "score";

export default function ScopaPlayPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState<Phase>("choose");
  const [score, setScore] = useState(0);
  const chooseCard = (index: number) => {
    if (step !== 1 || phase !== "choose") return;
    setSelected(index);
    if (canCapture(SCOPA_TABLE, SCOPA_HAND[index])) setPhase("play");
  };

  useEffect(() => {
    if (step !== 1 || phase === "choose" || phase === "score") return;
    const timer = window.setTimeout(() => {
      setPhase((current) => current === "play" ? "capture" : "score");
      if (phase === "capture") setScore((current) => current + 1);
    }, phase === "play" ? 700 : 850);
    return () => window.clearTimeout(timer);
  }, [phase, step]);

  const instruction = step === 2
    ? "你已经完成一轮捕获。"
    : step === 3
      ? "完成！你已经掌握 Scopa 的基本捕获规则。"
      : phase === "choose"
        ? "从手牌中选择一张牌"
        : phase === "play"
          ? "出牌成功！现在点击“吃牌”。"
          : phase === "capture"
            ? "选择的牌可以吃掉桌面上的组合。"
            : "得分！捕获的牌已计入你的分数。";

  return <main className="play-page">
    <nav className="nav"><a className="brand" href="/"><span className="brand-mark">✦</span> WORLD CARD <small>ATLAS</small></a><a className="back-link" href="/games/scopa">← 返回 Scopa 档案</a></nav>
    <section className="play-shell">
      <div className="play-intro"><p className="eyebrow">SCOPA · INTERACTIVE TUTORIAL</p><h1>三分钟，<br /><em>学会 Scopa。</em></h1><p>选择一张手牌，完成出牌、吃牌和得分，理解 Scopa 的核心规则。</p><div className="rule-list"><div><b>01</b><span>出牌 → 吃牌 → 得分</span></div><div><b>02</b><span>捕获点数相加等于它的牌</span></div><div><b>03</b><span>捕获最多牌，赢得胜利</span></div></div></div>
      <div className="table" aria-live="polite">
        <div className="table-top"><span>SCOPA · 新手桌</span><span>第 {step} / 3 步</span></div>
        <div className="instruction">{instruction}<small>目标：完成一次完整的出牌、吃牌和得分。</small></div>
        <div className="table-cards center">{SCOPA_TABLE.map((x, i) => <div key={i} className={`playing-card mini ${i === 0 ? "red" : ""} ${phase === "capture" ? "capturing" : ""}`}>{x === 1 ? "A" : x}<small>♠</small></div>)}</div>
        <div className="table-cards hand">{SCOPA_HAND.map((x, i) => <button aria-label={`选择 ${x === 1 ? "A" : x} 点牌`} key={i} className={`playing-card ${canCapture(SCOPA_TABLE, x) ? "glow" : ""} ${selected === i ? `picked ${phase === "play" ? "playing" : ""}` : ""}`} onClick={() => chooseCard(i)}>{x === 1 ? "A" : x}<small>♠</small></button>)}</div>
        {step === 1 && phase === "score" && <div className="score-pop">+1</div>}
        {step === 1 && phase === "score" && <div className="hero-actions"><button className="btn primary" onClick={() => setStep(2)}>进入第 2 步 →</button></div>}
        {step === 2 && <div className="hero-actions"><button className="btn primary" onClick={() => setStep(3)}>进入第 3 步 →</button></div>}
        <div className="table-bottom"><span>你的得分 <b className={phase === "score" ? "score-pulse" : ""}>{score}</b></span><span>AI · 意大利奶奶 🤖</span></div>
      </div>
    </section>
  </main>;
}
