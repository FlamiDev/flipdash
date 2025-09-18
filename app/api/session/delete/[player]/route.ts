import { NextRequest, NextResponse } from "next/server";
import { activePlayers } from "@/lib/players";
import { ValidatePlayer, deleteSession } from "@/lib/session";

export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ player: string }> }
) {
    const { player } = await context.params;

    if (ValidatePlayer(player)) {
        return ValidatePlayer(player);
    }

    return deleteSession(player as keyof typeof activePlayers);
}