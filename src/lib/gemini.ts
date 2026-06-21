import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API) {
  console.warn("GEMINI_API_KEY is not defined in environment variables. API calls will fail.");
}
/**
 * Singleton instance of the Google Generative AI client.
 * Initialized using the GEMINI_API environment variable.
 */
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API || "");

/**
 * Pre-configured Gemini generative model utilizing the flash variant.
 * Optimized for high-speed text generation tasks.
 */
export const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
