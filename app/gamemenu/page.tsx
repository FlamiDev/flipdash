"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";


export default function MenuPage() {
  const router = useRouter();

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center relative text-white"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Titel bovenaan */}
     <div className="absolute inset-0 bg-black/60" />

      {/* Titel bovenaan */}
      <div className="flex items-center justify-between w-full p-4 relative z-10">
        <button
          onClick={() => router.push("/relaxation")}
          className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-black/50 border border-gray-600 shadow-md hover:bg-black/70 transition"
        >
          <ArrowLeft size={20} className="text-white" />
        </button>



        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">
          Tetris
        </h1>
      </div>

      {/* Inhoud gecentreerd */}
      <div className="flex flex-col flex-1 items-center justify-center gap-8 relative z-10 w-full max-w-xs mx-auto">
        {/* Logo / icoon */}
        <div className="w-32 h-32 rounded-full bg-black/50 flex flex-col items-center justify-center border border-gray-700 shadow-lg">
          <img
            src="/tetrisblok.png"
            alt="Random Block"
            className="w-16 h-16"
          />
        </div>

        {/* Menu knoppen */}
        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={() => router.push("/singleplayer")}
            className="cursor-pointer bg-black/50 border border-gray-700 py-3 rounded-lg shadow-md"
          >
            Singleplayer
          </button>
          <button
            onClick={() => router.push("/multiplayer")}
            className="cursor-pointer bg-black/50 border border-gray-700 py-3 rounded-lg shadow-md"
          >
            Multiplayer
          </button>
          <button
            onClick={() => router.push("/flexy")}
            className="cursor-pointer bg-black/50 border border-gray-700 py-3 rounded-lg shadow-md"
          >
            Flexy mode
          </button>
        </div>
      </div>
    </div>
  );
}
