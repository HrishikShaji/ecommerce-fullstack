"use client";

import { BillBoard } from "@prisma/client";
import { ChangeEvent, FormEvent, useState } from "react";
import { Spinner } from "./Spinner";
import { useUpdateQuery } from "../lib/queries/customQuery";
import { EndpointType, QueryKey } from "@/types/types";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { useImageUpload } from "./ui/useImageUpload";

interface BillboardUpdateFormProps {
  data: BillBoard;
  endpoint: EndpointType;
  queryKey: QueryKey;
}

export const BillboardUpdateForm: React.FC<BillboardUpdateFormProps> = ({
  data,
  endpoint,
  queryKey,
}) => {
  const [name, setName] = useState(data.name || "");
  const [images, setImages] = useState<string[]>([]);

  const {
    isUploading,
    uploadedFiles,
    startUpload,
    files,
    setFiles,
    setUploadedFiles,
  } = useImageUpload({ value: images, onChange: setImages });

  const { update, isPending } = useUpdateQuery({
    endpoint: endpoint,
    queryKey: queryKey,
  });
  console.log(files, uploadedFiles);
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const images = Array.from(e.target.files || []);
    setFiles(images);
  };
  const previewImage = (image: File) => {
    return URL.createObjectURL(image);
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        update({ name: name, id: data.id });
      }}
    >
      <div className="relative w-full">
        <div className="relative">
          <div className="absolute right-2 top-2">
            <input
              multiple
              onChange={(e) => handleSelect(e)}
              type="file"
              id="custom-input"
              hidden
            />
            <label
              htmlFor="custom-input"
              className="p-1 flex  cursor-pointer rounded-md bg-neutral-500"
            >
              <MdEdit size={15} />
            </label>
          </div>
          {files.length === 1 ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                startUpload(files as File[]);
              }}
              className="text-black w-full rounded-md bg-green-500 absolute bottom-0 z-10"
            >
              {isUploading ? <Spinner /> : "Update Image"}
            </button>
          ) : null}
          <Image
            src={
              files.length === 1
                ? previewImage(files[0])
                : uploadedFiles.length === 1
                ? uploadedFiles[0].serverData.fileUrl
                : data.images[0]
            }
            height={1000}
            width={1000}
            alt="image"
            className="h-40 w-full rounded-md object-cover"
          />
        </div>
      </div>
      <input
        value={name}
        className="p-2 rounded-md text-black"
        onChange={(e) => setName(e.target.value)}
      />
      <button>{isPending ? <Spinner /> : "Update"}</button>
    </form>
  );
};
