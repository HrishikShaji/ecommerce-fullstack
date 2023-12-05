import { ExpRange } from "./components/ui/ExpRange";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-[200px]">
        <ExpRange />
      </div>
    </main>
  );
}
