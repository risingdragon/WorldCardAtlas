import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "World Card Atlas · 探索世界纸牌文化", description: "探索全球纸牌文化，理解它们的故事，并立即开始游玩。" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-CN"><body>{children}</body></html>; }
