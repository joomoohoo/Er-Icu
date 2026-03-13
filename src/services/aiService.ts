import { GoogleGenAI } from "@google/genai";

export const generateAIResponseStream = async (
  prompt: string, 
  lang: 'en' | 'ar', 
  onChunk: (text: string) => void
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
    const model = "gemini-3-flash-preview";
    
    const systemInstruction = lang === 'en' 
      ? "You are a professional ER and ICU medical assistant. Provide concise, evidence-based information. Use bullet points for clarity. Always include a disclaimer. Respond in English."
      : "أنت مساعد طبي محترف في قسم الطوارئ والعناية المركزة. قدم معلومات موجزة ومستندة إلى الأدلة. استخدم النقاط للتوضيح. قم دائمًا بتضمين إخلاء مسؤولية. أجب باللغة العربية.";

    const responseStream = await ai.models.generateContentStream({
      model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
      },
    });

    let fullText = "";
    for await (const chunk of responseStream) {
      const chunkText = chunk.text;
      if (chunkText) {
        fullText += chunkText;
        onChunk(fullText);
      }
    }

    return fullText;
  } catch (error) {
    console.error("AI Error:", error);
    const errorMsg = lang === 'en' ? "Error connecting to AI service." : "خطأ في الاتصال بخدمة الذكاء الاصطناعي.";
    onChunk(errorMsg);
    return errorMsg;
  }
};
