export interface IngredientAnalysisResult {
  ingredientName: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Informational';
  warnings: string[];
  details: string;
}

export type Page = 'home' | 'ingredientAnalysis' | 'history' | 'historyDetail' | 'ingredientGuide';
export type AnalysisInputType = 'text' | 'image';

export interface AnalysisHistoryItem {
  id: string;
  timestamp: number; // Unix timestamp
  inputType: AnalysisInputType;
  inputText?: string; // Present if inputType is 'text'
  inputImageBase64?: string; // Present if inputType is 'image'
  inputImageMimeType?: string; // Mime type of the image
  analysisSummary: string; // A concise summary of the analysis result
  fullAnalysisResults: IngredientAnalysisResult[] | null;
}

export interface GuideIngredient {
  id: string;
  name: string;
  eNumber?: string; // Optional E-number for additives
  description: string;
  usage: string;
  potentialRisks: string[];
  isHalal: boolean;
}

export interface AppState {
  ingredientsInput: string;
  analysisResults: IngredientAnalysisResult[] | null;
  loading: boolean;
  error: string | null;
}