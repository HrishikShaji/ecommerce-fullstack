"use client";
import { BillboardTiles } from "./components/BillboardTiles";
import { BrandTiles } from "./components/BrandTiles";
import { CategoryTiles } from "./components/CateggoryTiles";
import { ColorTiles } from "./components/ColorTiles";
import { DiscountTiles } from "./components/DiscountTiles";
import { PriceTiles } from "./components/PriceTiles";

export default function Home() {
  return (
    <main className="flex min-h-screen text-white flex-col gap-20 items-center  p-10">
      <BillboardTiles />
      <CategoryTiles />
      <PriceTiles />
      <DiscountTiles />
      <BrandTiles />
      <ColorTiles />
    </main>
  );
}
