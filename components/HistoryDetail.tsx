import React from 'react';
import { AnalysisHistoryItem } from '../types';
import AnalysisResult from './AnalysisResult';

interface HistoryDetailProps {
  historyItem: AnalysisHistoryItem;
  onBack: () => void;
}

const HistoryDetail: React.FC<HistoryDetailProps> = ({ historyItem, onBack }) => {
  return (
    <div className="flex-1 flex flex-col pt-4 pb-20 px-4">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2"
          aria-label="العودة إلى السجل"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          <span className="font-semibold text-lg">العودة إلى السجل</span>
        </button>
        <h1 className="text-3xl md:text-4xl font-extrabold text-blue-800 flex-grow text-center">
          تفاصيل التحليل
        </h1>
        <div className="w-1/4"></div> {/* Placeholder for alignment */}
      </div>

      <div className="flex flex-col gap-4 mb-8 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-gray-800">المدخلات:</h2>
        {historyItem.inputType === 'image' && historyItem.inputImageBase64 ? (
          <img
            src={`data:${historyItem.inputImageMimeType || 'image/jpeg'};base64,${historyItem.inputImageBase64}`}
            alt="Input product for analysis"
            className="max-h-60 object-contain rounded-md shadow-sm"
          />
        ) : (
          <p className="text-gray-700">المكونات المدخلة: <span className="font-medium">{historyItem.inputText || 'لا يوجد نص'}</span></p>
        )}
        <p className="text-sm text-gray-500">تم التحليل: {new Date(historyItem.timestamp).toLocaleString('ar-EG')}</p>
      </div>

      <AnalysisResult results={historyItem.fullAnalysisResults} error={null} />
    </div>
  );
};

export default HistoryDetail;