/*
  Warnings:

  - You are about to drop the `GroceryItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroceryList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_GroceryItemToGroceryList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroceryItemToGroceryList" DROP CONSTRAINT "_GroceryItemToGroceryList_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroceryItemToGroceryList" DROP CONSTRAINT "_GroceryItemToGroceryList_B_fkey";

-- DropTable
DROP TABLE "GroceryItem";

-- DropTable
DROP TABLE "GroceryList";

-- DropTable
DROP TABLE "_GroceryItemToGroceryList";

-- CreateTable
CREATE TABLE "grocery_lists" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "ingredients" JSONB NOT NULL,

    CONSTRAINT "grocery_lists_pkey" PRIMARY KEY ("id")
);
