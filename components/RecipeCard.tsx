// components/RecipeChat.tsx
"use client";

import { AI } from "@/lib/actions";
import { useUIState, useActions } from "ai/rsc";
import { useEffect, useRef } from "react";

interface ChatProps {
  recipeId: string;
}

export default function RecipeChat({ recipeId }: ChatProps) {
  const [messages, setMessages] = useUIState<typeof AI>();
  const { continueConversation } = useActions<typeof AI>();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-2xl font-bold mb-4">Recipe Assistant</h2>
      <div className="rounded-lg border bg-background p-4">
        <div ref={containerRef} className="mb-4 h-64 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] rounded-lg px-4 py-2 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.display ?? message.content}
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget as HTMLFormElement);
            const input = formData.get("input") as string;

            // Add user message immediately
            setMessages((currentMessages) => [
              ...currentMessages,
              {
                id: Date.now(),
                role: "user",
                content: input,
              },
            ]);

            try {
              // Reset input
              e.currentTarget.reset();

              // Stream the AI response
              const responseMessage = await continueConversation(
                recipeId,
                input
              );

              // Add assistant response
              setMessages((currentMessages) => [
                ...currentMessages,
                responseMessage,
              ]);
            } catch (error) {
              console.error("Chat error:", error);
              // Handle error state
            }
          }}
          className="flex gap-2"
        >
          <input
            ref={inputRef}
            name="input"
            placeholder="Ask about ingredients, substitutions, or instructions..."
            className="flex-1 rounded border p-2"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
