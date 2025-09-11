"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner"
import { IconLoader2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'

export default function JoinPlayerPage() {
  const router = useRouter();
  const { player } = useParams<{ player: string }>();
  const [status, setStatus] = useState<"loading" | "success" | "taken" | "invalid" | "error">("loading");

  if (player !== "player1" && player !== "player2") {
    router.push('/join/invalid')
  }

  useEffect(() => {
  if (status === "success") {
    toast.success("Succesvol ingelogd!");
  } else if (status === "taken") {
    toast.error("Deze speler is al bezet.");
  } else if (status === "invalid") {
    toast.error("Ongeldige speler.");
  } else if (status === "error") {
    toast.error("Er is iets misgegaan.");
  }
}, [status]);

  useEffect(() => {
    async function join() {
      try {
        const res = await fetch(`/api/join/${player}`);
        const data = await res.json();
        if (data.success) {
          setStatus("success");
        } else if (data.reason === "taken") {
          setStatus("taken");
        } else if (data.reason === "invalid_player") {
          setStatus("invalid");
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
  } else if (status === "success") {
    router.push(`/play/${player}`);
  } else if (status === "taken") {
    router.push('/join/taken')
  } else if (status === "invalid") {
    router.push('/join/invalid')
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Er is iets misgegaan.</h1>
      </div>
    );
  }
}