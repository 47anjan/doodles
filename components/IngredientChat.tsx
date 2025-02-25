"use client";

import { IngredientDetails } from "@/lib/types";
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
  ingredient: IngredientDetails;
}

export default function IngredientChat({ ingredient }: ChatProps) {
  const systemPrompt = `You are a food science expert analyzing **${
    ingredient.name
  }**. Use this detailed technical profile:

**Core Information:**
- Category Hierarchy: ${ingredient.categoryPath.join(" › ")}
- Physical Properties: ${ingredient.consistency}
- Storage Location: ${ingredient.aisle}
- Standard Quantity: ${ingredient.amount} ${ingredient.unit}
- Estimated Cost: $${(ingredient.estimatedCost.value / 100).toFixed(2)} ${
    ingredient.estimatedCost.unit
  }

**Nutritional Profile (per ${ingredient.nutrition.weightPerServing.amount}${
    ingredient.nutrition.weightPerServing.unit
  } serving):**
${ingredient.nutrition.nutrients
  .map(
    (n) => `- ${n.name}: ${n.amount}${n.unit} (${n.percentOfDailyNeeds}% DV)`
  )
  .join("\n")}

**Chemical Properties:**
${
  ingredient.nutrition.properties
    .map((p) => `- ${p.name}: ${p.amount}${p.unit}`)
    .join("\n") || "No significant chemical properties recorded"
}

**Category Associations:**
${ingredient.categoryPath.map((c, i) => `${"  ".repeat(i)}▸ ${c}`).join("\n")}

**Expert Analysis Guidelines:**
1. When discussing nutritional impact, prioritize these key nutrients: 
   ${ingredient.nutrition.nutrients
     .filter((n) => n.percentOfDailyNeeds > 5)
     .map((n) => n.name)
     .join(", ")}

2. Highlight potential allergen cross-contamination risks based on: 
   ${
     ingredient.aisle.toLowerCase().includes("dairy")
       ? "Dairy allergens"
       : ingredient.aisle.toLowerCase().includes("nuts")
       ? "Tree nut allergens"
       : "No major allergen patterns detected"
   }

3. For substitution suggestions, consider these categories: 
   ${ingredient.categoryPath.slice(0, 3).join(" › ")}

4. When calculating nutrition for recipes:
   - Base calculations on ${ingredient.nutrition.weightPerServing.amount}${
    ingredient.nutrition.weightPerServing.unit
  } increments
   - Account for ${ingredient.consistency} texture properties
   - Consider ${ingredient.estimatedCost.unit} cost units

Provide precise, scientific answers using metric measurements. Include storage recommendations based on aisle location, chemical interactions based on properties, and culinary applications based on texture/consistency.`;

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
        <Button className="bg-orange  w-full text-white">
          Ask About This Ingredient
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-4 pb-0 select-text">
          <div className="">
            <div className="rounded-lg border bg-background p-4">
              <div className="mb-4 h-[65vh] overflow-y-auto space-y-4">
                {messages.length === 0 && (
                  <div className="text-gray-500  text-center py-4">
                    Need assistance with {ingredient.name}? I can provide
                    guidance on ingredient substitutions, precise measurements,
                    and step-by-step instructions.
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
                      <div className="flex  justify-between items-center gap-2 text-sm font-medium text-foreground/70 mb-1">
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
