/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

let chatSession: Chat | null = null;

export const initializeChat = (): Chat => {
  if (chatSession) return chatSession;

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are 'VITTIN BOT', the AI assistant for the VITTIN YouTube channel.
      
      The channel covers: Mechanical & Civil Engineering, Paleontology, Geochronology, Astronomy, and Technology.
      Style: "Roots & Tech".
      Tone: Curious, precise, scientific but accessible, slightly enthusiastic about engineering feats and dinosaurs.
      
      Key Colors to mention if asked about branding: Deep Green (#264039), Orange (#f29849).
      
      Role: Answer questions about science, engineering, or the channel's latest series.
      
      Keep responses concise (max 2-3 sentences). Use emojis like 🦕, 🚀, ⚙️, 🌌.`,
    },
  });

  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "Módulo de comunicação offline. (Chave API ausente)";
  }

  try {
    const chat = initializeChat();
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text || "Interferência atmosférica detectada.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Erro nos propulsores de dados. Tente novamente.";
  }
};