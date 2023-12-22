import { EndpointType, QueryKey } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { BiDownArrow } from "react-icons/bi";

interface DropdownProps {
  item: { id: string; label: string };
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
  endpoint: EndpointType;
  queryKey: QueryKey;
}

export type DropdownRef = {
  reset: () => void;
};

const Dropdown = forwardRef<DropdownRef, DropdownProps>((props, ref) => {
  const [selectedItem, setSelectedItem] = useState(props.item);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside: EventListener = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
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
    () => ({
      reset: () => {
        console.log("reset ran");
        setSelectedItem({ label: "", id: "" });
      },
    }),
    [],
  );
  console.log(selectedItem);

  const { data, isError } = useQuery({
    queryKey: [`dropdown${props.queryKey}`],
    queryFn: async () => {
      const response = await fetch(`/api/${props.endpoint}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  const handleChange = ({ label, id }: { label: string; id: string }) => {
    setSelectedItem({ id: id, label: label });
    props.onChange(id);
    setIsOpen(false);
  };

  if (isError) return null;
  return (
    <div className="flex flex-col gap-2">
      <h1>{props.label}</h1>
      <div className="bg-neutral-800 rounded-md w-[150px] relative z-1 text-white">
        <div className="flex justify-between p-1 text-sm">
          <h1>{selectedItem?.label ? selectedItem?.label : "Select"}</h1>
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
            key={props.label}
            ref={dropdownRef}
            className="absolute z-10 overflow-hidden rounded-md pb-2 w-full mt-2 bg-neutral-700"
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
});

Dropdown.displayName = "Dropdown";

export default Dropdown;

interface DropItemProps {
  value: string;
  label: string;
  item: Record<string, any>;
  handleChange: ({ label, id }: { label: string; id: string }) => void;
}

const DropItem: React.FC<DropItemProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={() =>
          props.handleChange({ id: props.value, label: props.label })
        }
        className=" p-1 border-b-2 border-neutral-800 hover:bg-neutral-900 flex cursor-pointer justify-between"
      >
        <h1>{props.label}</h1>
        {props.item.children && props.item.children.length > 0 && (
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
