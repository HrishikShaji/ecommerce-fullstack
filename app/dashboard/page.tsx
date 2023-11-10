"use client";
import { useState } from "react";
import { CategorySection } from "../components/CategorySection";
import { ProductSection } from "../components/ProductSection";
import { BillboardSection } from "../components/BillboardSection";
import { SizeSection } from "../components/SizeSection";
import { ColorSection } from "../components/ColorSection";

const sections = [
  {
    title: "Billboard",
    component: <BillboardSection />,
  },
  {
    title: "Category",
    component: <CategorySection />,
  },
  {
    title: "Product",
    component: <ProductSection />,
  },
  {
    title: "Size",
    component: <SizeSection />,
  },
  {
    title: "Color",
    component: <ColorSection />,
  },
];

const Page = () => {
  const [showSection, setShowSection] = useState(
    Array(sections.length).fill(false),
  );
  return (
    <div className="text-white p-10 flex flex-col gap-4">
      {sections.map((section, i) => {
        return (
          <div key={i}>
            <div
              className="p-2  w-full font-semibold cursor-pointer text-xl bg-neutral-800 hover:bg-neutral-700"
              onClick={() => {
                const newShowSections = [...showSection];
                newShowSections[i] = !newShowSections[i];
                setShowSection(newShowSections);
              }}
            >
              {section.title}
            </div>
            {showSection[i] && section.component}
          </div>
        );
      })}
    </div>
  );
};

export default Page;
