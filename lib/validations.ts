import z from "zod";

export const favoriteRecipeSchema = z.object({
  recipeId: z.number(),
  userId: z.string(),
  image: z.string().optional(),
  title: z.string(),
});
