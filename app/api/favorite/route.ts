import prisma from "@/db/db";
import { favoriteRecipeSchema } from "@/lib/validations";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = await currentUser();

  if (!user) {
    return NextResponse.json("Unauthorized", { status: 403 });
  }

  const body = await request.json();
  const validation = favoriteRecipeSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const save = await prisma.favoriteRecipe.create({
    data: {
      ...body,
    },
  });

  return NextResponse.json(save, { status: 201 });
}
