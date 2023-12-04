import { useGetQuery } from "@/app/hooks/useGetQuery";
import { Spinner } from "./Spinner";
import CheckBox from "./CheckBox";
import { EndpointType, QueryKey } from "@/types/types";
import { useFilterQuery } from "@/app/hooks/useFilterQuery";

interface FilterMenuProps {
  values: Record<string, any>;
  field: string;
  endpoint: EndpointType;
  queryKey: QueryKey;
  label: string;
}

export const FilterMenu: React.FC<FilterMenuProps> = (props) => {
  const { data, isError, isLoading } = useGetQuery({
    endpoint: props.endpoint,
    queryKey: props.queryKey,
    page: 1,
    sort: "LATEST",
  });
  const { handleCheckBox } = useFilterQuery({
    endpoint: "filter",
    queryKey: "filters",
    page: 1,
    sort: "LATEST",
  });
  if (isError) return null;
  return (
    <div className="flex flex-col gap-2">
      <h1>{props.label}</h1>
      <div>
        {isLoading ? (
          <Spinner />
        ) : (
          data.map((item: any) => (
            <CheckBox
              key={item.id}
              onChange={(value: boolean) =>
                handleCheckBox(item.id as string, value, props.field)
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
