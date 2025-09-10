"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JoinPlayerPage() {
  const { player } = useParams<{ player: string }>();
  const [status, setStatus] = useState<"loading" | "success" | "taken" | "invalid" | "error">("loading");

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

  if (status === "loading") return <p>Bezig met inloggen...</p>;
  if (status === "success") return <p>Succesvol ingelogd als {player}!</p>;
  if (status === "taken") return <p>Deze speler is al bezet.</p>;
  if (status === "invalid") return <p>Ongeldige speler.</p>;
  return <p>Er is iets misgegaan.</p>;
}