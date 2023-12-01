import { ModeType, onOpen } from "@/redux/slices/modalSlice";
import { AppDispatch } from "@/redux/store";
import { EndpointType } from "@/types/types";
import { QueryKey } from "@/types/types";
import { IoAddCircle } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";

interface RowAddProps {
  item: any;
  mode: ModeType;
  endpoint: EndpointType;
  queryKey: QueryKey;
}

export const RowAdd: React.FC<RowAddProps> = (props) => {
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
      <IoAddCircle />
    </button>
  );
};
