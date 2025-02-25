"use server";

import { GroceryIngredient } from "@/app/recipes/_components/GroceryList";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const grocerySchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    checked: z.boolean(),
  })
);

export type GroceryListSchema = z.infer<typeof grocerySchema>;

export const generateGroceryList = async (ingredients: GroceryIngredient[]) => {
  const result = await generateObject({
    model: google("gemini-2.0-flash-exp"),

    prompt: `
        Analyze the following recipe ingredients and generate a structured grocery list. 
        For each ingredient, include its ID, name, and a default checked status of false.
        Ensure the list is concise and easy to follow.

        - **ID**: Use the provided ingredient ID.
        - **Name**: The name of the ingredient.
        - **Checked**: Set to false by default.
  
        Ingredients:
        ${JSON.stringify(ingredients)}
  
        Instructions:
        1. Extract the essential ingredient names.
        2. Maintain the ingredient IDs for reference.
        3. Set all checked statuses to false by default.
        4. Return the results in a structured array format.
      `,
    schema: grocerySchema,
  });
  return result.object;
};
