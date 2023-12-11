"use client";
import { BillboardTiles } from "./components/BillboardTiles";
import { CategoryTiles } from "./components/CateggoryTiles";

export default function Home() {
  return (
    <main className="flex min-h-screen text-white flex-col items-center justify-between p-24">
      <CategoryTiles />
      <BillboardTiles />
    </main>
  );
}
