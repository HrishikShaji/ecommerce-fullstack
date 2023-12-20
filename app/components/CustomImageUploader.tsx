import { ChangeEvent, MouseEvent, useState } from "react";
import { MdImage } from "react-icons/md";

export const CustomImageUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isImage, setIsImage] = useState(false);
  console.log("custom");
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);
    console.log(images);
    setFiles(images);
  };
  const onToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsImage(!isImage);
  };
  return (
    <div className="flex">
      <input
        multiple
        onChange={(e) => handleSelect(e)}
        type="file"
        id="custom-input"
        hidden
      />
      <label
        htmlFor="custom-input"
        className=" p-2 cursor-pointer rounded-md bg-neutral-500"
      >
        <MdImage size={24} />
      </label>
      <div>{files.length}</div>
    </div>
  );
};
