"use client";

import { useState } from "react";
import { Form } from "../components/Form";
import { Section } from "../components/Section";
import { useAddBillboard, useGetBillboards } from "../lib/queries/billboard";
import { useAddQuery, useGetQuery } from "../lib/queries/customQuery";
import { validateBillboardPayload } from "../lib/validators/Billboard";

const Page = () => {
  return (
    <div className="h-screen w-full justify-center items-center">
      <Section
        endpoint="billboard"
        queryKey="billboards"
        validator={validateBillboardPayload}
        heading="Add BIIIlLboards"
        label="Billboard"
        placeholder="Billboard"
        name="name"
        headings={["Billboard", "Date"]}
        customAddHook={useAddQuery}
        customGetHook={useGetQuery}
        title="Billboards"
        section="billBoard"
      />
    </div>
  );
};

export default Page;
