import { format } from "date-fns";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { useState } from "react";

interface RowProps {
  item: Record<string, any>;
  delete?: boolean;
  update?: boolean;
  add?: boolean;
  lookup: string[];
  level: number;
}

const Row: React.FC<RowProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let i = 0;
  console.log(props.level);
  return (
    <>
      <tr className="border-b-2 border-black">
        {Object.entries(props.item).map(([key, value]) => {
          const itemKey = props.lookup.includes(key);
          if (itemKey) {
            i = i + 1;
            const itemValue =
              key === "createdAt"
                ? format(new Date(value), "yyyy-MM-dd")
                : value;
            return (
              <td
                key={key}
                className={i === 1 && props.level !== 0 ? "px-2 pl-5" : "px-2"}
              >
                {itemValue}
                {i}
              </td>
            );
          }
        })}
        <td className="px-2">
          <div className="flex gap-1">
            {props.add && (
              <button onClick={() => setIsOpen(!isOpen)}>
                <IoAddCircle />{" "}
              </button>
            )}
            {props.update && <MdEdit />}
            {props.delete && <MdDelete />}
          </div>
        </td>
      </tr>
      {isOpen &&
        props.item.children &&
        props.item.children.map((child, key) => (
          <Row
            item={child}
            key={key}
            lookup={props.lookup}
            delete
            add
            update
            level={props.level + 1}
          />
        ))}
    </>
  );
};

export default Row;
