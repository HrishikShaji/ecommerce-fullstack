import {
  CategoryChild,
  EndpointType,
  QueryKey,
  SearchType,
  SelectItem,
} from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiDownArrow } from "react-icons/bi";
import { FormDataType } from "../sample/page";

interface CustomDropDownProps {
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  value: string;
  endpoint: EndpointType;
  queryKey: QueryKey;
  refetch: () => void;
  resetClick: number;
  label: string;
}

export const CustomDropDown: React.FC<CustomDropDownProps> = ({
  setFormData,
  value,
  endpoint,
  queryKey,
  refetch,
  resetClick,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    console.log("refetch ran");
    setSelectedItem("");
  }, [resetClick]);

  useEffect(() => {
    const handleClickOutside: EventListener = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  const { data, isError, isSuccess } = useQuery({
    queryKey: [`dropdown${queryKey}`],
    queryFn: async () => {
      const response = await fetch(`/api/${endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  if (isError) return null;

  return (
    <div className="flex flex-col gap-2">
      <h1>{label}</h1>
      <div className="flex text-white flex-col bg-neutral-800 rounded-md ">
        <div className="flex gap-5 p-2  h-full  justify-between items-center">
          <h1>{selectedItem ? selectedItem : "Select"}</h1>
          <div
            className="cursor-pointer hover:bg-neutral-700 p-1 rounded-md"
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
          >
            <BiDownArrow />
          </div>
        </div>
        {isOpen && isSuccess && (
          <div className="relative  text-left" ref={dropdownRef}>
            <div className="origin-top-right absolute right-0 top-2 p-1 pb-2 bg-neutral-600 w-full  rounded-md shadow-lg  ring-1 ring-black z-30 ring-opacity-5">
              <div className="">
                <ul className="">
                  {data.data.map((category: CategoryChild) => (
                    <MenuItem
                      key={category.id}
                      category={category}
                      setIsOpen={setIsOpen}
                      setFormData={setFormData}
                      value={value}
                      item={category}
                      setSelectedItem={setSelectedItem}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface MenuItemProps {
  category: CategoryChild;
  setIsOpen: (value: boolean) => void;
  setFormData: Dispatch<SetStateAction<FormDataType>>;
  value: string;
  item: SearchType;
  setSelectedItem: Dispatch<SetStateAction<string>>;
}

const MenuItem: React.FC<MenuItemProps> = ({
  category,
  setIsOpen,
  setFormData,
  value,
  item,
  setSelectedItem,
}) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setShowSubMenu(!showSubMenu);
  };
  const handleSelect = (item: SearchType) => {
    setSelectedItem(item.name as string);
    setFormData((formData) => ({
      ...formData,
      [value]: item.id,
    }));
  };

  return (
    <li className="relative ">
      <div
        onClick={() => handleSelect(item)}
        className="cursor-pointer flex justify-between items-center border-b-2 border-neutral-800 rounded-md hover:bg-neutral-800 pl-2"
      >
        <h1 className="">{category.name}</h1>
        {category.children && category.children.length > 0 && (
          <div
            onClick={handleClick}
            className="p-1 rounded-md hover:bg-neutral-700"
          >
            <BiDownArrow />{" "}
          </div>
        )}
      </div>
      {showSubMenu && category.children.length > 0 && (
        <ul className="ml-4">
          {category.children.map((cat: CategoryChild) => (
            <MenuItem
              key={cat.id}
              category={cat}
              setIsOpen={setIsOpen}
              setFormData={setFormData}
              value={value}
              item={cat}
              setSelectedItem={setSelectedItem}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
