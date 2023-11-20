"use client";

import { useUploadThing } from "../lib/uploadthing";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Spinner } from "./Spinner";
import Image from "next/image";
import { UploadFileResponse } from "uploadthing/client";
import { ImagesData } from "../api/uploadthing/core";

export const ImageUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
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
  return (
    <div className="p-10 bg-white">
      <input
        multiple
        onChange={(e) => handleSelect(e)}
        type="file"
        ref={ref}
        className="text-sm text-stone-500
   file:mr-5 file:py-1 file:px-3 file:border-[1px]
   file:text-xs file:font-medium
   file:bg-stone-50 file:text-stone-700
   hover:file:cursor-pointer hover:file:bg-blue-50
   hover:file:text-blue-700"
      />
      <div>
        {files.length > 0 && (
          <>
            <button
              onClick={() => startUpload(files)}
              className="p-2 bg-neutral-500 rounded-md"
            >
              Upload {files.length} files
              {isUploading && <Spinner />}
            </button>
          </>
        )}
      </div>
      {uploadedFiles?.map((img) => (
        <Image
          key={img.serverData.fileUrl}
          src={img.serverData.fileUrl}
          height={1000}
          width={1000}
          className="h-[200px] w-[200px] object-cover rounded-md"
          alt="image"
        />
      ))}
    </div>
  );
};
