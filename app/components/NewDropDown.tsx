import {
  CategoryChild,
  EndpointType,
  QueryKey,
  SearchType,
} from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import {
  Dispatch,
  MouseEvent,
  Ref,
  SetStateAction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { BiDownArrow } from "react-icons/bi";
import { PayloadType } from "../lib/utils";
import { FinalInputType } from "../lib/data";

interface NewDropDownProps {
  setFormData: Dispatch<SetStateAction<PayloadType>>;
  value: string;
  endpoint: EndpointType;
  queryKey: QueryKey;
  label: string;
  dropdownValues: FinalInputType[];
}

export type NewDropDownRef = {
  setSelectedItem: Dispatch<SetStateAction<string>>;
};

const NewDropDown = (props: NewDropDownProps, ref: Ref<NewDropDownRef>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState("");

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

  useImperativeHandle(
    ref,
    () => {
      return {
        setSelectedItem: setSelectedItem,
      };
    },
    [],
  );

  const { data, isError, isSuccess } = useQuery({
    queryKey: [`dropdown${props.queryKey}`],
    queryFn: async () => {
      const response = await fetch(`/api/${props.endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  if (isError) return null;
  console.log(selectedItem);

  return (
    <div className="flex flex-col gap-2">
      <h1>{props.label}</h1>
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
                      setFormData={props.setFormData}
                      value={props.value}
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

export default forwardRef(NewDropDown);

interface MenuItemProps {
  category: CategoryChild;
  setIsOpen: (value: boolean) => void;
  setFormData: Dispatch<SetStateAction<PayloadType>>;
  value: string;
  item: SearchType;
  setSelectedItem: Dispatch<SetStateAction<string>>;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    setShowSubMenu(!showSubMenu);
  };
  const handleSelect = (item: SearchType) => {
    props.setSelectedItem(item.name as string);
    props.setFormData((formData) => ({
      ...formData,
      [props.value]: item.id,
    }));
  };

  return (
    <li className="relative ">
      <div
        onClick={() => handleSelect(props.item)}
        className="cursor-pointer flex justify-between items-center border-b-2 border-neutral-800 rounded-md hover:bg-neutral-800 pl-2"
      >
        <h1 className="">{props.category.name}</h1>
        {props.category.children && props.category.children.length > 0 && (
          <div
            onClick={handleClick}
            className="p-1 rounded-md hover:bg-neutral-700"
          >
            <BiDownArrow />{" "}
          </div>
        )}
      </div>
      {showSubMenu && props.category.children.length > 0 && (
        <ul className="ml-4">
          {props.category.children.map((cat: CategoryChild) => (
            <MenuItem
              key={cat.id}
              category={cat}
              setIsOpen={props.setIsOpen}
              setFormData={props.setFormData}
              value={props.value}
              item={cat}
              setSelectedItem={props.setSelectedItem}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
