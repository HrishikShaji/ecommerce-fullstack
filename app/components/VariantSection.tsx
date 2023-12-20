import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
} from "react";
import Dropdown from "./ui/Dropdown";
import { ErrorMessageForm } from "./ui/ErrorMessageForm";
import ImageUploader from "./ui/ImageUploader";
import InputField from "./ui/InputField";
import { useForm } from "./ui/hooks/useForm";
import { VariantPayload, variantPayload } from "../lib/validators/variant";
import { useCustomForm } from "./ui/hooks/useCustomForm";
import { MdImage } from "react-icons/md";

const initialValues: VariantPayload = {
  sizeId: "",
  colorId: "",
  images: [],
  price: 0,
  discount: 0,
  stock: 0,
};

const initialErrors = {
  sizeId: "",
  colorId: "",
  images: "",
  price: "",
  discount: "",
  stock: "",
};

interface VariantSectionProps {
  setVariants: Dispatch<SetStateAction<any[]>>;
  index: number;
}

export const VariantSection: React.FC<VariantSectionProps> = ({
  setVariants,
  index,
}) => {
  const { values, handleDropdown, handleImages, handleChange } = useCustomForm({
    initialValues: initialValues,
  });

  const handleClick = () => {
    setVariants((prev) => [...prev, values]);
  };

  return (
    <div className="w-full gap-4 grid grid-cols-7 items-end">
      <div className="flex flex-col gap-2 ">
        <Dropdown
          endpoint="size"
          queryKey="sizes"
          placeholder="Select"
          value={values.sizeId}
          onChange={(value) => handleDropdown("sizeId", value)}
          label="Size"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Dropdown
          endpoint="color"
          queryKey="colors"
          placeholder="Select"
          value={values.colorId}
          onChange={(value) => handleDropdown("colorId", value)}
          label="Color"
        />
      </div>
      <div className="flex flex-col gap-2">
        <ImageUploader
          onChange={(values) => handleImages("images", values)}
          value={values.images}
          label="image"
          index={index}
        />
      </div>
      <div className="flex flex-col gap-2">
        <InputField
          validator={""}
          value={values.price}
          onChange={(value) => handleChange("price", value)}
          placeholder="price"
          type="number"
          label="Price"
        />
      </div>
      <div className="flex flex-col gap-2">
        <InputField
          validator={""}
          value={values.discount}
          onChange={(value) => handleChange("discount", value)}
          placeholder="discount"
          type="number"
          label="Discount"
        />
      </div>
      <div className="flex flex-col gap-2">
        <InputField
          validator={""}
          value={values.stock}
          onChange={(value) => handleChange("stock", value)}
          placeholder="stock"
          type="number"
          label="Stock"
        />
      </div>
      <button
        type="button"
        onClick={handleClick}
        className="p-2 rounded-md bg-white text-black"
      >
        Add Variant
      </button>
    </div>
  );
};
