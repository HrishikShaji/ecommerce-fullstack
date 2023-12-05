import { FilterRangeMenu } from "./components/ui/FilterRangeMenu";
import { InputRange } from "./components/ui/InputRange";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[200px]">
        <FilterRangeMenu label="filter" />
      </div>
    </main>
  );
}
