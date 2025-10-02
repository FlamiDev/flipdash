"use client";

import {useEffect} from "react";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {toast} from "sonner";
import {IconLoader2} from "@tabler/icons-react";
import {SessionResult} from "@/lib/session";

let globalLoggingInFlag = false;

export default function JoinPlayerPage() {
    const router = useRouter();
    const {player} = useParams<{ player: string }>();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") ?? "/";

    useEffect(() => {
        async function join() {
            try {
                globalLoggingInFlag = true;
                const res = await fetch(`/api/join/${player}`);
                const data = await res.json() as SessionResult;
                switch (data.type) {
                    case "new_session":
                        toast.success("Successfully joined!");
                        router.replace(redirect)
                        break;
                    case "already_logged_in":
                        if (data.player === player) {
                            toast.success("You are already logged in.");
                            router.replace(redirect)
                        } else {
                            toast.error("You are already logged in as the other player.");
                            router.replace("/");
                        }
                        break;
                    case "invalid_player":
                        toast.error("Invalid player.");
                        router.replace("/");
                        break;
                    case "taken":
                        toast.error("This player is already taken.");
                        router.replace("/");
                        break;
                }
            } catch {
                toast.error("Failed to join the game. Please try again.");
                router.replace("/");
            } finally {
                globalLoggingInFlag = false;
            }
        }

        if (!globalLoggingInFlag) join();
    }, [player, redirect, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Joining Tetris game...</h1>
            <IconLoader2 stroke={2} className="animate-spin"/>
        </div>
    );
}
