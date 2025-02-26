import prisma from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const id = Number(params.id);

  try {
    const groceryList = await prisma.groceryList.findFirst({
      where: { recipeId: id, userId: user.id },
    });

    return NextResponse.json(groceryList, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch grocery list:", error);
    return NextResponse.json(
      { error: "Failed to fetch grocery list" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  response: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const id = Number(params.id);

  const save = await prisma.groceryList.findUnique({
    where: { id },
  });

  if (!save)
    return NextResponse.json({ error: "Invalid post" }, { status: 404 });

  const result = await prisma.groceryList.delete({
    where: { id },
  });

  return NextResponse.json(result, { status: 201 });
}
