import { GoogleGenAI } from "@google/genai";
import { Topic, SubTopic } from '../types';

let genAI: GoogleGenAI | null = null;

export const initializeGemini = (apiKey: string) => {
    genAI = new GoogleGenAI({ apiKey });
};

export const generateTutorResponse = async (
    currentTopic: Topic,
    subTopic: SubTopic | undefined,
    userMessage: string,
    history: { role: string; text: string }[]
): Promise<string> => {
    if (!genAI) {
        throw new Error("API Key not set");
    }

    const context = `
    You are an expert Calculus 2 Tutor named "Profe Maty" (based on the summary author).
    You are teaching a student from Universidad de Concepción (UdeC), Facultad de Ingeniería.
    
    Current Topic: ${currentTopic.title}
    ${subTopic ? `Current Subtopic: ${subTopic.title} - ${subTopic.content}` : ''}
    
    Key Context from course notes:
    ${currentTopic.subtopics.map(s => `- ${s.title}: ${s.formulas?.join(', ')}`).join('\n')}
    
    TIPS TO EMPHASIZE:
    ${currentTopic.tips.join('\n')}

    Your Goal:
    1. Answer the student's question step-by-step.
    2. If they ask for an exercise, generate a relevant problem for this topic and solve it partially, asking them to try the next step, OR solve it fully if they ask for the solution.
    3. Use clear, encouraging language.
    4. **FORMATTING IMPORTANT**: Use **LaTeX** for ALL mathematical expressions.
       - Use single dollar signs for inline math, e.g., $x^2$, $\\int f(x) dx$.
       - Use double dollar signs for block math equations, e.g., $$ \\int_a^b x^2 dx $$
       - Do NOT use markdown code blocks for math.
       - Ensure your LaTeX syntax is valid.
    5. Be helpful and reference the "tips" provided.
    6. If the user sends a greeting, introduce yourself as the AI tutor based on Matias Figueroa's summary.
    `;

    try {
        const model = "gemini-2.5-flash";
        
        // Convert history to Gemini format, but keeps it simple for this stateless call wrapper
        // In a real production app we would use chat sessions.
        // For this single-file constraint, we concatenate a bit of history to the prompt.
        
        const recentHistory = history.slice(-5).map(h => `${h.role === 'user' ? 'Student' : 'Tutor'}: ${h.text}`).join('\n');
        
        const fullPrompt = `${context}\n\nRecent Conversation:\n${recentHistory}\n\nStudent: ${userMessage}\n\nTutor:`;

        const response = await genAI.models.generateContent({
            model: model,
            contents: fullPrompt,
            config: {
                maxOutputTokens: 1500,
                temperature: 0.7
            }
        });

        return response.text || "Lo siento, no pude generar una respuesta. Intenta de nuevo.";
    } catch (error) {
        console.error("Gemini Error:", error);
        throw new Error("Error connecting to the AI Tutor.");
    }
};