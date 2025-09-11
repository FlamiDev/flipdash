"use client";

import { useParams } from "next/navigation";

export default function PlayerPage() {
    const { player } = useParams<{ player: string }>();

    if (player !== "player1" && player !== "player2") {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-4">Ongeldige speler</h1>
            </div>  
        )
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Speler {player}</h1>
            <p>Speler pagina voor {player}</p>
        </div>  
    )
}