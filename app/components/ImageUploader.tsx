"use client";

import { useUploadThing } from "../lib/uploadthing";
import { ChangeEvent, useState } from "react";
import { Spinner } from "./Spinner";

export const ImageUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      setLoading(false);
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      setLoading(true);
      alert("upload has begun");
    },
  });

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);
    setFiles(images);
  };
  return (
    <div className="p-10 bg-white">
      <input type="file" multiple onChange={(e) => handleSelect(e)} />
      <div>
        {files.length > 0 && (
          <>
            <button
              onClick={() => startUpload(files)}
              className="p-2 bg-neutral-500 rounded-md"
            >
              Upload {files.length} files
              {loading && <Spinner />}
            </button>
          </>
        )}
      </div>
    </div>
  );
};
