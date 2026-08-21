/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { canCapture, SCOPA_HAND, SCOPA_TABLE } from "../../../../lib/scopa";

type Phase = "choose" | "play" | "capture" | "score" | "ai";

const cardSuits = ["b", "c", "d", "s"] as const;
const cardValue = (card: number) => (card % 10) + 1;
const cardSuit = (card: number) => cardSuits[Math.floor(card / 10) % cardSuits.length];

function CardFace({ value, className = "", small = false }: { value: number; className?: string; small?: boolean }) {
  const face = cardValue(value);
  const suit = cardSuit(value);
  return <img className={`playing-card-image ${small ? "playing-card-image-small" : ""} ${className}`} src={`/cards/napoletane/${face}${suit}.jpg`} alt={`${face === 1 ? "A" : face} 点牌`} />;
}

function CardBack({ index }: { index: number }) {
  return <img className="playing-card-image playing-card-back" src="/cards/napoletane/bg.jpg" alt={`AI 手牌 ${index + 1}，牌面朝下`} />;
}

function getCaptureIndices(table: (number | null)[], value: number) {
  const equalIndex = table.findIndex((card) => card !== null && cardValue(card) === value);
  if (equalIndex >= 0) return [equalIndex];
  const find = (start: number, remaining: number, picked: number[]): number[] | null => {
    if (remaining === 0) return picked;
    for (let index = start; index < table.length; index += 1) {
      const card = table[index];
      if (card !== null && cardValue(card) <= remaining) {
        const result = find(index + 1, remaining - cardValue(card), [...picked, index]);
        if (result) return result;
      }
    }
    return null;
  };
  return find(0, value, []) ?? [];
}

function shuffleCards(cards: number[]) {
  return [...cards].sort(() => Math.random() - 0.5);
}

function drawRandomCards(cards: number[], count: number) {
  return shuffleCards(cards).slice(0, count);
}

