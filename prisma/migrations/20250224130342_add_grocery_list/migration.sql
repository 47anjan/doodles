-- CreateTable
CREATE TABLE "GroceryItem" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GroceryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroceryList" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,

    CONSTRAINT "GroceryList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_GroceryItemToGroceryList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GroceryItemToGroceryList_AB_unique" ON "_GroceryItemToGroceryList"("A", "B");

-- CreateIndex
CREATE INDEX "_GroceryItemToGroceryList_B_index" ON "_GroceryItemToGroceryList"("B");

-- AddForeignKey
ALTER TABLE "_GroceryItemToGroceryList" ADD CONSTRAINT "_GroceryItemToGroceryList_A_fkey" FOREIGN KEY ("A") REFERENCES "GroceryItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroceryItemToGroceryList" ADD CONSTRAINT "_GroceryItemToGroceryList_B_fkey" FOREIGN KEY ("B") REFERENCES "GroceryList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
