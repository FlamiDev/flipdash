import React from 'react'
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";

export default function MultiplayerPage() {
  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen bg-cover bg-center relative text-white"
      style={{ backgroundImage: "url('/tetris.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Back button + titel */}
      <div className="flex items-center justify-start w-full p-4 relative z-10">
        <button className="p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="flex-1 text-center text-xl font-semibold">
          Multiplayer
        </h1>
      </div>

      {/* Scoreboard */}
      <div className="flex flex-col items-center relative z-10">
        <p className="text-lg">My score</p>
        <p className="text-5xl font-bold">1534</p>
        <p className="mt-5 text-sm text-gray-300">Opponent</p>
        <p className="text-2xl font-semibold">893</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-4 pb-8 relative z-10">
        <div className="flex flex-col gap-4 w-fit">
          {/* Bovenste rij */}
          <div className="flex gap-4">
            <button className="bg-black/50 border border-gray-700 p-4 rounded-lg shadow-md">
              <ArrowLeft size={28} />
            </button>
            <button className="bg-black/50 border border-gray-700 p-4 rounded-lg shadow-md">
              <ArrowRight size={28} />
            </button>
            <button className="bg-black/50 border border-gray-700 p-4 rounded-lg shadow-md">
              <RotateCcw size={28} />
            </button>
          </div>

          {/* Onderste knop */}
          <button className="bg-black/50 border border-gray-700 py-3 rounded-lg shadow-md w-full">
            Hold to drop ↓
          </button>
        </div>
      </div>
    </div>
  );
}