export default function ScopaPlayPage() {
  const [selected, setSelected] = useState<number | null>(null);
  const [playedValue, setPlayedValue] = useState<number | null>(null);
  const [playedCard, setPlayedCard] = useState<number | null>(null);
  const [round, setRound] = useState(1);
  const [aiHandCount, setAiHandCount] = useState(3);
  const [aiCapturedCount, setAiCapturedCount] = useState(0);
  const [deckRemaining, setDeckRemaining] = useState(30);
  const [gameComplete, setGameComplete] = useState(false);
  const [phase, setPhase] = useState<Phase>("choose");
  const [capturedCount, setCapturedCount] = useState(0);
  const [scopaCount, setScopaCount] = useState(0);
  const [lastCaptureCount, setLastCaptureCount] = useState(0);
  const [showCaptureGain, setShowCaptureGain] = useState(false);
  const [captureSettled, setCaptureSettled] = useState(false);
  const [tableCards, setTableCards] = useState<(number | null)[]>(SCOPA_TABLE);
  const [handCards, setHandCards] = useState<(number | null)[]>(SCOPA_HAND);
  const [aiCards, setAiCards] = useState<(number | null)[]>([null, null, null]);
  const [deckCards, setDeckCards] = useState<number[]>(() => Array.from({ length: 40 }, (_, index) => index));
  const [hasDealtRandomly, setHasDealtRandomly] = useState(false);

  useEffect(() => {
    if (hasDealtRandomly) return;
    const timer = window.setTimeout(() => {
      const openingCards = drawRandomCards(deckCards, 10);
      const remainingDeck = deckCards.filter((card) => !openingCards.includes(card));
      setTableCards(openingCards.slice(0, 4));
      setHandCards(openingCards.slice(4, 7));
      setAiCards(openingCards.slice(7, 10));
      setDeckCards(remainingDeck);
      setDeckRemaining(remainingDeck.length);
      setAiHandCount(3);
      setHasDealtRandomly(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [deckCards, hasDealtRandomly]);
  const activeTableCards = tableCards.filter((card): card is number => card !== null).map(cardValue);
  const selectedCard = selected === null ? null : handCards[selected] ?? null;
  const selectedValue = selectedCard === null ? null : cardValue(selectedCard);
  const captureIndices = (() => {
    if (selectedValue === null) return [];
    const equalIndex = tableCards.findIndex((card) => card !== null && cardValue(card) === selectedValue);
    if (equalIndex >= 0) return [equalIndex];
    const find = (start: number, remaining: number, picked: number[]): number[] | null => {
      if (remaining === 0) return picked;
      for (let i = start; i < tableCards.length; i++) {
        const card = tableCards[i];
        if (card !== null && cardValue(card) <= remaining) {
          const result = find(i + 1, remaining - cardValue(card), [...picked, i]);
          if (result) return result;
        }
      }
      return null;
    };
    return find(0, selectedValue, []) ?? [];
  })();
  const captureTarget = selectedValue === null
    ? null
    : captureIndices[0] ?? null;
  const chooseCard = (index: number) => {
    if (phase !== "choose") return;
    const card = handCards[index];
    if (card === null) return;
    console.log("Scopa: player selects card", { index, card, tableCards, phase });
    setSelected(index);
    setPlayedValue(card);
    setPlayedCard(card);
    setPhase("play");
  };

  useEffect(() => {
    if (phase === "choose" || phase === "score" || phase === "ai") return;
    const timer = window.setTimeout(() => {
      console.log("Scopa: resolve player play", { phase, selected, playedValue, captureIndices, tableCards });
      if (phase === "play") {
        if (captureIndices.length === 0) {
          if (playedCard === null) return;
          console.log("Scopa: no capture, place card", { playedValue: cardValue(playedCard), tableCards });
          setTableCards((cards) => {
            const emptyIndex = cards.findIndex((card) => card === null);
            if (emptyIndex < 0) return [...cards, playedCard];
            return cards.map((card, index) => index === emptyIndex ? playedCard : card);
          });
          setHandCards((cards) => cards.map((card, cardIndex) => cardIndex === selected ? null : card));
          setSelected(null);
          setPlayedValue(null);
          setPlayedCard(null);
          setLastCaptureCount(0);
          window.setTimeout(() => setCaptureSettled(true), 800);
          setPhase("score");
          return;
        }
        setPhase("capture");
        return;
      }
      setTableCards((cards) => cards.map((card, index) => captureIndices.includes(index) ? null : card));
      setHandCards((cards) => cards.map((card, index) => index === selected ? null : card));
      setLastCaptureCount(captureIndices.length + 1);
      if (round === 3 && captureIndices.length === activeTableCards.length) setScopaCount((current) => current + 1);
      setSelected(null);
      setPlayedValue(null);
      setPlayedCard(null);
      setShowCaptureGain(true);
      setPhase("score");
    }, phase === "play" ? 700 : 850);
    return () => window.clearTimeout(timer);
  }, [activeTableCards.length, captureIndices, captureTarget, phase, playedValue, round, selected, selectedValue, tableCards]);

  useEffect(() => {
    if (phase !== "score" || !showCaptureGain) return;
    const timer = window.setTimeout(() => {
      setCapturedCount((current) => current + lastCaptureCount);
      setShowCaptureGain(false);
      setCaptureSettled(true);
    }, 800);
    return () => window.clearTimeout(timer);
  }, [lastCaptureCount, phase, showCaptureGain]);

  useEffect(() => {
    if (phase !== "score" || !captureSettled) return;
    const timer = window.setTimeout(() => setPhase("ai"), 250);
    return () => window.clearTimeout(timer);
  }, [captureSettled, phase, round]);

  useEffect(() => {
    if (phase !== "ai") return;
    const timer = window.setTimeout(() => {
      const aiCardIndex = aiCards.findIndex((card) => card !== null);
      const aiCard = aiCardIndex >= 0 ? aiCards[aiCardIndex] : null;
      if (aiCard === null) return;
      const aiCaptureIndices = getCaptureIndices(tableCards, cardValue(aiCard));
      if (aiCaptureIndices.length > 0) {
        setAiCapturedCount((count) => count + aiCaptureIndices.length + 1);
      }
      setTableCards((cards) => {
        if (aiCaptureIndices.length > 0) {
          return cards.map((card, index) => aiCaptureIndices.includes(index) ? null : card);
        }
        const landingIndex = cards.findIndex((card) => card === null);
        if (landingIndex < 0) return [...cards, aiCard];
        return cards.map((card, index) => card === null && index === landingIndex ? aiCard : card);
      });
      setAiHandCount((count) => Math.max(0, count - 1));
      setAiCards((cards) => cards.map((card, index) => index === aiCardIndex ? null : card));
      // AI 的牌落桌后，才交还控制权给玩家。
      window.setTimeout(() => {
      setSelected(null);
      setCaptureSettled(false);
      if (round === 3) {
        if (deckRemaining < 6) {
          setGameComplete(true);
          setPhase("score");
          return;
        }
        // 双方三张手牌都打完后，保留桌面，继续依次发下一组三张。
        const nextDeal = drawRandomCards(deckCards, 6);
        const remainingDeck = deckCards.filter((card) => !nextDeal.includes(card));
        setHandCards(nextDeal.slice(0, 3));
        setAiCards(nextDeal.slice(3, 6));
        setAiHandCount(3);
        setDeckCards(remainingDeck);
        setDeckRemaining((count) => Math.max(0, count - 6));
        setRound(1);
        setPhase("choose");
        return;
      }
      setRound((current) => current + 1);
      setPhase("choose");
      }, 850);
    }, 650);
    return () => window.clearTimeout(timer);
  }, [phase, round]);

  const instruction = phase === "ai"
    ? "对方正在出牌……"
    : round === 2
    ? phase === "choose"
      ? "选择一张手牌，按规则决定是否收牌。"
      : phase === "play"
        ? "正在判断这张牌可以收走哪些牌。"
        : phase === "capture"
          ? "选择的牌正在收走桌面上的组合。"
          : "出牌完成，接下来轮到对手。"
    : round === 3
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
      <div className="play-intro"><p className="eyebrow">SCOPA · COMPLETE TEACHING ROUND</p><h1>坐下来，<br /><em>完整玩一局。</em></h1><p>跟着这一局牌自然推进：你会遇到捕获、落牌和清空桌面三种关键时刻。</p><div className="rule-list"><div><b>01</b><span>先出牌，再决定如何捕获</span></div><div><b>02</b><span>无法捕获时，牌会留在桌面</span></div><div><b>03</b><span>清空桌面，获得一次 Scopa</span></div></div><a className="text-link tutorial-rules-link" href="/games/scopa/rules">查看完整规则 →</a></div>
      <div className="game-stage">
        <div className="table" aria-live="polite">
          <div className="table-top"><span>SCOPA · 教学局</span><span>{phase === "ai" ? "对方回合" : "你的回合"}</span></div>
          <div className="instruction">{instruction}<small>{phase === "ai" ? "对方从手牌中打出一张牌。" : round === 2 ? "这一手会展示：无法捕获时，出牌会留在桌面。" : round === 3 ? "这一手会展示：捕获全部场牌就是 Scopa。" : "从这里开始你的第一手牌。"}</small></div>
          <div className="opponent-hand" aria-label={`对手得牌 ${aiCapturedCount} 张，剩余手牌 ${aiHandCount} 张`}><span>对手得牌 · {aiCapturedCount} 张</span><div className="table-cards">{[0, 1, 2].map((index) => <div className="card-slot" key={`opponent-${index}`}>{index < aiHandCount && <CardBack index={index} />}</div>)}</div></div>
          <div className="table-cards center">{tableCards.map((x, i) => <div className="card-slot" style={{ "--slot-column": Math.min(i + 4, 10) } as CSSProperties} key={`table-${i}`}>{x !== null && <CardFace value={x} className={phase === "capture" && captureIndices.includes(i) ? "capturing" : ""} />}</div>)}</div>
          <div className="table-cards hand">{handCards.map((x, i) => <div className="card-slot" key={`hand-${i}`}>{x !== null && <button aria-label={`选择 ${cardValue(x) === 1 ? "A" : cardValue(x)} 点牌`} style={selected === i ? { "--fly-x": `${(((captureTarget === null ? (tableCards.findIndex((card) => card === null) >= 0 ? tableCards.findIndex((card) => card === null) : tableCards.length) : captureTarget) + 4 - 5.5) * 78) - ((i - (handCards.length - 1) / 2) * 78)}px` } as CSSProperties : undefined} className={`playing-card ${canCapture(activeTableCards, cardValue(x)) ? "glow" : ""} ${selected === i ? `picked ${phase === "play" || phase === "capture" ? "flying" : ""}` : ""}`} onClick={() => chooseCard(i)}><CardFace value={x} small /></button>}</div>)}</div>
          {(round === 1 || round === 3) && phase === "score" && showCaptureGain && <div className="score-pop">+{lastCaptureCount} 张</div>}
          <div className="table-bottom"><span>得牌 <b className={phase === "score" ? "score-pulse" : ""}>{capturedCount}</b> · Scopa <b>{scopaCount}</b></span><span>牌堆 <b>{deckRemaining}</b> 张</span></div>
        </div>
        {gameComplete && <div className="tutorial-actions"><span className="status-note">牌堆已耗尽 · 牌局结束</span></div>}
      </div>
    </section>
  </main>;
}
