import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BiDownArrow } from "react-icons/bi";

interface DropdownProps {
  value: string;
  data: any[];
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.value);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setSelectedValue(props.value);
  }, [props.value]);

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
    queryKey: [`dropdowncategories`],
    queryFn: async () => {
      const response = await fetch(`/api/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });
  const handleChange = (value: string) => {
    setSelectedValue(value);
    props.onChange(value);
    setIsOpen(false);
  };

  if (isError) return null;
  return (
    <div>
      <h1>{props.label}</h1>
      <div className="bg-neutral-800 rounded-md w-[150px] text-white relative">
        <div className="flex justify-between p-1 ">
          <h1>{selectedValue ? selectedValue : "Select"}</h1>
          <div
            ref={buttonRef}
            className="p-1 rounded-md bg-neutral-400 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
          >
            <BiDownArrow />
          </div>
        </div>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute overflow-hidden rounded-md pb-2 w-full mt-2 bg-neutral-700"
          >
            {data?.data?.map((item: any) => (
              <DropItem
                value={item.id}
                label={item.name}
                key={item.id}
                handleChange={handleChange}
                item={item}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;

interface DropItemProps {
  value: string;
  label: string;
  item: Record<string, any>;
  handleChange: (value: string) => void;
}

const DropItem: React.FC<DropItemProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => props.handleChange(props.label)}
        className=" p-1 border-b-2 border-neutral-800 hover:bg-neutral-900 flex cursor-pointer justify-between"
      >
        <h1>{props.label}</h1>
        {props.item.children.length > 0 && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="hover:bg-neutral-400 rounded-md cursor-pointer p-1"
          >
            <BiDownArrow />
          </div>
        )}
      </div>
      <ul className="ml-4">
        {isOpen &&
          props.item.children &&
          props.item.children.length > 0 &&
          props.item.children.map((item: any) => (
            <DropItem
              key={item.id}
              value={item.id}
              label={item.name}
              item={item}
              handleChange={props.handleChange}
            />
          ))}
      </ul>
    </>
  );
};
