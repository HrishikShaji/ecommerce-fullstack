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
}

const ImageUploader = (props: ImageUploaderProps) => {
  const [isImage, setIsImage] = useState(false);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const {
    setFiles,
    setUploadedFiles,
    isUploading,
    uploadedFiles,
    startUpload,
    files,
  } = useImageUpload({ value: props.value, onChange: props.onChange });

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

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);
    setFiles(images);
  };
  const onToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsImage(!isImage);
  };

  return (
    <div className="flex flex-col gap-2">
      <h1>{props.label}</h1>
      <div className="  flex flex-col gap-2 items-center relative">
        <div className="flex gap-2 ">
          <input
            multiple
            onChange={(e) => handleSelect(e)}
            type="file"
            ref={inputRef}
            id="custom-input"
            hidden
          />
          <label
            htmlFor="custom-input"
            className=" p-2 cursor-pointer rounded-md bg-neutral-500"
          >
            <MdImage size={24} />
          </label>
          {uploadedFiles.length > 0 && (
            <button
              type="button"
              className="p-2 rounded-md bg-blue-500"
              onClick={(e) => onToggle(e)}
            >
              Images
            </button>
          )}
          <div>
            {files.length > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  startUpload(files as File[]);
                }}
                className="p-2 bg-neutral-400 rounded-md"
              >
                {isUploading ? <Spinner /> : `Upload ${files.length} files`}
              </button>
            )}
          </div>
        </div>
        {isImage && uploadedFiles.length > 0 && (
          <div className=" items-center   gap-2 inline-flex  min-h-[100px] origin-center  absolute  top-12 z-10 bg-neutral-700 rounded-md  p-5">
            {uploadedFiles.length === 0 ? (
              <div className="">No Images Selected</div>
            ) : (
              uploadedFiles?.map((img) => (
                <div key={img.serverData.fileUrl} className="relative ">
                  <button
                    type="button"
                    className="absolute cursor-pointer top-1 right-1 z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(img.key);
                    }}
                  >
                    <MdDelete color="white" />
                  </button>
                  <Image
                    src={img.serverData.fileUrl}
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
