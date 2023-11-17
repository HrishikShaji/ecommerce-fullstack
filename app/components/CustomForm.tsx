import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { FormDataType, InputType, Item } from "../sample/page";

interface CustomFormProps {
  inputValues: InputType[];
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  formData: FormDataType;
}

export const CustomForm: React.FC<CustomFormProps> = ({
  inputValues,
  setFormData,
  formData,
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.name]: e.target.value,
    }));
  };
  const dropDownChange = () => {};

  return (
    <form className="p-10 bg-gray-500 h-[50vh]" onSubmit={handleSubmit}>
      <div className="grid grid-cols-3 gap-4">
        {inputValues.map((input, i) =>
          input.type === "Input" ? (
            <InputItem key={i} inputItem={input} handleChange={handleChange} />
          ) : (
            <CustomDropDown
              key={i}
              setFormData={setFormData}
              value={input.dropDownValue}
              dropdownValues={input.dropDownValues}
            />
          ),
        )}
        <button type="submit" className="p-2 rounded-md bg-neutral-700">
          Submit
        </button>
      </div>
    </form>
  );
};

interface InputItemProps {
  inputItem: InputType;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputItem: React.FC<InputItemProps> = ({ inputItem, handleChange }) => {
  const { label, ...inputProps } = inputItem;
  return (
    <div className="flex flex-col gap-2">
      <label>{inputItem.label}</label>
      <input
        className="p-2 rounded-md"
        {...inputProps}
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

interface CustomDropDownProps {
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  value?: string;
  dropdownValues: Item[];
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  setFormData,
  value,
  dropdownValues,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: Item) => {
    setFormData((formData) => ({
      ...formData,
      [value]: { id: item.id, name: item.name },
    }));
  };
  return (
    <div className="relative">
      <div className="flex gap-2 bg-gray-300 p-1 rounded-md flex justify-between">
        <h1>Select</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 bg-neutral-500 rounded-md"
        >
          click here
        </button>
      </div>

      {isOpen && (
        <div className="absolute w-full top-12 rounded-md bg-neutral-400 p-1">
          {dropdownValues.map((item, i) => (
            <div
              className="p-1 rounded-md hover:bg-neutral-500 cursor-pointer"
              key={i}
            >
              <h1 onClick={() => handleSelect(item)} key={i}>
                {item.name}
              </h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
