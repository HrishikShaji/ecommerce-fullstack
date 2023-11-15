"use client";

import { useState } from "react";
import { Form } from "../components/Form";
import { Section } from "../components/Section";
import { useAddBillboard, useGetBillboards } from "../lib/queries/billboard";

const Page = () => {
  return (
    <div className="h-screen w-full justify-center items-center">
      <Section
        heading="Add BIIIlLboards"
        label="Billboard"
        placeholder="Billboard"
        name="name"
        headings={["Billboard", "Date"]}
        customAddHook={useAddBillboard}
        customGetHook={useGetBillboards}
        title="Billboards"
        section="billBoard"
      />
    </div>
  );
};

export default Page;
