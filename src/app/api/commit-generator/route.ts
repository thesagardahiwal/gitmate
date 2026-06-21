import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    const prompt = `Generate 5 conventional commit messages for the following changes: "${description}".
    
    Requirements:
    - Follow conventional commit format (e.g., feat(auth): add JWT validation)
    - Keep messages concise and descriptive
    - Return ONLY a valid JSON array of strings
    - Do NOT include any markdown formatting or backticks
    
    Example response: ["feat: add login page", "fix(ui): resolve button alignment"]`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown from the response
    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    let messages = [];
    try {
      messages = JSON.parse(cleanedText);
    } catch (e) {
      console.error("Failed to parse Gemini response:", cleanedText);
      return NextResponse.json({ error: "Failed to parse generation result." }, { status: 500 });
    }

    return NextResponse.json({ messages });
  } catch (error: any) {
    console.error("Commit generator error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate commit messages" }, { status: 500 });
  }
}
