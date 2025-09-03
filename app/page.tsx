import SearchInput from "@/components/SearchInput";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Flipdash</h1>
      <SearchInput />
    </div>
  );
}