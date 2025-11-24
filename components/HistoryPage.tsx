import React from 'react';
import { AnalysisHistoryItem } from '../types';
import HistoryCard from './HistoryCard';

interface HistoryPageProps {
  analysisHistory: AnalysisHistoryItem[];
  onBack: () => void;
  onViewDetails: (item: AnalysisHistoryItem) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ analysisHistory, onBack, onViewDetails }) => {
  return (
    <div className="flex-1 flex flex-col pt-4 pb-20 px-4">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2"
          aria-label="العودة إلى الرئيسية"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          <span className="font-semibold text-lg">العودة للرئيسية</span>
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 flex-grow text-center flex items-center justify-center">
          سجل التحليلات
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-2 text-yellow-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.079 0-2.157.17-3.206.513m15.717 10.384c.195.271.52.366.844.249l.2-.092a2.25 2.25 0 00.901-.977c.373-.797.067-1.75-.659-2.372M12 6.042V12m0 0L9.525 7.375M12 12l4.44-4.75M12 12h8.25V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6.75m18 0h-3.5" />
          </svg>
        </h1>
        <div className="w-1/4"></div> {/* Placeholder for alignment */}
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        {analysisHistory.length === 0 ? (
          <div className="text-center text-gray-600 text-lg py-10">
            <p>لا يوجد سجل تحليلات حتى الآن.</p>
            <p>ابدأ بتحليل منتج لعرض نتائجه هنا!</p>
          </div>
        ) : (
          analysisHistory.map(item => (
            <HistoryCard key={item.id} item={item} onViewDetails={onViewDetails} />
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;