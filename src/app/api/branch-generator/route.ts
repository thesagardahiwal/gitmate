import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    const prompt = `Generate 5 standard git branch names based on the following task: "${description}".
    
    Requirements:
    - Use lowercase and hyphens instead of spaces
    - Use common prefixes like feat/, fix/, chore/, docs/, bug/
    - Return ONLY a valid JSON array of strings
    - Do NOT include any markdown formatting or backticks
    
    Example response: ["feat/authentication-module", "fix/login-validation", "chore/update-deps"]`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown
    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    let branches = [];
    try {
      branches = JSON.parse(cleanedText);
    } catch (e) {
      console.error("Failed to parse Gemini response:", cleanedText);
      return NextResponse.json({ error: "Failed to parse generation result." }, { status: 500 });
    }

    return NextResponse.json({ branches });
  } catch (error: any) {
    console.error("Branch generator error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate branch names" }, { status: 500 });
  }
}
