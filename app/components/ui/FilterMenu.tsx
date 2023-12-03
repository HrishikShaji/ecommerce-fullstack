import { useGetQuery } from "@/app/hooks/useGetQuery";
import { Spinner } from "./Spinner";
import CheckBox from "./CheckBox";

interface FilterMenuProps {
  values: Record<string, any>;
  handleCheckBox: (key: string, value: boolean) => void;
  field: string;
}

export const FilterMenu: React.FC<FilterMenuProps> = (props) => {
  const { data, isError, isLoading } = useGetQuery({
    endpoint: "color",
    queryKey: "colors",
    page: 1,
    sort: "LATEST",
  });
  if (isError) return null;
  return (
    <div className="flex flex-col gap-2">
      <h1>Color</h1>
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          data.map((item: any) => (
            <CheckBox
              key={item.id}
              onChange={(value: boolean) =>
                props.handleCheckBox(item.id as string, value)
              }
              label={item.name as string}
              selected={props.values[item.id]?.value}
            />
          ))
        )}
      </div>
    </div>
  );
};