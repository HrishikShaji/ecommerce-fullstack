"use client";

import { useState } from "react";
import { Section } from "../components/Section";
import { sectionsData } from "../lib/data";
import {
  QueryKey,
  SectionType,
  TitleType,
  ValidateTypePayload,
  Validator,
} from "@/types/types";

const Page = () => {
  const [showSection, setShowSection] = useState(
    Array(sectionsData.length).fill(false),
  );
  return (
    <div className="text-white p-10 flex flex-col gap-4">
      {sectionsData.map((section, i) => {
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
            {showSection[i] && (
              <Section
                endpoint={section.endpoint}
                queryKey={section.queryKey as QueryKey}
                validator={section.validator as Validator<ValidateTypePayload>}
                heading={section.heading}
                label={section.label}
                placeholder={section.placeholder}
                name={section.name}
                headings={section.headings}
                customAddHook={section.customAddHook}
                customGetHook={section.customGetHook}
                title={section.title as TitleType}
                section={section.section as SectionType}
                inputInitialObj={section.inputInitialObj}
                inputValues={section.inputValues}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Page;
