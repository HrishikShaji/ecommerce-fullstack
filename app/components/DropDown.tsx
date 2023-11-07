import { CategoryChild } from "@/types/types";
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

type Item = {
  name: string;
  id: string;
};

interface DropDownProps {
  selectedItem: Item;
  setSelectedItem: Dispatch<SetStateAction<Item>>;
}

export const DropDown: React.FC<DropDownProps> = ({
  selectedItem,
  setSelectedItem,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

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
  const {
    data: categories,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(`/api/category`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      return response.json();
    },
  });

  if (isError) return null;

  return (
    <div className="flex flex-col  w-64">
      <div className="flex gap-5 p-2 h-full bg-neutral-800 justify-between items-center">
        <h1>{selectedItem.name ? selectedItem.name : "Select"}</h1>
        <div
          className="cursor-pointer"
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
        >
          <BiDownArrow />
        </div>
      </div>
      {isOpen && isSuccess && (
        <div className="relative  text-left" ref={dropdownRef}>
          <div className="origin-top-right absolute right-0  w-64 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5">
            <div className="border-b-1 border-white">
              <ul className="">
                {categories.map((category: CategoryChild) => (
                  <MenuItem
                    key={category.id}
                    category={category}
                    setSelectedItem={setSelectedItem}
                    setIsOpen={setIsOpen}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface MenuItemProps {
  category: CategoryChild;
  setSelectedItem: Dispatch<SetStateAction<Item>>;
  setIsOpen: (value: boolean) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  category,
  setSelectedItem,
  setIsOpen,
}) => {
  const [showSubMenu, setShowSubMenu] = useState(false);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    toggleSubMenu();
  };
  const handleSelect = (category: Item) => {
    setSelectedItem(category);
    setIsOpen(false);
  };

  return (
    <li className="relative bg-neutral-700">
      <div
        onClick={() =>
          handleSelect({ name: category.name || "", id: category.id || "" })
        }
        className="cursor-pointer hover:bg-neutral-600 flex justify-between items-center bg-neutral-700 border-b-2 border-neutral-800 pl-2"
      >
        <h1 className="">{category.name}</h1>
        {category.children.length > 0 && (
          <div onClick={handleClick} className="p-1 bg-neutral-500">
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
              setSelectedItem={setSelectedItem}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
