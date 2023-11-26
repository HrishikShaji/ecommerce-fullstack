import { ModeType, onOpen } from "@/redux/slices/modalSlice";
import { AppDispatch } from "@/redux/store";
import { EndpointType } from "@/types/types";
import { QueryKey } from "@/types/types";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";

interface RowUpdateProps {
  item: any;
  mode: ModeType;
  endpoint: EndpointType;
  queryKey: QueryKey;
}

export const RowUpdate: React.FC<RowUpdateProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <button
      onClick={() =>
        dispatch(
          onOpen({
            mode: "billboard",
            data: props.item,
            endpoint: props.endpoint,
            queryKey: props.queryKey,
          }),
        )
      }
      className="cursor-pointer"
    >
      <MdEdit />
    </button>
  );
};
