"use client";

import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { Spinner } from "./Spinner";
import Image from "next/image";
import { MdDelete, MdImage } from "react-icons/md";
import { useImageUpload } from "./hooks/useImageUpload";

interface ImageUploaderProps {
  value: string[];
  label: string;
  onChange: (values: string[]) => void;
  index: number;
}

const ImageUploader = (props: ImageUploaderProps) => {
  const [isImage, setIsImage] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const { setUploadedFiles, isUploading, uploadedFiles, startUpload } =
    useImageUpload({ value: props.value, onChange: props.onChange });

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/uploadthing?fileKey=${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((file) => file.key !== id),
      );
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const previewImage = (image: File) => {
    return URL.createObjectURL(image);
  };
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
    <div className="flex flex-col gap-2 justify-end">
      <h1>{props.label}</h1>
      <div className="  flex flex-col gap-2 justify-end relative">
        <div className="flex gap-2 items-end">
          <input
            multiple
            onChange={(e) => handleSelect(e)}
            type="file"
            ref={inputRef}
            id={`custom-input-${props.index}`}
            hidden
          />
          <label
            htmlFor={`custom-input-${props.index}`}
            className=" cursor-pointer p-1 rounded-md bg-gray-500"
          >
            <MdImage size={24} />
          </label>
          {files.length > 0 && (
            <button
              type="button"
              className="p-1 rounded-md bg-blue-500"
              onClick={(e) => onToggle(e)}
            >
              {`Images(${files.length})`}
            </button>
          )}
          <div>
            {files.length > 0 && uploadedFiles.length === 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  startUpload(files as File[]);
                }}
                className="p-1 bg-neutral-400 rounded-md"
              >
                {isUploading ? <Spinner /> : "Upload"}
              </button>
            )}
          </div>
        </div>
        {isImage && files.length > 0 && (
          <div className=" items-center   gap-2 inline-flex  min-h-[100px] origin-center  absolute  top-12 z-10 bg-neutral-700 rounded-md  p-5">
            {files.length === 0 ? (
              <div className="">No Images Selected</div>
            ) : (
              files?.map((file, i) => (
                <div key={i} className="relative ">
                  <button
                    type="button"
                    className="absolute cursor-pointer top-1 right-1 z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <MdDelete color="white" />
                  </button>
                  <Image
                    src={previewImage(file)}
                    height={1000}
                    width={1000}
                    className="h-[100px] min-w-[100px] object-cover  rounded-md flex-grow"
                    alt="image"
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
