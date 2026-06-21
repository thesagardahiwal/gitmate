import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API) {
  console.warn("GEMINI_API_KEY is not defined in environment variables. API calls will fail.");
}
console.log("ENV: " + process.env.GEMINI_API);
// Initialize the Google Generative AI client
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "");

// We use the flash model for fast text generation
export const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
