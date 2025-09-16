"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PlayerQRCodes() {
  const [player1QR, setPlayer1QR] = useState<string | null>(null);
  const [player2QR, setPlayer2QR] = useState<string | null>(null);

  useEffect(() => {
    const fetchQR = async (player: "player1" | "player2", setter: React.Dispatch<React.SetStateAction<string | null>>) => {
      const res = await fetch(`/api/qr?player=${player}`);
      const data = await res.json();
      setter(data.qr);
    };
    fetchQR("player1", setPlayer1QR);
    fetchQR("player2", setPlayer2QR);
  }, []);

  return (
    <div className="flex gap-8">
      {player1QR && (
        <div className="flex flex-col items-center">
          <Image src={player1QR} width={200} height={200} alt="QR Player 1" />
          <p>Player 1</p>
        </div>
      )}
      {player2QR && (
        <div className="flex flex-col items-center">
          <Image src={player2QR} width={200} height={200} alt="QR Player 2" />
          <p>Player 2</p>
        </div>
      )}
    </div>
  );
}