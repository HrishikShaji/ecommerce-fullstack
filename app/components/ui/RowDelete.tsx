import { useDeleteQuery } from "@/app/hooks/useDeleteQuery";
import { EndpointType, QueryKey } from "@/types/types";
import { MdDelete } from "react-icons/md";
import { Spinner } from "./Spinner";

export interface RowDeleteProps {
  id: string;
  endpoint: EndpointType;
  queryKey: QueryKey;
}

export const RowDelete: React.FC<RowDeleteProps> = (props) => {
  const { remove, isDeleting, isError } = useDeleteQuery({
    endpoint: props.endpoint,
    queryKey: props.queryKey,
  });
  if (isError) return null;
  return (
    <button className="cursor-pointer" onClick={() => remove(props.id)}>
      {isDeleting ? <Spinner /> : <MdDelete size={23} />}
    </button>
  );
};
