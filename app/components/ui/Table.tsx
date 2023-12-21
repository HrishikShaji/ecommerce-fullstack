import { EndpointType, QueryKey } from "@/types/types";
import Row from "./Row";
import { ModeType } from "@/redux/slices/modalSlice";

interface TableProps {
  headings: string[];
  data: Record<string, any>[];
  endpoint: EndpointType;
  queryKey: QueryKey;
  mode: ModeType;
  lookup: string[];
}

const Table: React.FC<TableProps> = (props) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b-2 border-neutral-700">
          {props.headings.map((heading, key) => (
            <th key={key} className="text-left pl-2 py-2">
              {heading}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.data?.map((item: Record<string, any>, key: number) => (
          <Row
            mode={props.mode}
            key={key}
            item={item}
            delete
            update
            add
            lookup={props.lookup}
            level={0}
            subRow="children"
            endpoint={props.endpoint}
            queryKey={props.queryKey}
            id={item.id}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
