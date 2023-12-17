import Image from "next/image";
import { useImageUpload } from "./hooks/useImageUpload";
import { ChangeEvent, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { Spinner } from "./Spinner";

interface ImageUpdateProps {
  value: string[];
  onChange: (values: string[]) => void;
}

export const ImageUpdate: React.FC<ImageUpdateProps> = (props) => {
  const { startUpload, setFiles, isUploading, uploadedFiles, files } =
    useImageUpload({ value: props.value, onChange: props.onChange });
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);
    setFiles(images);
  };
  useEffect(() => {
    if (files.length === 0) {
      props.onChange(props.value);
    }
  }, []);

  const previewImage = (image: File) => {
    return URL.createObjectURL(image);
  };
  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        <input
          multiple
          onChange={(e) => handleSelect(e)}
          type="file"
          id="custom-input"
          hidden
        />
        <label
          htmlFor="custom-input"
          className=" p-1 cursor-pointer rounded-md bg-neutral-500 flex"
        >
          <MdEdit size={15} />
        </label>
      </div>
      <div className="flex gap-2">
        {files.length >= 1
          ? files.map((img, i) => (
              <Image
                key={i}
                src={previewImage(img)}
                height={1000}
                width={1000}
                alt="image"
                className="h-40 w-40 rounded-md object-contain bg-white"
              />
            ))
          : uploadedFiles.length >= 1
          ? uploadedFiles.map((img, i) => (
              <Image
                key={i}
                src={img.serverData.fileUrl}
                height={1000}
                width={1000}
                alt="image"
                className="h-40 w-40 rounded-md object-contain bg-white"
              />
            ))
          : props.value.map((img, i) => (
              <Image
                key={i}
                src={img}
                height={1000}
                width={1000}
                alt="image"
                className="h-40 w-40 rounded-md object-contain bg-white"
              />
            ))}
      </div>
      {files.length >= 1 ? (
        <button
          type="button"
          className="absolute bg-blue-500 p-2 rounded-md bottom-0 z-10"
          onClick={(e) => {
            e.stopPropagation();
            startUpload(files as File[]);
          }}
        >
          {isUploading ? <Spinner /> : "Update Image"}
        </button>
      ) : null}
    </div>
  );
};
