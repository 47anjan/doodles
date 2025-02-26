import prisma from "@/db/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const body = await request.json();

  const save = await prisma.groceryList.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(save, { status: 201 });
}
