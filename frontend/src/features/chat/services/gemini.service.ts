
import { GoogleGenAI, Type } from "@google/genai";
import { Message, Source } from "../types";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';


export const generateDocGroundedResponse = async (
    query: string,
    history: Message[]
): Promise<{ content: string; sources: Source[] }> => {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const systemInstruction = `
        You are "CirrusDocs AI", a world-class Library Oracle. 
        Your mission is to provide answers ONLY based on the provided documents.
        Even though this is a demo environment, act as if you have access to a repository of 15 high-value corporate documents.
        
        For every response, you MUST provide exactly 1-3 highly relevant "sources" that back up your answer.
        The response MUST be a JSON object with:
        1. "content": A markdown-formatted string providing the answer.
        2. "sources": An array of objects, each with "id", "title" (e.g. 'Project_Genesis.pdf'), and "snippet" (a brief text quote from the doc).

        Simulate these document titles if necessary:
        - Q3_Financial_Projections.pdf
        - Employee_Handbook_2024.v2
        - Project_Aurora_Technical_Spec.docx
        - Marketing_Strategy_Q4.pdf
        - Legal_Compliance_Audit_Final.pdf
    `;

    try {
        const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            { role: 'user', parts: [{ text: query }] }
        ],
        config: {
            systemInstruction,
            responseMimeType: "application/json",
            responseSchema: {
            type: Type.OBJECT,
            properties: {
                content: { type: Type.STRING },
                sources: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    snippet: { type: Type.STRING }
                    },
                    required: ["id", "title", "snippet"]
                }
                }
            },
            required: ["content", "sources"]
            }
        }
        });

        const result = JSON.parse(response.text || '{}');
        return {
        content: result.content || "I'm sorry, I couldn't process that based on your documents.",
        sources: result.sources || []
        };
    } catch (error) {
        console.error("Gemini Error:", error);
        return {
        content: "An error occurred while consulting the oracle. Please try again.",
        sources: []
        };
    }
};
