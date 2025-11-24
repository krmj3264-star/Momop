import React from 'react';
import { AnalysisHistoryItem } from '../types';
import { formatTimeAgo } from '../utils/timeUtils';

interface HistoryCardProps {
  item: AnalysisHistoryItem;
  onViewDetails: (item: AnalysisHistoryItem) => void;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ item, onViewDetails }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        {item.inputType === 'image' && item.inputImageBase64 ? (
          <img
            src={`data:${item.inputImageMimeType || 'image/jpeg'};base64,${item.inputImageBase64}`}
            alt="Input product"
            className="w-24 h-24 object-cover rounded-md shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center text-gray-500 text-sm p-2 text-center">
            {item.inputText ? item.inputText.substring(0, 50) + '...' : 'لا توجد صورة أو نص'}
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm text-gray-500 mb-1">{formatTimeAgo(item.timestamp)}</p>
          <h3 className="text-xl font-bold text-gray-800">نتيجة التحليل</h3>
          <p className="text-gray-700 mt-2 text-base leading-relaxed">{item.analysisSummary}</p>
        </div>
      </div>

      <button
        onClick={() => onViewDetails(item)}
        className="mt-4 self-end px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200"
        aria-label={`عرض التفاصيل الكاملة لتحليل ${item.id}`}
      >
        عرض التفاصيل الكاملة
      </button>
    </div>
  );
};

export default HistoryCard;