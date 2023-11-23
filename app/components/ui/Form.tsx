"use client";

import InputField from "./InputField";
import Button from "./Button";
import Dropdown from "./Dropdown";
import CheckBox from "./CheckBox";
import ImageUploader from "./ImageUploader";
import { useForm } from "./useForm";

const initialValues = {
  name: "",
  email: "",
  number: "",
  dropOne: "",
  desc: "",
  acceptance: false,
  images: [],
};
const Form = () => {
  const {
    values,
    handleClick,
    handleCheckBox,
    handleDropdown,
    handleChange,
    handleImages,
  } = useForm({ initialValues: initialValues });
  return (
    <form
      onSubmit={handleClick}
      className=" grid grid-cols-3 w-[90vw] h-[20vh] gap-4 items-center justify-center"
    >
      <InputField
        validator={""}
        value={values.name}
        onChange={(value) => handleChange("name", value)}
        placeholder="name"
        type="text"
        label="Name"
      />
      <InputField
        validator={""}
        value={values.email}
        onChange={(value) => handleChange("email", value)}
        placeholder="email"
        type="email"
        label="Email"
      />
      <InputField
        validator={""}
        value={values.number}
        onChange={(value) => handleChange("number", value)}
        placeholder="number"
        type="number"
        label="Number"
      />
      <Dropdown
        placeholder="Select"
        value={values.dropOne}
        onChange={(value) => handleDropdown("dropOne", value)}
        data={[
          { value: 1, label: "momo" },
          { value: 2, label: "soso" },
          { value: 3, label: "koko" },
        ]}
        label="DropOne"
      />
      <InputField
        validator={""}
        value={values.desc}
        onChange={(value) => handleChange("desc", value)}
        placeholder="description"
        type="textarea"
        label="Description"
      />
      <ImageUploader
        value={values.images}
        label="Image"
        onChange={(values) => handleImages("images", values)}
      />
      <CheckBox
        label="I Accept"
        selected={values.acceptance}
        onChange={(value) => handleCheckBox("acceptance", value)}
      />
      <Button isPending={false} />
    </form>
  );
};

export default Form;
