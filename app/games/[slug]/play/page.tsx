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
  const [scopaCount, setScopaCount] = useState(0);
  const [lastCaptureCount, setLastCaptureCount] = useState(0);
  const [showCaptureGain, setShowCaptureGain] = useState(false);
  const [captureSettled, setCaptureSettled] = useState(false);
  const [tableCards, setTableCards] = useState<(number | null)[]>(SCOPA_TABLE);
  const [handCards, setHandCards] = useState<(number | null)[]>(SCOPA_HAND);
  const activeTableCards = tableCards.filter((card): card is number => card !== null);
  const selectedValue = selected === null ? null : handCards[selected] ?? null;
  const captureIndices = (() => {
    if (selectedValue === null) return [];
    const equalIndex = tableCards.findIndex((card) => card === selectedValue);
    if (equalIndex >= 0) return [equalIndex];
    const find = (start: number, remaining: number, picked: number[]): number[] | null => {
      if (remaining === 0) return picked;
      for (let i = start; i < tableCards.length; i++) {
        const card = tableCards[i];
        if (card !== null && card <= remaining) {
          const result = find(i + 1, remaining - card, [...picked, i]);
          if (result) return result;
        }
      }
      return null;
    };
    return find(0, selectedValue, []) ?? [];
  })();
  const captureTarget = selectedValue === null
    ? null
    : step === 2
      ? tableCards.findIndex((card) => card === null)
      : captureIndices[0] ?? null;
  const chooseCard = (index: number) => {
    if (phase !== "choose") return;
    const card = handCards[index];
    if (card === null) return;
    setSelected(index);
    if (step === 2 || canCapture(activeTableCards, card)) setPhase("play");
  };

  useEffect(() => {
    if (phase === "choose" || phase === "score") return;
    const timer = window.setTimeout(() => {
      if (phase === "play") {
        if (step === 2) {
          setTableCards((cards) => cards.map((tableCard, index) => index === captureTarget ? selectedValue : tableCard));
          setHandCards((cards) => cards.map((card, index) => index === selected ? null : card));
          setSelected(null);
          setCaptureSettled(true);
          setPhase("score");
          return;
        }
        setPhase("capture");
        return;
      }
      setTableCards((cards) => cards.map((card, index) => captureIndices.includes(index) ? null : card));
      setHandCards((cards) => cards.map((card, index) => index === selected ? null : card));
      setLastCaptureCount(captureIndices.length + 1);
      if (step === 3 && captureIndices.length === activeTableCards.length) setScopaCount((current) => current + 1);
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
    ? phase === "choose"
      ? "选择手牌 2：桌面没有可捕获的组合。"
      : phase === "play"
        ? "没有组合可吃，这张牌会留在桌面上。"
        : "这张 2 已成为新的场牌，得牌数量不变。"
    : step === 3
      ? phase === "choose"
        ? "选择手牌 6，吃掉桌面上的 A、2、3。"
        : phase === "play"
          ? "6 可以捕获 A + 2 + 3。"
          : phase === "capture"
            ? "桌面即将被清空——这就是 Scopa！"
            : "Scopa！你清空了桌面，获得 1 次 Scopa。"
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
      <div className="play-intro"><p className="eyebrow">SCOPA · INTERACTIVE TUTORIAL</p><h1>三分钟，<br /><em>学会 Scopa。</em></h1><p>选择一张手牌，完成出牌、吃牌和得牌，理解 Scopa 的核心规则。</p><div className="rule-list"><div><b>01</b><span>出牌 → 吃牌 → 得牌</span></div><div><b>02</b><span>无可捕获组合时，出牌留在桌面</span></div><div><b>03</b><span>清空桌面，获得一次 Scopa</span></div></div></div>
      <div className="game-stage">
        <div className="table" aria-live="polite">
          <div className="table-top"><span>SCOPA · 新手桌</span><span>第 {step} / 3 步</span></div>
          <div className="instruction">{instruction}<small>{step === 2 ? "目标：理解无法捕获时，打出的牌会留在桌面上。" : step === 3 ? "目标：捕获全部场牌，清空桌面。" : "目标：完成一次完整的出牌、吃牌和得牌。"}</small></div>
          <div className="table-cards center">{tableCards.map((x, i) => <div className="card-slot" key={`table-${i}`}>{x !== null && <div className={`playing-card ${x === 1 ? "red" : ""} ${phase === "capture" && captureIndices.includes(i) ? "capturing" : ""}`}>{x === 1 ? "A" : x}<small>♠</small></div>}</div>)}</div>
          <div className="table-cards hand">{handCards.map((x, i) => <div className="card-slot" key={`hand-${i}`}>{x !== null && <button aria-label={`选择 ${x === 1 ? "A" : x} 点牌`} style={selected === i && captureTarget !== null ? { "--fly-x": `${(captureTarget - i) * 78 - ((tableCards.length - handCards.length) * 78) / 2}px` } as CSSProperties : undefined} className={`playing-card ${step === 1 && canCapture(activeTableCards, x) ? "glow" : ""} ${selected === i ? `picked ${phase === "play" || phase === "capture" ? "flying" : ""}` : ""}`} onClick={() => chooseCard(i)}>{x === 1 ? "A" : x}<small>♠</small></button>}</div>)}</div>
          {(step === 1 || step === 3) && phase === "score" && showCaptureGain && <div className="score-pop">+{lastCaptureCount} 张</div>}
          <div className="table-bottom"><span>得牌 <b className={phase === "score" ? "score-pulse" : ""}>{capturedCount}</b> · Scopa <b>{scopaCount}</b></span><span>AI · 意大利奶奶 🤖</span></div>
        </div>
        {step === 1 && phase === "score" && captureSettled && <div className="tutorial-actions"><button className="btn primary" onClick={() => { setTableCards([1, 3, 4, 7, null]); setHandCards([2, null, null]); setSelected(null); setCaptureSettled(false); setStep(2); setPhase("choose"); }}>进入第 2 步 →</button></div>}
        {step === 2 && phase === "score" && captureSettled && <div className="tutorial-actions"><button className="btn primary" onClick={() => { setTableCards([1, 2, 3, null]); setHandCards([6, null, null]); setSelected(null); setCaptureSettled(false); setStep(3); setPhase("choose"); }}>进入第 3 步 →</button></div>}
        {step === 3 && phase === "score" && captureSettled && <div className="tutorial-actions"><span className="status-note">教程完成 · Scopa!</span></div>}
      </div>
    </section>
  </main>;
}
