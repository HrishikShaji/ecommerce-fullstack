import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { EndpointType, QueryKey } from "@/types/types";
import { FinalInputType, InputValuesDataType } from "../lib/data";
import NewDropDown, { NewDropDownRef } from "./NewDropDown";
import { PayloadType, getInputValues } from "../lib/utils";
import { NewImageUploaderRef } from "./NewImageUploader";
import NewImageUploader from "./NewImageUploader";
import { useAddQuery } from "../lib/queries/customQuery";
import { Button } from "./Button";

interface NewFormProps {
  inputValues: InputValuesDataType[];
  initialFormData: PayloadType;
  endpoint: EndpointType;
  validator: (inputs: PayloadType) => typeof inputs;
  queryKey: QueryKey;
}

export function NewForm(props: NewFormProps) {
  const [formData, setFormData] = useState(props.initialFormData);
  const formValues = getInputValues({
    inputs: props.inputValues,
    formData: formData,
  }) as FinalInputType[];
  const imageUploaderRef = useRef<NewImageUploaderRef>(null);
  const dropdownRef = useRef<NewDropDownRef>(null);

  const { add, isPending, isError, error } = useAddQuery({
    endpoint: props.endpoint,
    validator: props.validator,
    queryKey: props.queryKey,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    add(formData);
    imageUploaderRef.current?.setUploadedFiles([]);
    imageUploaderRef.current?.setFiles([]);
    imageUploaderRef.current?.reset();
    imageUploaderRef.current?.setIsImage(false);
    dropdownRef.current?.setSelectedItem("");
    setFormData(props.initialFormData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="flex flex-col gap-2 items-start " onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-4">
        {formValues.map((input, i) =>
          input.type === "Input" ? (
            <InputItem key={i} inputItem={input} handleChange={handleChange} />
          ) : input.type === "Image" ? (
            <NewImageUploader
              key={i}
              setFormData={setFormData}
              value={input.value}
              label={input.label as string}
              ref={imageUploaderRef}
            />
          ) : (
            <NewDropDown
              ref={dropdownRef}
              key={i}
              setFormData={setFormData}
              value={input.value}
              endpoint={input.endpoint as EndpointType}
              queryKey={input.queryKey as QueryKey}
              label={input.label as string}
            />
          ),
        )}
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button isPending={isPending} />
    </form>
  );
}

interface InputItemProps {
  inputItem: FinalInputType;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputItem: React.FC<InputItemProps> = ({ inputItem, handleChange }) => {
  const { label, ...inputProps } = inputItem;
  return (
    <div className="flex flex-col gap-2">
      <label>{inputItem.label}</label>
      <input
        className="p-2 rounded-md text-black"
        {...inputProps}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};
