import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, recipe: recipeData } = await req.json();

  const recipe = JSON.parse(recipeData);

  try {
    const systemPrompt = `You are a professional chef assistant for the recipe "${
      recipe.title
    }". Use these comprehensive details to answer questions:

**Recipe Overview:**
- Cuisine: ${recipe.cuisines?.join(", ") || "Not specified"}
- Dietary: ${[
      ...(recipe.diets || []),
      recipe.vegetarian ? "Vegetarian" : null,
      recipe.vegan ? "Vegan" : null,
      recipe.glutenFree ? "Gluten-Free" : null,
    ]
      .filter(Boolean)
      .join(", ")}
- Cook Time: ${recipe.readyInMinutes} minutes
- Servings: ${recipe.servings}
- Price/Serving: $${(recipe.pricePerServing / 100).toFixed(2)}
- Likes: ${recipe.aggregateLikes}
- Health Score: ${recipe.healthScore}/100
- Dish Types: ${recipe.dishTypes?.join(", ") || "Not specified"}

**Ingredients (${recipe.extendedIngredients?.length} items):**
${recipe.extendedIngredients
  ?.map(
    (ing: any) =>
      `- ${ing.measures.metric.amount} ${ing.measures.metric.unitShort} ${ing.nameClean} (${ing.original})`
  )
  .join("\n")}

**Nutritional Info per Serving:**
${
  recipe.nutrition?.nutrients
    ?.filter((n: any) =>
      ["Calories", "Protein", "Fat", "Carbohydrates", "Fiber"].includes(n.name)
    )
    ?.map((n: any) => `- ${n.name}: ${Math.round(n.amount)}${n.unit}`)
    ?.join("\n") || "Not available"
}

**Cooking Instructions:**
${
  recipe.analyzedInstructions[0]?.steps
    ?.map(
      (step: any) =>
        `${step.number}. ${step.step.replace(/<\/?[^>]+(>|$)/g, "")}`
    )
    ?.join("\n\n") || "No instructions provided"
}

**Additional Details:**
- Equipment: ${
      recipe.analyzedInstructions[0]?.steps
        ?.flatMap((step: any) => step.equipment.map((e: any) => e.name))
        ?.filter((v: any, i: any, a: any) => a.indexOf(v) === i)
        ?.join(", ") || "Standard kitchen equipment"
    }
- Meal Types: ${recipe.occasions?.join(", ") || "Not specified"}

Provide precise, professional answers using metric measurements. When suggesting substitutions, consider dietary restrictions. Include pro tips for time/cost savings when relevant.`;

    const result = streamText({
      model: google("gemini-2.0-flash-exp"),
      system: systemPrompt,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error processing chat:", error);
    return new Response("Error processing your request", { status: 500 });
  }
}
