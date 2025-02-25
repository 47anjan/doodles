import prisma from "@/db/db";
import SaveRecipe from "./SaveRecipe";
import UnSaveSaveRecipe from "./UnSaveSaveRecipe";

interface Props {
  recipeId: number;
  userId?: string;
  image: string;
  title: string;
}

const FavoriteStatus = async (saveRecipe: Props) => {
  const recipe = await prisma.favoriteRecipe?.findFirst({
    where: {
      recipeId: saveRecipe.recipeId,
      userId: saveRecipe.userId,
    },
  });

  return (
    <div className="ml-auto">
      {recipe ? (
        <UnSaveSaveRecipe recipeId={recipe.id} />
      ) : (
        <SaveRecipe {...saveRecipe} />
      )}
    </div>
  );
};
export default FavoriteStatus;
