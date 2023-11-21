"use client";

import { NewForm } from "../components/NewForm";
import { billboardInputInitialObj, billboardInputValues } from "../lib/data";
import { getInputValues } from "../lib/utils";

const Page = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <NewForm
        inputValues={billboardInputValues}
        initialFormData={billboardInputInitialObj}
      />
    </div>
  );
};

export default Page;
