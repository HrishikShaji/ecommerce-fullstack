import {
  ChangeEvent,
  FormEvent,
  Validator,
  useEffect,
  useRef,
  useState,
} from "react";
import { EndpointType, QueryKey, ValidateTypePayload } from "@/types/types";
import { FinalInputType, InputValuesDataType } from "../lib/data";
import NewDropDown, { NewDropDownRef } from "./NewDropDown";
import { getInputValues } from "../lib/utils";
import { NewImageUploaderRef } from "./NewImageUploader";
import NewImageUploader from "./NewImageUploader";
import { useAddQuery } from "../lib/queries/customQuery";

interface NewFormProps<T> {
  inputValues: InputValuesDataType[];
  initialFormData: Record<string, any>;
  endpoint: EndpointType;
  validator: Validator<T>;
  queryKey: QueryKey;
}

export const NewForm = <T,>(props: NewFormProps<T>) => {
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
    console.log("submitted", formData);
    add(formData);
    imageUploaderRef.current?.setUploadedFiles([]);
    imageUploaderRef.current?.setFiles([]);
    imageUploaderRef.current?.reset();
    imageUploaderRef.current?.setIsImage(false);
    dropdownRef.current?.setSelectedItem("");
    setFormData(props.initialFormData);
  };

  const inputValuesData = getInputValues({
    inputs: props.inputValues,
    formData: formData,
  });
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
      <button className="p-2 rounded-md bg-white">Add</button>
    </form>
  );
};

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
