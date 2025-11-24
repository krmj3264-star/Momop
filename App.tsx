import React, { useState, useCallback, useEffect } from 'react';
import AnalysisInput from './components/AnalysisInput';
import AnalysisResult from './components/AnalysisResult';
import { analyzeIngredients } from './services/geminiService';
import { AppState, IngredientAnalysisResult, Page, AnalysisInputType, AnalysisHistoryItem } from './types';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ActionCardsGrid from './components/ActionCardsGrid';
import BottomNavBar from './components/BottomNavBar';
import HistoryPage from './components/HistoryPage';
import HistoryDetail from './components/HistoryDetail';
import IngredientGuidePage from './components/IngredientGuidePage';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [analysisInputType, setAnalysisInputType] = useState<AnalysisInputType>('text');
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const [analysisState, setAnalysisState] = useState<AppState>({
    ingredientsInput: '',
    analysisResults: null,
    loading: false,
    error: null,
  });

  const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistoryItem[]>(() => {
    try {
      const savedHistory = localStorage.getItem('analysisHistory');
      return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
      console.error("Failed to parse history from localStorage", error);
      return [];
    }
  });
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<AnalysisHistoryItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('analysisHistory', JSON.stringify(analysisHistory));
    } catch (error) {
      console.error("Failed to save history to localStorage", error);
    }
  }, [analysisHistory]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnalysisState(prevState => ({ ...prevState, ingredientsInput: e.target.value, error: null }));
  }, []);

  const handleImageSelect = useCallback(async (file: File | null) => {
    setSelectedImageFile(file);
    setAnalysisState(prevState => ({ ...prevState, error: null }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setBase64Image(reader.result.split(',')[1]); // Extract base64 part
        }
      };
      reader.readAsDataURL(file);
    } else {
      setBase64Image(null);
    }
  }, []);

  const handleBase64ImageCapture = useCallback((base64: string, mimeType: string) => {
    setBase64Image(base64);
    setAnalysisState(prevState => ({ ...prevState, error: null }));
  }, []);

  const generateAnalysisSummary = (results: IngredientAnalysisResult[]): string => {
    if (!results || results.length === 0) {
      return 'لم يتم العثور على تحليل للمكونات المدخلة.';
    }
    const highRiskCount = results.filter(item => item.riskLevel === 'High').length;
    const mediumRiskCount = results.filter(item => item.riskLevel === 'Medium').length;

    if (highRiskCount > 0) {
      return `يحتوي على ${highRiskCount} مكونات ذات خطر مرتفع.`;
    }
    if (mediumRiskCount > 0) {
      return `يحتوي على ${mediumRiskCount} مكونات ذات خطر متوسط.`;
    }
    return `تحليل ناجح لـ ${results.length} مكونات، لا توجد مخاطر عالية.`;
  };

  const saveAnalysisToHistory = useCallback((
    input: { text?: string, image?: { data: string, mimeType: string } },
    results: IngredientAnalysisResult[]
  ) => {
    const newHistoryItem: AnalysisHistoryItem = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      inputType: input.image ? 'image' : 'text',
      inputText: input.text,
      inputImageBase64: input.image?.data,
      inputImageMimeType: input.image?.mimeType,
      analysisSummary: generateAnalysisSummary(results),
      fullAnalysisResults: results,
    };
    setAnalysisHistory(prevHistory => [newHistoryItem, ...prevHistory]);
  }, [setAnalysisHistory]);


  const handleSubmit = useCallback(async () => {
    setAnalysisState(prevState => ({ ...prevState, loading: true, error: null, analysisResults: null }));

    try {
      let results: IngredientAnalysisResult[];
      let inputData: { text?: string, image?: { data: string, mimeType: string } } = {};

      if (analysisInputType === 'text') {
        if (analysisState.ingredientsInput.trim() === '') {
          throw new Error('الرجاء إدخال بعض المكونات لتحليلها.');
        }
        inputData.text = analysisState.ingredientsInput;
        results = await analyzeIngredients({ text: analysisState.ingredientsInput });
      } else { // image input type
        if (!base64Image) {
          throw new Error('الرجاء تحديد صورة أو التقاط واحدة لتحليلها.');
        }
        const mimeType = selectedImageFile?.type || 'image/jpeg';
        inputData.image = { data: base64Image, mimeType: mimeType };
        results = await analyzeIngredients({ image: { data: base64Image, mimeType: mimeType } });
      }

      setAnalysisState(prevState => ({ ...prevState, analysisResults: results, loading: false }));
      saveAnalysisToHistory(inputData, results);

    } catch (err) {
      console.error("Analysis failed:", err);
      setAnalysisState(prevState => ({
        ...prevState,
        error: (err as Error).message || 'حدث خطأ غير متوقع أثناء التحليل. يرجى المحاولة مرة أخرى.',
        loading: false,
      }));
    }
  }, [analysisState.ingredientsInput, analysisInputType, base64Image, selectedImageFile, saveAnalysisToHistory]);

  const navigateToHome = useCallback(() => {
    setCurrentPage('home');
    setAnalysisInputType('text'); // Reset to default text input when going home
    setAnalysisState(prevState => ({ ...prevState, analysisResults: null, error: null }));
    setSelectedImageFile(null);
    setBase64Image(null);
    setSelectedHistoryItem(null); // Clear selected history item
  }, []);

  const navigateToAnalysis = useCallback((type: AnalysisInputType) => {
    setCurrentPage('ingredientAnalysis');
    setAnalysisInputType(type);
    setAnalysisState({
      ingredientsInput: '',
      analysisResults: null,
      loading: false,
      error: null,
    });
    setSelectedImageFile(null);
    setBase64Image(null);
  }, []);

  const navigateToHistoryPage = useCallback(() => {
    setCurrentPage('history');
  }, []);

  const navigateToHistoryDetail = useCallback((item: AnalysisHistoryItem) => {
    setSelectedHistoryItem(item);
    setCurrentPage('historyDetail');
  }, []);

  const navigateToIngredientGuide = useCallback(() => {
    setCurrentPage('ingredientGuide');
  }, []);

  const handleBackToTextMode = useCallback(() => {
    setAnalysisInputType('text');
    setSelectedImageFile(null);
    setBase64Image(null);
    setAnalysisState(prevState => ({ ...prevState, ingredientsInput: '', error: null }));
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Header />
            <main className="flex-1 overflow-y-auto pb-20">
              <SearchBar />
              <ActionCardsGrid
                onTextAnalyzeClick={() => navigateToAnalysis('text')}
                onImageAnalyzeClick={() => navigateToAnalysis('image')}
                onHistoryClick={navigateToHistoryPage}
                onGuideClick={navigateToIngredientGuide}
              />
            </main>
            <BottomNavBar onAnalyzeClick={() => navigateToAnalysis('text')} onHomeClick={navigateToHome} />
          </>
        );
      case 'ingredientAnalysis':
        return (
          <div className="flex-1 flex flex-col pt-4 pb-20 px-4">
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={navigateToHome}
                className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2"
                aria-label="العودة إلى الرئيسية"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <span className="font-semibold text-lg">العودة للرئيسية</span>
              </button>
              <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 flex-grow text-center">
                تحليل مكونات المنتجات الغذائية
              </h1>
              <div className="w-1/4"></div>
            </div>
            <AnalysisInput
              textValue={analysisState.ingredientsInput}
              onTextChange={handleTextChange}
              onSubmit={handleSubmit}
              loading={analysisState.loading}
              inputType={analysisInputType}
              onImageSelect={handleImageSelect}
              onBase64ImageCapture={handleBase64ImageCapture}
              selectedImage={base64Image}
              onBackToTextMode={handleBackToTextMode}
            />
            <AnalysisResult results={analysisState.analysisResults} error={analysisState.error} />
          </div>
        );
      case 'history':
        return (
          <HistoryPage
            analysisHistory={analysisHistory}
            onBack={navigateToHome}
            onViewDetails={navigateToHistoryDetail}
          />
        );
      case 'historyDetail':
        return selectedHistoryItem ? (
          <HistoryDetail
            historyItem={selectedHistoryItem}
            onBack={navigateToHistoryPage}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-700">
            <p>لم يتم تحديد عنصر في السجل.</p>
            <button onClick={navigateToHistoryPage} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
              العودة إلى السجل
            </button>
          </div>
        );
      case 'ingredientGuide':
        return <IngredientGuidePage onBack={navigateToHome} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {renderContent()}
    </div>
  );
}

export default App;