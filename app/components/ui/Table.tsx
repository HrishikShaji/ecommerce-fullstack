import Row from "./Row";

interface TableProps {
  headings: string[];
  data: Record<string, any>[];
}

const Table: React.FC<TableProps> = (props) => {
  return (
    <table className="w-[50vw]">
      <thead>
        <tr className="border-b-2 border-black">
          {props.headings.map((heading, key) => (
            <th key={key} className="">
              {heading}
            </th>
          ))}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.data?.map((item: Record<string, any>, key: number) => (
          <Row
            key={key}
            item={item}
            delete
            update
            add
            lookup={["name", "createdAt"]}
            level={0}
            subRow="children"
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
