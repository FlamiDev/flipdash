"use client";
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useRouter } from 'next/navigation';
    
export default function MultiplayerPage() {
  const router = useRouter();
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(5);

  // countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showCountdown && countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    } else if (showCountdown && countdown === 0) {
      router.push("/gamemenu");
    }
    return () => clearTimeout(timer);
  }, [showCountdown, countdown, router]);

  return (
    <div
      className="flex flex-col items-center justify-between min-h-screen bg-cover bg-center relative text-white"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="absolute inset-0 bg-black/60" />
      
            <div className="flex items-center justify-between w-full p-4 relative z-10">
              <button
                onClick={() => setShowQuitConfirm(true)}
                className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-lg bg-black/50 border border-gray-600 shadow-md hover:bg-black/70 transition"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
      
      
      
              <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">
                Multiplayer
              </h1>
            </div>

      <div className="flex flex-col items-center relative z-10">
        <p className="text-lg">My score</p>
        <p className="text-5xl font-bold">1534</p>
        <p className="mt-5 text-sm text-gray-300">Opponent</p>
        <p className="text-2xl font-semibold">893</p>
      </div>

      <div className="flex flex-col items-center gap-4 pb-13 relative z-10">
              <div className="flex flex-col gap-4 w-fit">
                <div className="flex gap-4">
                  <button className="cursor-pointer bg-black/50 border border-gray-700 p-4 rounded-lg shadow-md">
                    <ArrowLeft size={50} />
                  </button>
                  <button className="cursor-pointer bg-black/50 border border-gray-700 p-4 rounded-lg shadow-md">
                    <ArrowRight size={50} />
                  </button>
                  <button className="cursor-pointer bg-black/50 border border-gray-700 p-4 rounded-lg shadow-md">
                    <RotateCcw size={50} />
                  </button>
                </div>
      
                <button className="cursor-pointer bg-black/50 border border-gray-700 py-5 rounded-lg shadow-md w-full text-2xl">
                  Hold to drop ↓
                </button>
              </div>
            </div>
           
            {showQuitConfirm && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-black/90 rounded-2xl p-6 w-80 text-center shadow-xl">
            <h2 className="font-bold text-lg mb-2">
              Are you sure you want to quit?
            </h2>
            <p className="text-sm text-gray-300 mb-6">
              Your current game will be lost
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowQuitConfirm(false);
                  setShowCountdown(true);
                  setCountdown(5);
                }}
                className="cursor-pointer flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg"
              >
                Quit
              </button>
              <button
                onClick={() => setShowQuitConfirm(false)}
                className="cursor-pointer flex-1 bg-white text-black font-semibold py-2 rounded-lg"
              >
                Continue playing
              </button>
            </div>
          </div>
        </div>
      )}

      {showCountdown && (
  <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-black/90 rounded-2xl p-6 w-80 text-center shadow-xl">
      <h2 className="font-bold text-lg mb-2">
        You’re quitting the game in
      </h2>
      <p className="text-3xl font-bold mb-6">{countdown}s</p>
      <button
        onClick={() => {
          setShowCountdown(false);
          setCountdown(5);
        }}
        className="cursor-pointer bg-white text-black font-semibold py-2 px-6 rounded-lg mx-auto block"  
      >
        Continue playing
      </button>
    </div>
  </div>
)}
    </div>
  );
}
