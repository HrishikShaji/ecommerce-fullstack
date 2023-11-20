"use client";

import { useUploadThing } from "../lib/uploadthing";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Spinner } from "./Spinner";
import Image from "next/image";
import { UploadFileResponse } from "uploadthing/client";
import { ImagesData } from "../api/uploadthing/core";
import { MdDelete } from "react-icons/md";

export const ImageUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isImage, setIsImage] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<
    UploadFileResponse<ImagesData>[]
  >([]);
  const ref = useRef<null | HTMLInputElement>(null);

  const reset = () => {
    if (ref.current) {
      ref.current.value = "";
    }
  };

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (file) => {
      setUploadedFiles(file);
      reset();
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  useEffect(() => {
    if (!isUploading) {
      setFiles([]);
    }
  }, [isUploading]);
  console.log(isUploading);

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);
    setFiles(images);
  };

  const handleDelete = async (id: string) => {
    console.log(id);
    await fetch(`api/uploadthing?fileKey=${id}`, {
      method: "DELETE",
    });
  };
  return (
    <div className="  flex flex-col gap-2 items-center relative">
      <div className="flex gap-2 ">
        <button
          className="p-2 rounded-md bg-blue-500"
          onClick={() => setIsImage(!isImage)}
        >
          Images
        </button>
        <input
          multiple
          onChange={(e) => handleSelect(e)}
          type="file"
          ref={ref}
          id="custom-input"
          hidden
        />
        <label
          htmlFor="custom-input"
          className="p-2 cursor-pointer rounded-md bg-neutral-500"
        >
          Add
        </label>
        <div>
          {files.length > 0 && (
            <button
              onClick={() => startUpload(files)}
              className="p-2 bg-neutral-400 rounded-md"
            >
              {isUploading ? <Spinner /> : `Upload ${files.length} files`}
            </button>
          )}
        </div>
      </div>
      {isImage && (
        <div className=" items-center   gap-2 inline-flex  min-h-[100px] origin-center  absolute  top-12 z-10 bg-neutral-700 rounded-md  p-5">
          {uploadedFiles.length === 0 ? (
            <div className="">No Images Selected</div>
          ) : (
            uploadedFiles?.map((img) => (
              <div key={img.serverData.fileUrl} className="relative ">
                <div
                  className="absolute cursor-pointer top-1 right-1 z-20"
                  onClick={() => handleDelete(img.key)}
                >
                  <MdDelete color="white" />
                </div>
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
