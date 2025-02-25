"use client";

import { RecipeDetails } from "@/lib/types";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { FiCopy } from "react-icons/fi";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface ChatProps {
  recipe: RecipeDetails;
}

export default function RecipeChat({ recipe }: ChatProps) {
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

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      body: { systemPrompt: JSON.stringify(systemPrompt) },
    });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy text:", err);
    });
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-orange text-white">Ask About This Recipe</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4 pb-0 select-text">
          <div className="">
            <div className="rounded-lg border bg-background p-4">
              <div className="mb-4 h-[65vh] overflow-y-auto space-y-4">
                {messages.length === 0 && (
                  <div className="text-gray-500 text-center py-4">
                    Ask me about {recipe.title}! I can help with substitutions,
                    measurements, or instructions.
                  </div>
                )}

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${
                      m.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-lg max-w-[80%] ${
                        m.role === "user" ? "bg-muted" : "bg-muted"
                      }`}
                    >
                      <div className="flex justify-between items-center gap-2 text-sm font-medium text-foreground/70 mb-1">
                        <span>{m.role === "user" ? "You" : "Steve"}</span>
                        {m.role !== "user" && (
                          <button
                            onClick={() => copyToClipboard(m.content)}
                            className="hover:text-primary transition-colors"
                            title="Copy to clipboard"
                          >
                            <FiCopy className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <article className="prose prose-stone dark:prose-invert">
                        <ReactMarkdown>{m.content}</ReactMarkdown>
                      </article>
                    </div>
                  </div>
                ))}

                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 text-destructive">
                    Error: {error.message}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (input.trim()) handleSubmit(e);
                }}
                className="flex gap-2"
              >
                <input
                  autoFocus
                  name="input"
                  value={input}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Ask about this recipe..."
                  className="flex-1 rounded border p-2 focus:ring-2 focus:ring-primary"
                  aria-label="Ask a question about the recipe"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 disabled:opacity-50"
                  disabled={!input.trim() || isLoading}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
