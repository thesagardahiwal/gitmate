import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description || typeof description !== "string") {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    const prompt = `Generate 10 project names with short taglines based on this description: "${description}".
    
    Requirements:
    - Names should be catchy, modern, and memorable
    - Taglines should be 1-2 sentences max
    - Return ONLY a valid JSON array of objects with "name" and "tagline" properties
    - Do NOT include any markdown formatting or backticks
    
    Example response: [{"name": "GitMate", "tagline": "The ultimate git productivity toolkit."}]`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown
    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    let projects = [];
    try {
      projects = JSON.parse(cleanedText);
    } catch (e) {
      console.error("Failed to parse Gemini response:", cleanedText);
      return NextResponse.json({ error: "Failed to parse generation result." }, { status: 500 });
    }

    return NextResponse.json({ projects });
  } catch (error: any) {
    console.error("Project name generator error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate project names" }, { status: 500 });
  }
}
