import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // MOCK RESPONSE FOR TESTING - Remove this after enabling billing
    const mockResponse = {
      title: "Tech Meetup: React 19 Deep Dive",
      description: "Join us for an in-depth exploration of React 19 features including new Actions API and improved hooks. Perfect for developers looking to master the latest React capabilities.",
      category: "tech",
      suggestedCapacity: 100,
      suggestedTicketType: "free"
    };

    // TODO: Remove mock and enable real API after billing is set up
    if (process.env.USE_MOCK_AI === "true") {
      return NextResponse.json(mockResponse);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemPrompt = `You are an event planning assistant. Generate event details based on the user's description.

CRITICAL: Return ONLY valid JSON with properly escaped strings. No newlines in string values - use spaces instead.

Return this exact JSON structure:
{
  "title": "Event title (catchy and professional, single line)",
  "description": "Detailed event description in a single paragraph. Use spaces instead of line breaks. Make it 2-3 sentences describing what attendees will learn and experience.",
  "category": "One of: tech, music, sports, art, food, business, health, education, gaming, networking, outdoor, community",
  "suggestedCapacity": 50,
  "suggestedTicketType": "free"
}

User's event idea: ${prompt}

Rules:
- Return ONLY the JSON object, no markdown, no explanation
- All string values must be on a single line with no line breaks
- Use spaces instead of \\n or line breaks in description
- Make title catchy and under 80 characters
- Description should be 2-3 sentences, informative, single paragraph
- suggestedTicketType should be either "free" or "paid"
`;

    const result = await model.generateContent(systemPrompt);

    const response = await result.response;
    const text = response.text();

    // Clean the response (remove markdown code blocks if present)
    let cleanedText = text.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "");
    } else if (cleanedText.startsWith("```")) {
      cleanedText = cleanedText.replace(/```\n?/g, "");
    }

    console.log(cleanedText);

    const eventData = JSON.parse(cleanedText);

    return NextResponse.json(eventData);
  } catch (error) {
    console.error("Error generating event:", error);
    
    // Handle quota exceeded errors
    if (error.status === 429) {
      return NextResponse.json(
        { error: "API quota exceeded. Please try again later or upgrade your plan." },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { error: `Failed to generate event: ${error.message}` },
      { status: 500 }
    );
  }
}