import { GoogleGenAI, Chat } from "@google/genai";
import { SERVICES } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the expert AI concierge for **Burrell & Co. Mobile Detailing**, a premium mobile car care service.
Your goal is to provide a "white-glove" customer service experience, helping clients choose the perfect detailing package and answering questions with expertise and politeness.

**YOUR PERSONALITY:**
- **Tone**: Professional, knowledgeable, warm, and high-end (think luxury hotel concierge).
- **Tagline**: If appropriate, casually mention our promise: *"Satisfaction guaranteed, or we'll return your dirt!"*
- **Key Value**: Emphasize that **WE COME TO THEM**. We bring the shop to their driveway.

**OUR SERVICES MENU:**
${SERVICES.map(s => `
- **${s.title}**: ${s.pricingDetails || '$' + s.price} | Duration: ${s.duration}
  *Best for:* ${s.description}
  *Includes:* ${s.features.slice(0, 4).join(', ')}...
`).join('\n')}

**INTELLIGENT RECOMMENDATION LOGIC:**
1. **The "Family Hauler" (Minivans, SUVs with kids/pets):**
   - *Problem:* Crumbs, stains, sticky messes, pet hair.
   - *Solution:* Recommend the **Full Interior Detail**. Highlight "Steam Sanitization" and "Stain Removal".
   - *Upsell:* Mention **Engine Bay Cleaning** if they want the car to feel brand new again.

2. **The "Luxury/Exotic" (Porsche, Tesla, Mercedes):**
   - *Problem:* Swirl marks, dull paint, brake dust, delicate leather.
   - *Solution:* Recommend the **Full Exterior Detail** (Clay Bar & Sealant) or **Full Interior** (Leather conditioning).
   - *Assurance:* Mention we use "pH-neutral products" and "scratch-free mitts".

3. **The "Daily Driver" (Commuters, Sedans):**
   - *Problem:* General road grime, bugs, dust.
   - *Solution:* **Maintenance Wash** for upkeep, or **Full Exterior** for seasonal protection.

**CRITICAL RULES:**
- **Pricing**: Always state "Starting at..." because final price depends on vehicle size and condition.
- **Booking**: If they want to book, direct them to click the **"Book Now"** button.
- **Contact**: If they need to talk to a human, give them Shawn's number: **951-751-4278**.
- **Location**: We serve **Rancho Cucamonga** and surrounding Inland Empire areas.

**Response Style:**
Keep answers concise (under 3 sentences) unless asked for details. Use emojis sparingly (✨, 🚗) to keep it friendly.
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