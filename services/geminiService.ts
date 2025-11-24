import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { IngredientAnalysisResult } from "../types";

const MODEL_NAME = "gemini-2.5-flash"; // Using flash for quicker responses, sufficient for text analysis.

/**
 * Encodes a Uint8Array to a base64 string.
 * This is a utility function typically used for audio or image data,
 * but included for completeness if needed elsewhere.
 */
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Decodes a base64 string to a Uint8Array.
 * This is a utility function typically used for audio or image data,
 * but included for completeness if needed elsewhere.
 */
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Analyzes a list of food ingredients using the Gemini API, now supporting text and image input.
 *
 * @param input An object that can contain `text` (a string of ingredients) or `image` (base64 data and mimeType).
 * @returns A promise that resolves to an array of IngredientAnalysisResult.
 */
export const analyzeIngredients = async (input: { text?: string, image?: { data: string, mimeType: string } }): Promise<IngredientAnalysisResult[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not set. Please ensure it's configured correctly.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `أنت مساعد خبير في سلامة الأغذية والتغذية. مهمتك هي تحليل المكونات الغذائية. سيقدم المستخدم إما قائمة بالمكونات كنص أو صورة تحتوي على مكونات (مثل ملصق المنتج).

**يجب أن تكون جميع مخرجاتك النصية باللغة العربية فقط.**

إذا تم توفير صورة، قم أولاً باستخراج جميع المكونات المميزة من الصورة. ثم، لكل مكون محدد (سواء من النص أو الصورة)، حدد مخاطره المحتملة، والحساسية الشائعة المرتبطة به، وأي تحذيرات عامة أو اعتبارات للاستهلاك.

استجب **فقط** بمصفوفة JSON حيث يمثل كل كائن في المصفوفة مكونًا وتحليله. يجب أن يحتوي كل كائن على الخصائص التالية:
- 'ingredientName': (سلسلة نصية) الاسم الدقيق للمكون كما تم توفيره أو اسم شائع معروف. يجب أن يكون هذا باللغة العربية.
- 'riskLevel': (سلسلة نصية) صنف مستوى الخطر كـ "Low" أو "Medium" أو "High" أو "Informational". (ملاحظة: هذه القيم بالإنجليزية لسهولة المعالجة في الواجهة الأمامية.)
- 'warnings': (مصفوفة من سلاسل نصية) قائمة بالتحذيرات المحددة أو الحساسيات أو المخاوف المتعلقة بهذا المكون. كن موجزًا وقابلًا للتنفيذ. يجب أن تكون هذه باللغة العربية.
- 'details': (سلسلة نصية) شرح موجز لسبب وجود المخاطر أو التحذيرات المحددة لهذا المكون. يجب أن تكون هذه باللغة العربية.

إذا كان المكون آمنًا بشكل عام ويستخدم عادة، يمكنك ذكر غرضه (مثل "مستحلب") في 'details' وتعيين 'riskLevel' على أنه "Informational" أو "Low" بدون تحذيرات. إذا لم يتم العثور على مخاطر كبيرة، يمكن أن تكون مصفوفة 'warnings' فارغة.`;

  const contents: Array<any> = [];

  if (input.image) {
    contents.push({
      inlineData: {
        mimeType: input.image.mimeType,
        data: input.image.data,
      },
    });
    // Add a text part to explicitly ask to analyze ingredients in the image
    contents.push({
      text: "استخرج وحلل جميع المكونات الغذائية الظاهرة في هذه الصورة، ثم قم بتحليل كل مكون بناءً على إرشادات النظام.",
    });
  }

  if (input.text && input.text.trim() !== '') {
    // If both image and text are provided, combine the prompt
    if (input.image) {
      // Replaced `contents.at(-1)` with `contents[contents.length - 1]` for broader compatibility.
      contents[contents.length - 1].text = `بالإضافة إلى المكونات الموجودة في الصورة، يرجى تحليل المكونات التالية أيضاً: ${input.text}. ثم قم بتحليل كل مكون بناءً على إرشادات النظام.`;
    } else {
      contents.push({ text: `حلل المكونات التالية: ${input.text}` });
    }
  }

  // Ensure there's at least a default instruction if no specific input type prompt was added
  if (contents.length === 0) {
    throw new Error("No input (text or image) provided for analysis.");
  }

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              ingredientName: { type: Type.STRING },
              riskLevel: {
                type: Type.STRING,
                enum: ["Low", "Medium", "High", "Informational"],
              },
              warnings: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              details: { type: Type.STRING },
            },
            required: ["ingredientName", "riskLevel", "warnings", "details"],
            propertyOrdering: ["ingredientName", "riskLevel", "warnings", "details"],
          },
        },
      },
    });

    const jsonString = response.text.trim();
    // Validate if the response is actually JSON before parsing
    if (!jsonString.startsWith('[') && !jsonString.startsWith('{')) {
      throw new Error('Gemini API did not return a valid JSON response.');
    }

    const parsedResults: IngredientAnalysisResult[] = JSON.parse(jsonString);
    return parsedResults;

  } catch (error) {
    console.error("Error analyzing ingredients with Gemini API:", error);
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse AI response as JSON. The AI might have provided an invalid format. Response received: " + (error as any).message);
    }
    throw new Error(`Failed to analyze ingredients: ${(error as Error).message}`);
  }
};