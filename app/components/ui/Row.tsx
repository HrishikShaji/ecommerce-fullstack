import { format } from "date-fns";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { EndpointType, QueryKey } from "@/types/types";
import { RowDelete } from "./RowDelete";
import { RowUpdate } from "./RowUpdate";

interface RowProps {
  id: string;
  item: Record<string, any>;
  delete?: boolean;
  update?: boolean;
  add?: boolean;
  lookup: string[];
  level: number;
  subRow?: string;
  endpoint: EndpointType;
  queryKey: QueryKey;
}

const Row: React.FC<RowProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  let i = 0;
  return (
    <>
      <tr className="border-b-2  border-neutral-700">
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
                className={
                  i === 1 && props.level !== 0
                    ? `px-2 pl-${props.level * 5}`
                    : "px-2 py-2"
                }
              >
                <div className="flex items-center gap-2">
                  {i === 1 &&
                    props.subRow &&
                    props.item[props.subRow] &&
                    props.item[props.subRow].length > 0 && (
                      <button className=" " onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                          <IoIosArrowDropupCircle size={22} />
                        ) : (
                          <IoIosArrowDropdownCircle size={22} />
                        )}
                      </button>
                    )}

                  {itemValue}
                </div>
              </td>
            );
          }
        })}
        <td className="px-2">
          <div className="flex gap-2 justify-end">
            {props.add && <IoAddCircle size={22} />}
            {props.update && <RowUpdate item={props.item} />}
            {props.delete && (
              <RowDelete
                id={props.id}
                endpoint={props.endpoint}
                queryKey={props.queryKey}
              />
            )}
          </div>
        </td>
      </tr>
      {isOpen &&
        props.subRow &&
        props.item[props.subRow] &&
        props.item[props.subRow].length > 0 &&
        props.item[props.subRow].map((child: any, key: number) => (
          <Row
            item={child}
            key={key}
            lookup={props.lookup}
            delete
            add
            update
            level={props.level + 1}
            subRow={props.subRow}
            id={child.id}
            endpoint={props.endpoint}
            queryKey={props.queryKey}
          />
        ))}
    </>
  );
};

export default Row;
