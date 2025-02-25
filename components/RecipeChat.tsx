"use client";

import { RecipeDetails } from "@/lib/types";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";

interface ChatProps {
  recipe: RecipeDetails;
}

export default function RecipeChat({ recipe }: ChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: "/api/ai-recipe",
      body: { recipe: JSON.stringify(recipe) },
    });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-2xl font-bold mb-4">Recipe Assistant</h2>
      <div className="rounded-lg border bg-background p-4">
        <div className="mb-4 h-64 overflow-y-auto space-y-4">
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
                <div className="text-sm font-medium text-foreground/70 mb-1">
                  {m.role === "user" ? "You" : "Steve"}
                </div>
                <div className="whitespace-pre-wrap">{m.content}</div>
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
  );
}
