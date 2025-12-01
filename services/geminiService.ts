import { GoogleGenAI, Chat } from "@google/genai";
import { SERVICES } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the helpful AI expert for Burrell & Co. Mobile Detailing.
Your goal is to assist customers in choosing the right car detailing package, answer questions about our process, and provide rough estimates.

HERE IS OUR DETAILED SERVICE MENU:
${SERVICES.map(s => `
PACKAGE: ${s.title}
PRICE: ${s.pricingDetails || '$' + s.price}
DURATION: ${s.duration}
DESCRIPTION: ${s.description}
KEY FEATURES:
${s.features.map(f => `- ${f}`).join('\n')}
`).join('\n-------------------\n')}

VEHICLE PROFILING & RECOMMENDATION ENGINE:
When a user provides their vehicle Make/Model or situation, use this logic:

1. LUXURY/EXOTIC (e.g., Porsche, Ferrari, high-end Mercedes/BMW):
   - Emphasize "Paint Correction", "Ceramic Safe Washes", and "Delicate Leather Care".
   - Recommended Service: Full Exterior Detail (for paint protection) or Full Interior (for delicate materials).

2. FAMILY HAULERS (e.g., Minivans, Large SUVs, "Kids", "Dogs"):
   - Emphasize "Stain Removal", "Sanitization", "Pet Hair Removal".
   - Recommended Service: Full Interior Detail (crucial for crumbs/spills).
   - Note: Mention SUV pricing ($200+ for interior).

3. DAILY COMMUTERS (e.g., Civic, Corolla, Model 3):
   - Emphasize "Maintenance", "Protection from Elements", "Resale Value".
   - Recommended Service: Maintenance Wash (regular upkeep) or Full Exterior (seasonal protection).

4. WORK TRUCKS:
   - Emphasize "Mud Removal", "Heavy Duty Vacuum", "Undocarriage wash" (if applicable).
   - Recommended Service: Full Interior (for dust/dirt) + Exterior.

5. ENGINE BAY QUERIES:
   - If they mention "oil leak", "selling car", or "dirty engine", recommend Engine Bay Cleaning.

Rules:
1. Be polite, professional, and concise.
2. INTELLIGENT MATCHING: Listen for specific vehicle conditions and match them to features.
3. Do NOT invent prices. Use the provided menu. Note that prices depend on vehicle size (Sedan vs SUV/Truck).
4. Emphasize that we are a MOBILE service - we come to their home or office.
5. If asked about booking, direct them to the "Booking" page or tell them to click the "Book Now" button.
6. Keep responses under 100 words unless detailed explanation is requested.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    if (!apiKey) {
      throw new Error("Missing API Key");
    }
    const session = getChatSession();
    const response = await session.sendMessage({ message });
    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);

    // Fallback Simulation for Demo Purposes
    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('how much')) {
      return "Our pricing depends on your vehicle size. Maintenance washes start at $65 for sedans, while Full Interior Details start at $180. Would you like a specific quote for your car?";
    }
    if (lowerMsg.includes('interior')) {
      return "Our Full Interior Detail is perfect for refreshing your cabin. It includes deep cleaning of seats, carpets, and all surfaces. Prices start at $180 for sedans.";
    }
    if (lowerMsg.includes('exterior') || lowerMsg.includes('wash')) {
      return "We offer a Maintenance Wash starting at $65 and a Full Exterior Detail starting at $250 which includes clay bar treatment and sealant.";
    }
    if (lowerMsg.includes('book') || lowerMsg.includes('appointment')) {
      return "You can book directly through our website! Just click the 'Book Now' button at the top or bottom of the screen.";
    }

    return "I'm currently operating in offline mode. I can help you with general questions about our services like Interior, Exterior, or Maintenance washes. How can I help?";
  }
};