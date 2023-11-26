"use client";

import { BillBoard } from "@prisma/client";
import { Validator } from "@/types/types";
import { useUpdateQuery } from "../lib/queries/customQuery";
import { EndpointType, QueryKey, ValidateTypePayload } from "@/types/types";
import {
  BillboardPayload,
  validateBillboardPayload,
} from "../lib/validators/Billboard";
import { useForm } from "./ui/useForm";
import InputField from "./ui/InputField";
import ImageUploader from "./ui/ImageUploader";
import Button from "./ui/Button";
import { ImageUpdate } from "./ui/ImageUpdate";

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
  const {
    values,
    isError,
    isPending,
    error,
    handleClick,
    handleChange,
    handleImages,
  } = useForm({
    action: "Update",
    initialValues: data,
    options: {
      endpoint: "billboard",
      queryKey: "billboards",
      validator: validateBillboardPayload as Validator<ValidateTypePayload>,
    },
  });

  return (
    <form onSubmit={handleClick} className=" flex items-start flex-col gap-4">
      <div className="flex flex-col gap-4 justify-start items-end">
        <ImageUpdate
          value={data.images}
          onChange={(values) => handleImages("images", values)}
        />
        <InputField
          validator={""}
          value={values.name}
          onChange={(value) => handleChange("name", value)}
          placeholder="name"
          type="text"
          label="Name"
        />
      </div>
      {isError && <h1 className="text-red-500">{error?.message}</h1>}
      <Button isPending={isPending} />
    </form>
  );
};

{
  /*


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
*/
}
