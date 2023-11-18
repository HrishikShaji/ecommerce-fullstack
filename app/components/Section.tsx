import { Spinner } from "../components/Spinner";
import { useEffect, useState } from "react";
import { SectionContainer } from "./SectionContainer";
import { Form } from "./Form";
import {
  AddQueryProps,
  GetQueryProps,
  InputItem,
  QueryKey,
  SelectItem,
  SortType,
  Validator,
} from "@/types/types";
import { UseMutateFunction } from "@tanstack/react-query";
import { CustomForm } from "./CustomForm";
import {
  FinalInputType,
  productInputInitialObj,
  productInputValues,
} from "../lib/data";

interface SectionProps<T> {
  endpoint: string;
  heading: string;
  label: string;
  placeholder: string;
  name: string;
  queryKey: QueryKey;
  validator: Validator<T>;
  customGetHook: (values: GetQueryProps) => {
    count: number;
    data: any[];
    isError: boolean;
    isLoading: boolean;
    refetch: () => void;
  };
  customAddHook: (values: AddQueryProps<T>) => {
    add: UseMutateFunction<Response, Error, T, unknown>;
    isPending: boolean;
    isError: boolean;
  };
  title: "Billboards" | "Categories" | "Products" | "Sizes" | "Colors";
  section: "billBoard" | "color" | "size" | "product" | "category";
  headings: string[];
}

export const Section = <T,>({
  label,
  queryKey,
  placeholder,
  name,
  customGetHook,
  title,
  section,
  headings,
  validator,
  customAddHook,
  heading,
  endpoint,
}: SectionProps<T>) => {
  const [value, setValue] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortType>("LATEST");
  const [formData, setFormData] = useState<Record<string, any>>(
    productInputInitialObj,
  );
  const [selectedBillboardItem, setSelectedBillboardItem] =
    useState<SelectItem>({
      name: "",
      id: "",
    });
  const [selectedItem, setSelectedItem] = useState<SelectItem>({
    name: "",
    id: "",
  });
  const [selectedSizeItem, setSelectedSizeItem] = useState<SelectItem>({
    name: "",
    id: "",
  });
  const [selectedColorItem, setSelectedColorItem] = useState<SelectItem>({
    name: "",
    id: "",
  });

  const dropDownValues = [
    {
      label: "Category",
      selectedItem: selectedItem,
      setSelectedItem: setSelectedItem,
      url: "category",
      query: "categories",
      name: "categoryId",
    },
    {
      label: "Billboard",
      selectedItem: selectedBillboardItem,
      setSelectedItem: setSelectedBillboardItem,
      url: "billboard",
      query: "billboards",
      name: "billboardId",
    },
    {
      label: "Size",
      selectedItem: selectedSizeItem,
      setSelectedItem: setSelectedSizeItem,
      url: "size",
      query: "sizes",
      name: "sizeId",
    },
    {
      label: "Color",
      selectedItem: selectedColorItem,
      setSelectedItem: setSelectedColorItem,
      url: "color",
      query: "colors",
      name: "colorId",
    },
  ];
  const { refetch, data, count, isLoading, isError } = customGetHook({
    page: page,
    sort: sort,
    endpoint: endpoint,
    queryKey: queryKey,
  });
  const { add, isPending } = customAddHook({
    endpoint: endpoint,
    validator: validator,
    queryKey: queryKey,
  });

  const newData = productInputValues.map((input) => {
    if (input.type === "Input") {
      const newObj = { ...input, value: formData[input.name] };
      return newObj;
    }
    if (input.type === "DropDown") {
      const newObj = { ...input, value: input.name };
      return newObj;
    }

    return input;
  });
  useEffect(() => {
    refetch();
  }, [page, sort]);
  const values: InputItem[] = [
    {
      label: label,
      name: name,
      value: value,
      placeholder: placeholder,
      onChange: setValue,
    },
  ];
  if (isError) return null;
  return (
    <div className="p-2 text-white flex flex-col gap-10">
      <div className="flex flex-col gap-2 ">
        <h1 className="text-xl font-semibold">{heading}</h1>
        {section === "product" && (
          <CustomForm
            formData={formData}
            setFormData={setFormData}
            inputValues={newData as FinalInputType[]}
            refetch={refetch}
            apiFunction={add}
          />
        )}
        {section === "product" ? (
          <Form
            values={values}
            dropdownValues={dropDownValues}
            apiFunction={add}
            isPending={isPending}
          />
        ) : (
          <Form values={values} apiFunction={add} isPending={isPending} />
        )}
      </div>
      {isLoading ? (
        <Spinner />
      ) : (
        <SectionContainer
          title={title}
          headings={headings}
          data={data}
          setPage={setPage}
          page={page}
          count={count}
          section={section}
          setSort={setSort}
          sort={sort}
        />
      )}
    </div>
  );
};
