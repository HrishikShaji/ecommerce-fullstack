"use client";

import { ReactNode, useState } from "react";
import BillBoardSection from "../components/BillboardSection";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import SizeSection from "../components/SizeSection";
import ColorSection from "../components/ColorSection";

type Section = {
  title: string;
  component: React.ComponentType;
};

const sections: Section[] = [
  {
    title: "Billboards",
    component: BillBoardSection,
  },
  {
    title: "Categories",
    component: CategorySection,
  },
  {
    title: "Products",
    component: ProductSection,
  },
  {
    title: "Sizes",
    component: SizeSection,
  },
  {
    title: "Colors",
    component: ColorSection,
  },
];

const Page = () => {
  const [showSection, setShowSection] = useState(
    Array(sections.length).fill(false),
  );
  return (
    <div className="text-white p-10 flex flex-col gap-4">
      {sections.map((section, i) => {
        const Section = section.component;
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
            {showSection[i] && <Section />}
          </div>
        );
      })}
    </div>
  );
};

export default Page;
