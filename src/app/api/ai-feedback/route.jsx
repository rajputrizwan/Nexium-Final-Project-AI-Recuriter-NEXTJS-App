import { FEEDBACK_PROMPT } from "@/services/constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req) {
  try {
    const { conversation } = await req.json();

    const conversationText = conversation
      .map(
        (msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`
      )
      .join("\n");

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      conversationText
    );

    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-7b-instruct",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    return NextResponse.json(completion.choices[0].message);
  } catch (e) {
    console.error("API error:", e?.message || e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
