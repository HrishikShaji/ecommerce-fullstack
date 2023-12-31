"use client";

import { ReactNode, useState } from "react";
import CategorySection from "../components/CategorySection";
import SizeSection from "../components/SizeSection";
import ColorSection from "../components/ColorSection";
import BrandSection from "../components/BrandSection";

type Section = {
  title: string;
  component: React.ComponentType;
};

const sections: Section[] = [
  {
    title: "Categories",
    component: CategorySection,
  },
  {
    title: "Sizes",
    component: SizeSection,
  },
  {
    title: "Colors",
    component: ColorSection,
  },
  {
    title: "Brands",
    component: BrandSection,
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
