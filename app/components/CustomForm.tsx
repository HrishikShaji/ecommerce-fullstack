import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { FormDataType, InputType } from "../sample/page";

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
    <form className="p-10 bg-gray-500" onSubmit={handleSubmit}>
      {inputValues.map((input, i) => (
        <InputItem key={i} inputItem={input} handleChange={handleChange} />
      ))}
      <CustomDropDown setFormData={setFormData} />
      <button>Submit</button>
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
    <div>
      <label>{inputItem.label}</label>
      <input {...inputProps} onChange={(e) => handleChange(e)} />
    </div>
  );
};

interface CustomDropDownProps {
  setFormData: Dispatch<SetStateAction<FormDataType>>;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({ setFormData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownValues = [
    { id: "123", name: "qwerty" },
    { id: "456", name: "zxcv" },
    { id: "789", name: "asdfg" },
  ];
  return (
    <div>
      <div className="flex gap-2 bg-gray-300">
        <h1>Select</h1>
        <button onClick={() => setIsOpen(!isOpen)}>click here</button>
      </div>

      {isOpen &&
        dropdownValues.map((item, i) => (
          <h1
            onClick={() =>
              setFormData((formData) => ({
                ...formData,
                dropdown: { id: item.id, name: item.name },
              }))
            }
            key={i}
          >
            {item.name}
          </h1>
        ))}
    </div>
  );
};
