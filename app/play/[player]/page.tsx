"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IconLoader2 } from '@tabler/icons-react';
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function PlayerPage() {
    const { player } = useParams<{ player: string }>();
    const router = useRouter();
    const [allowed, setAllowed] = useState<boolean | null>(null);

    useEffect(() => {
        async function checkAccess() {
            const res = await fetch(`/api/session/get/${player}`);
            const data = await res.json();

            if (data.success) {
                setAllowed(true);
            } else if (data.reason === "expired") {
                toast.error("Your session has expired.");
                router.push('/');
            } else {
                router.push('/');
                toast.error("Unauthorized access.");
            }
        }

        if (player === "player1" || player === "player2") {
            checkAccess();
        } else {
            router.push('/');
            toast.error("Invalid player.");
        }
    }, [player, router]);

    async function handleLeave() {
        try {
            await fetch(`/api/session/delete/${player}`, { method: 'DELETE' });
            toast.success("Successfully quit the session.");
            router.push('/');
        } catch (error) {
            console.error("Error leaving session:", error);
            toast.error("Failed to quit the session.");
        }
    }

    if (allowed === null) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <h1 className="text-2xl font-bold mb-4">Loading player page...</h1>
                <IconLoader2 stroke={2} className="animate-spin" />
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Player {player}</h1>
            <p>Player page for {player}</p>
            <Button variant="destructive" onClick={handleLeave}>Quit</Button>
        </div>
    )
}