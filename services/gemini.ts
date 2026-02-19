import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateProductInsight = async (productName: string, description: string, query: string) => {
  if (!ai) return "AI services are currently unavailable. Please check your API configuration.";
  
  try {
    const model = 'gemini-3-flash-preview';
    const prompt = `
      You are a helpful shopping assistant for an e-commerce store called Lumina.
      The user is looking at a product named "${productName}".
      Product Description: "${description}".
      
      The user asks: "${query}"
      
      Provide a concise, helpful, and friendly answer (max 3 sentences) based on the product details provided. 
      If the answer isn't in the description, use your general knowledge about this type of product to be helpful, 
      but mention that specific details might vary.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the brain right now. Please try again later.";
  }
};
