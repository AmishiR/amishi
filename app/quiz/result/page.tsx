import ResultsList from "@/components/code/ResultsList";

export default async function ProtectedPage() {
  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Your Assessment Results
        </h1>
        <ResultsList />
      </div>
    </div>
  );
}
