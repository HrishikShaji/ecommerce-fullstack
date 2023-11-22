"use client";

import { useUploadThing } from "../lib/uploadthing";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  MouseEvent,
  useRef,
  useState,
  useImperativeHandle,
  Ref,
  forwardRef,
} from "react";
import { Spinner } from "./Spinner";
import Image from "next/image";
import { UploadFileResponse } from "uploadthing/client";
import { ImagesData } from "../api/uploadthing/core";
import { MdDelete } from "react-icons/md";
import { PayloadType } from "../lib/utils";

interface NewImageUploaderProps {
  setFormData: Dispatch<SetStateAction<PayloadType>>;
  value: string;
  label: string;
}

export type NewImageUploaderRef = {
  reset: () => void;
  setFiles: Dispatch<SetStateAction<File[]>>;
  setUploadedFiles: Dispatch<SetStateAction<UploadFileResponse<ImagesData>[]>>;
  setIsImage: Dispatch<SetStateAction<boolean>>;
};

const NewImageUploader = (
  props: NewImageUploaderProps,
  ref: Ref<NewImageUploaderRef>,
) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isImage, setIsImage] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    UploadFileResponse<ImagesData>[]
  >([]);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const reset = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        reset: reset,
        setFiles: setFiles,
        setUploadedFiles: setUploadedFiles,
        setIsImage: setIsImage,
      };
    },
    [],
  );

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (file) => {
      setUploadedFiles(file);
      reset();
      setFiles([]);
      props.setFormData((formData) => ({
        ...formData,
        [props.value]: file.map((image, i) => {
          return image.url;
        }),
      }));
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

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
          className="p-2 cursor-pointer rounded-md bg-neutral-500"
        >
          Add
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
                startUpload(files);
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
  );
};

export default forwardRef(NewImageUploader);
