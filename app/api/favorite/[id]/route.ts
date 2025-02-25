import prisma from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  response: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const id = Number(params.id);

  const save = await prisma.favoriteRecipe.findUnique({
    where: { id },
  });

  if (!save)
    return NextResponse.json({ error: "Invalid post" }, { status: 404 });

  const result = await prisma.favoriteRecipe.delete({
    where: { id },
  });

  return NextResponse.json(result, { status: 201 });
}
