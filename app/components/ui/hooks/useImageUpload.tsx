import { ImagesData } from "@/app/api/uploadthing/core";
import { useUploadThing } from "@/app/lib/uploadthing";
import { useEffect, useState } from "react";
import { UploadFileResponse } from "uploadthing/client";

interface UseImageUploadProps {
  value: string[];
  onChange: (values: string[]) => void;
}

export const useImageUpload = (props: UseImageUploadProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<
    UploadFileResponse<ImagesData>[]
  >([]);

  useEffect(() => {
    if (props.value.length === 0) {
      setUploadedFiles([]);
    }
  }, [props.value]);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (file) => {
      setUploadedFiles(file);
      const images = file.map((image) => {
        return image.serverData.fileUrl;
      });
      props.onChange(images);
    },
    onUploadError: (error: Error) => {
      console.log(error);
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  return {
    setUploadedFiles,
    startUpload,
    isUploading,
    uploadedFiles,
  };
};
