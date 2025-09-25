"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { SessionResult, SessionResultType } from "@/lib/session";

export default function JoinPlayerPage() {
  const router = useRouter();
  const { player } = useParams<{ player: string }>();
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const [status, setStatus] = useState<SessionResultType|null>(null);

  useEffect(() => {
    if (player !== "player1" && player !== "player2") {
      router.replace("/join/invalid");
    }

    if (status === "new_session" && player) {
      router.replace(`/play/${player}`);
    }
  }, [status, player, router]);

  useEffect(() => {
    if (status === "new_session") {
      if (!alreadyLoggedIn) {
        toast.success("Successfully joined!");
      }
    } else if (status === "taken") {
      toast.error("This player is already taken.");
    } else if (status === "invalid_player") {
      toast.error("Invalid player.");
    } else if (status === "already_logged_in") {
      toast.error("You are already logged in as the other player.");
    }
  }, [status, alreadyLoggedIn]);

  useEffect(() => {
    async function join() {
      try {
        const res = await fetch(`/api/join/${player}`);
        const data = await res.json() as SessionResult;
        if (data.type === "already_logged_in") {
          setAlreadyLoggedIn(true);
        }
        setStatus(data.type);
      } catch {
        setStatus(null);
      }
    }
    if (player) join();
  }, [player]);

  if (status == null) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Joining Tetris game...</h1>
        <IconLoader2 stroke={2} className="animate-spin" />
      </div>
    );
  }

  if (status !== "new_session") {
    let message = "Something went wrong.";
    if (status === "taken") message = "This player is already taken.";
    if (status === "invalid_player") message = "This player is invalid.";
    if (status === "already_logged_in") message = "You are already logged in as the other player.";

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">{message}</h1>
      </div>
    );
  }

  return null;
}