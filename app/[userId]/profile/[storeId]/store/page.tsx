"use client";

import BillBoardSection from "@/app/components/BillboardSection";
import ProductSection from "@/app/components/ProductSection";
import { useState } from "react";

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
    title: "Products",
    component: ProductSection,
  },
];

const Page = () => {
  const [showSection, setShowSection] = useState(
    Array(sections.length).fill(false),
  );
  return (
    <div className="p-10 text-white flex flex-col gap-2">
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
