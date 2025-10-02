import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/tetris.png')" }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <h1 className="text-3xl font-bold text-white mb-10 relative z-10">Games</h1>

      <div className="flex flex-col gap-5 w-72 relative z-10">
        <Link
          href="/tetris"
          className="bg-black/70 border border-gray-700 text-white py-4 px-4 rounded-lg shadow-lg hover:bg-black/50 text-center transition"
        >
          Tetris
        </Link>
        <Link
          href="#"
          className="bg-black/70 border border-gray-700 text-white py-4 px-4 rounded-lg shadow-lg hover:bg-black/50 text-center transition"
        >
          Snake
        </Link>
        <Link
          href="#"
          className="bg-black/70 border border-gray-700 text-white py-4 px-4 rounded-lg shadow-lg hover:bg-black/50 text-center transition"
        >
          Galgje
        </Link>
        <Link
          href="#"
          className="bg-black/70 border border-gray-700 text-white py-4 px-4 rounded-lg shadow-lg hover:bg-black/50 text-center transition"
        >
          Dilemma&apos;s
        </Link>
      </div>

    </div>
  );
}
