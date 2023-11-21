"use client";

import { NewForm } from "../components/NewForm";
import { billboardInputInitialObj, billboardInputValues } from "../lib/data";
import { getInputValues } from "../lib/utils";
import { validateBillboardPayload } from "../lib/validators/Billboard";

const Page = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <NewForm
        endpoint="billboard"
        queryKey="billboards"
        validator={validateBillboardPayload}
        inputValues={billboardInputValues}
        initialFormData={billboardInputInitialObj}
      />
    </div>
  );
};

export default Page;
