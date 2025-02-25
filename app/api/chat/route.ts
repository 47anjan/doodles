import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, systemPrompt } = await req.json();

  try {
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
