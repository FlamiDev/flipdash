"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { IconLoader2 } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function JoinPlayerPage() {
  const router = useRouter();
  const { player } = useParams<{ player: string }>();
  const [alreadyLoggedIn, setAlreadyLoggedIn] = useState(false);
  const [status, setStatus] = useState<"loading" | "success" | "taken" | "invalid" | "error" | "already_logged_in_elsewhere">("loading");

  useEffect(() => {
    if (player !== "player1" && player !== "player2") {
      router.replace("/join/invalid");
    }

    if (status === "success" && player) {
      router.replace(`/play/${player}`);
    }
  }, [status, player, router]);

  useEffect(() => {
    if (status === "success" ) {
      if (!alreadyLoggedIn) {
      toast.success("Successfully joined!");
      } 
    } else if (status === "taken") {
      toast.error("This player is already taken.");
    } else if (status === "invalid") {
      toast.error("Invalid player.");
    } else if (status === "error") {
      toast.error("An error occurred.");
    } else if (status === "already_logged_in_elsewhere") {
      toast.error("You are already logged in as the other player.");
    }
  }, [status, alreadyLoggedIn]);

  useEffect(() => {
    async function join() {
      try {
        const res = await fetch(`/api/join/${player}`);
        const data = await res.json();
        if (data.success) {
          if (data.alreadyLoggedIn) {
            setAlreadyLoggedIn(true);
          }
          setStatus("success");
        } else if (data.reason === "taken") {
          setStatus("taken");
        } else if (data.reason === "invalid_player") {
          setStatus("invalid");
        } else if (data.reason === "already_logged_in_elsewhere") {
          setStatus("already_logged_in_elsewhere");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    }
    if (player) join();
  }, [player]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Joining Tetris game...</h1>
        <IconLoader2 stroke={2} className="animate-spin" />
      </div>
    );
  }

  if (status === "taken" || status === "invalid" || status === "already_logged_in_elsewhere" || status === "error") {
    let message = "Something went wrong.";
    if (status === "taken") message = "This player is already taken.";
    if (status === "invalid") message = "This player is invalid.";
    if (status === "already_logged_in_elsewhere") message = "You are already logged in as the other player.";
    if (status === "error") message = "An error occurred while trying to join.";

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">{message}</h1>
      </div>
    );
  }

  return null;
}
