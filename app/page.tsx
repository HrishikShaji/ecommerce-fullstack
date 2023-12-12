"use client";
import { BillboardTiles } from "./components/BillboardTiles";
import { CategoryTiles } from "./components/CateggoryTiles";
import { PriceTiles } from "./components/PriceTiles";

export default function Home() {
  return (
    <main className="flex min-h-screen text-white flex-col items-center  p-24">
      <CategoryTiles />
      <BillboardTiles />
      <PriceTiles />
    </main>
  );
}
