import ResultsList from "@/components/code/ResultsList";

export default async function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <ResultsList />
      </div>
    </div>
  );
}
