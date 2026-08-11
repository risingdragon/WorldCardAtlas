/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { canCapture, SCOPA_HAND, SCOPA_TABLE } from "../../../../lib/scopa";

type Phase = "choose" | "play" | "capture" | "score";

export default function ScopaPlayPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState<Phase>("choose");
  const [capturedCount, setCapturedCount] = useState(0);
  const [lastCaptureCount, setLastCaptureCount] = useState(0);
  const [showCaptureGain, setShowCaptureGain] = useState(false);
  const [captureSettled, setCaptureSettled] = useState(false);
  const [tableCards, setTableCards] = useState<(number | null)[]>(SCOPA_TABLE);
  const [handCards, setHandCards] = useState<(number | null)[]>(SCOPA_HAND);
  const activeTableCards = tableCards.filter((card): card is number => card !== null);
  const selectedValue = selected === null ? null : handCards[selected] ?? null;
  const captureTarget = selectedValue === null
    ? null
    : SCOPA_TABLE.findIndex((card) => card === selectedValue) >= 0
      ? SCOPA_TABLE.findIndex((card) => card === selectedValue)
      : SCOPA_TABLE.findIndex((card) => card < selectedValue);
  const captureIndices = (() => {
    if (selectedValue === null) return [];
    const equalIndex = SCOPA_TABLE.findIndex((card) => card === selectedValue);
    if (equalIndex >= 0) return [equalIndex];
    const find = (start: number, remaining: number, picked: number[]): number[] | null => {
      if (remaining === 0) return picked;
      for (let i = start; i < SCOPA_TABLE.length; i++) {
        if (SCOPA_TABLE[i] <= remaining) {
          const result = find(i + 1, remaining - SCOPA_TABLE[i], [...picked, i]);
          if (result) return result;
        }
      }
      return null;
    };
    return find(0, selectedValue, []) ?? [];
  })();
  const chooseCard = (index: number) => {
    if (step !== 1 || phase !== "choose") return;
    const card = handCards[index];
    if (card === null) return;
    setSelected(index);
    if (canCapture(activeTableCards, card)) setPhase("play");
  };

  useEffect(() => {
    if (step !== 1 || phase === "choose" || phase === "score") return;
    const timer = window.setTimeout(() => {
      if (phase === "play") {
        setPhase("capture");
        return;
      }
      setTableCards((cards) => cards.map((card, index) => captureIndices.includes(index) ? null : card));
      setHandCards((cards) => cards.map((card, index) => index === selected ? null : card));
      setLastCaptureCount(captureIndices.length + 1);
      setSelected(null);
      setShowCaptureGain(true);
      setPhase("score");
    }, phase === "play" ? 700 : 850);
    return () => window.clearTimeout(timer);
  }, [phase, step]);

  useEffect(() => {
    if (phase !== "score" || !showCaptureGain) return;
    const timer = window.setTimeout(() => {
      setCapturedCount((current) => current + lastCaptureCount);
      setShowCaptureGain(false);
      setCaptureSettled(true);
    }, 800);
    return () => window.clearTimeout(timer);
  }, [lastCaptureCount, phase, showCaptureGain]);

  const instruction = step === 2
    ? "你已经完成一轮捕获。"
    : step === 3
      ? "完成！你已经掌握 Scopa 的基本捕获规则。"
      : phase === "choose"
        ? "从手牌中选择一张牌"
        : phase === "play"
          ? "出牌成功！接下来会自动吃牌。"
          : phase === "capture"
            ? "选择的牌可以吃掉桌面上的组合。"
            : "捕获完成！这些牌已放入你的得牌区。";

  return <main className="play-page">
    <nav className="nav"><a className="brand" href="/"><span className="brand-mark">✦</span> WORLD CARD <small>ATLAS</small></a><a className="back-link" href="/games/scopa">← 返回 Scopa 档案</a></nav>
    <section className="play-shell">
      <div className="play-intro"><p className="eyebrow">SCOPA · INTERACTIVE TUTORIAL</p><h1>三分钟，<br /><em>学会 Scopa。</em></h1><p>选择一张手牌，完成出牌、吃牌和得分，理解 Scopa 的核心规则。</p><div className="rule-list"><div><b>01</b><span>出牌 → 吃牌 → 得分</span></div><div><b>02</b><span>捕获点数相加等于它的牌</span></div><div><b>03</b><span>捕获最多牌，赢得胜利</span></div></div></div>
      <div className="game-stage">
      <div className="table" aria-live="polite">
        <div className="table-top"><span>SCOPA · 新手桌</span><span>第 {step} / 3 步</span></div>
        <div className="instruction">{instruction}<small>目标：完成一次完整的出牌、吃牌和得分。</small></div>
        <div className="table-cards center">{tableCards.map((x, i) => <div className="card-slot" key={`table-${i}`}>{x !== null && <div className={`playing-card ${x === 1 ? "red" : ""} ${phase === "capture" && captureIndices.includes(i) ? "capturing" : ""}`}>{x === 1 ? "A" : x}<small>♠</small></div>}</div>)}</div>
        <div className="table-cards hand">{handCards.map((x, i) => <div className="card-slot" key={`hand-${i}`}>{x !== null && <button aria-label={`选择 ${x === 1 ? "A" : x} 点牌`} style={selected === i && captureTarget !== null ? { "--fly-x": `${(captureTarget - i) * 78 - 39}px` } as CSSProperties : undefined} className={`playing-card ${canCapture(activeTableCards, x) ? "glow" : ""} ${selected === i ? `picked ${phase === "play" || phase === "capture" ? "flying" : ""}` : ""}`} onClick={() => chooseCard(i)}>{x === 1 ? "A" : x}<small>♠</small></button>}</div>)}</div>
        {step === 1 && phase === "score" && showCaptureGain && <div className="score-pop">+{lastCaptureCount} 张</div>}
        <div className="table-bottom"><span>你的得牌 <b className={phase === "score" ? "score-pulse" : ""}>{capturedCount}</b></span><span>AI · 意大利奶奶 🤖</span></div>
      </div>
      {step === 1 && phase === "score" && captureSettled && <div className="tutorial-actions"><button className="btn primary" onClick={() => setStep(2)}>进入第 2 步 →</button></div>}
      {step === 2 && <div className="tutorial-actions"><button className="btn primary" onClick={() => setStep(3)}>进入第 3 步 →</button></div>}
      </div>
    </section>
  </main>;
}
