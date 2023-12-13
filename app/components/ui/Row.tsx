import { format } from "date-fns";
import { useState } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { EndpointType, QueryKey } from "@/types/types";
import { RowDelete } from "./RowDelete";
import { RowUpdate } from "./RowUpdate";
import { ModeType } from "@/redux/slices/modalSlice";
import { RowAdd } from "./RowAdd";

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
  mode: ModeType;
}

const getNames = ({
  lookup,
  item,
}: {
  lookup: string[];
  item: Record<string, any>;
}) => {
  let newItems: any[] = [];

  lookup.forEach((key) => {
    if (item[key]) {
      if (typeof item[key] === "object" && item[key].name) {
        const obj = { name: key, value: item[key].name };
        newItems.push(obj);
      } else {
        const obj = { name: key, value: item[key] };
        newItems.push(obj);
      }
    }
  });

  return newItems;
};

const Row: React.FC<RowProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const values = getNames({
    lookup: props.lookup,
    item: props.item,
  });
  return (
    <>
      <tr className="border-b-2  border-neutral-700 text-white">
        {values.map((item, i) => {
          const itemValue =
            item.name === "createdAt"
              ? format(new Date(item.value), "yyyy-MM-dd")
              : item.name === "price"
              ? `${item.value}$`
              : item.name === "stock"
              ? `${item.value}x`
              : item.name === "discount"
              ? `${item.value}%`
              : item.value;
          return (
            <td
              key={i}
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
        })}
        <td className="px-2">
          <div className="flex gap-2 justify-end">
            {props.add && props.mode === "category" && (
              <RowAdd
                item={props.item}
                mode="subCategory"
                endpoint={props.endpoint}
                queryKey={props.queryKey}
              />
            )}
            {props.update && (
              <RowUpdate
                item={props.item}
                mode={props.mode}
                endpoint={props.endpoint}
                queryKey={props.queryKey}
              />
            )}
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
            mode={props.mode}
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
