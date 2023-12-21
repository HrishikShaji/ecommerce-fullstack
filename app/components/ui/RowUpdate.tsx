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
  console.log("in the row", props.endpoint);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <button
      onClick={() =>
        dispatch(
          onOpen({
            mode: props.mode,
            data: props.item,
          }),
        )
      }
      className="cursor-pointer"
    >
      <MdEdit />
    </button>
  );
};
