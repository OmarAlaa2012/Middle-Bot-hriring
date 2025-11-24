import { GoogleGenAI } from "@google/genai";
import { TradeConfig } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateBotProtocol = async (config: TradeConfig): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        You are an automated trading bot named "MiddleMan1552" for the game "${config.game}".
        
        The trade details are: "${config.description}".
        
        Generate a short, robotic, and secure "Initialization Protocol" message.
        It should:
        1. Acknowledge the specific trade details briefly.
        2. Instruct the user (Username: ${config.username}) to add "MiddleMan1552" as a friend immediately.
        3. State that you are joining the server now.
        4. Include a fake hexadecimal "Secure Trade Hash" at the end.
        
        Keep it under 60 words. Use technical/hacker jargon but be clear.
      `,
    });
    return response.text || "PROTOCOL ERROR: UNABLE TO GENERATE MESSAGE. PROCEED MANUALLY.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "SYSTEM ALERT: NEURAL LINK FAILED. CONNECTING VIA BACKUP PROTOCOL... PLEASE ADD MiddleMan1552 MANUALLY.";
  }
};
