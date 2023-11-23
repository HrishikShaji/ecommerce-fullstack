import { format } from "date-fns";
import { MdDelete } from "react-icons/md";

interface RowProps {
  item: Record<string, any>;
  delete?: boolean;
  update?: boolean;
  add?: boolean;
  lookup: string[];
}

const Row: React.FC<RowProps> = (props) => {
  return (
    <tr>
      {Object.entries(props.item).map(([key, value]) => {
        const itemKey = props.lookup.includes(key);
        if (itemKey) {
          const itemValue =
            key === "createdAt" ? format(new Date(value), "yyyy-MM-dd") : value;
          return <td key={key}>{itemValue}</td>;
        }
      })}
      <td>
        <div>{props.delete && <MdDelete />}</div>
      </td>
    </tr>
  );
};

export default Row;
