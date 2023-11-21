"use client";

import { NewForm } from "../components/NewForm";
import {
  billboardInputInitialObj,
  billboardInputValues,
  categoryInputInitialObj,
  categoryInputValues,
  colorInputInitialObj,
  colorInputValues,
  productInputInitialObj,
  productInputValues,
  sizeInputInitialObj,
  sizeInputValues,
} from "../lib/data";
import { getInputValues } from "../lib/utils";
import { validateBillboardPayload } from "../lib/validators/Billboard";
import { validateProductPayload } from "../lib/validators/Product";
import { validateCategoryPayload } from "../lib/validators/category";
import { validateColorPayload } from "../lib/validators/color";
import { validateSizePayload } from "../lib/validators/size";

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
