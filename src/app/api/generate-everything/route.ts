import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";

/**
 * POST handler for "Generate Everything".
 * Generates commit, project name, and tagline via Gemini, and branch locally.
 * 
 * @param req - The incoming Request object containing the task description.
 * @returns A JSON response with { commit, branch, projectName, tagline }.
 */
export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description) {
      return NextResponse.json({ error: "Description is required" }, { status: 400 });
    }

    const prompt = `Based on the following task: "${description}"
    
    Generate three things:
    1. A single conventional commit message (e.g., feat(auth): add JWT authentication)
    2. A catchy, short project name
    3. A short tagline for the project

    Requirements:
    - Return ONLY a valid JSON object
    - Keys must be "commit", "projectName", and "tagline"
    - Do NOT include any markdown formatting or backticks
    
    Example response: {"commit": "feat: add login page", "projectName": "AuthFlow", "tagline": "Secure authentication for modern apps"}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    // Clean up potential markdown
    const cleanedText = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    
    let parsed;
    try {
      parsed = JSON.parse(cleanedText);
    } catch (e) {
      console.error("Failed to parse Gemini response:", cleanedText);
      return NextResponse.json({ error: "Failed to parse generated output" }, { status: 500 });
    }

    // Generate branch locally
    const branchSlug = description
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
      .substring(0, 40);
    
    // Simple heuristic for branch prefix
    let prefix = "feature";
    if (description.toLowerCase().includes("fix") || description.toLowerCase().includes("bug")) {
      prefix = "fix";
    } else if (description.toLowerCase().includes("docs")) {
      prefix = "docs";
    }
    
    const branch = `${prefix}/${branchSlug}`;

    return NextResponse.json({
      commit: parsed.commit,
      branch: branch,
      projectName: parsed.projectName,
      tagline: parsed.tagline
    });

  } catch (error: any) {
    console.error("Generate everything error:", error);
    return NextResponse.json(
      { error: "Failed to generate outputs" },
      { status: 500 }
    );
  }
}
