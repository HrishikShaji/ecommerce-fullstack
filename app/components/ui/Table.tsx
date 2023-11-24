import Row from "./Row";

interface TableProps {
  headings: string[];
  data: Record<string, any>[];
}

const Table: React.FC<TableProps> = (props) => {
  return (
    <table>
      <thead>
        <tr>
          {props.headings.map((heading, key) => (
            <th key={key}>{heading}</th>
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
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;
