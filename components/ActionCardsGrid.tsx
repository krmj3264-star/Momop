import React from 'react';
import ActionCard from './ActionCard';

interface ActionCardsGridProps {
  onTextAnalyzeClick: () => void;
  onImageAnalyzeClick: () => void;
  onHistoryClick: () => void; // New prop for history navigation
  onGuideClick: () => void;   // New prop for ingredient guide navigation
}

const ActionCardsGrid: React.FC<ActionCardsGridProps> = ({ onTextAnalyzeClick, onImageAnalyzeClick, onHistoryClick, onGuideClick }) => {
  const handleFeatureComingSoon = (featureName: string) => {
    alert(`${featureName} قريباً!`);
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4 mt-6">
      {/* Moved and renamed Image Analysis Card to first position */}
      <ActionCard
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175m0 0a2.283 2.283 0 01-.653 1.108 2.283 2.283 0 01-.653 1.108M18.683 2.25h2.42c.712 0 1.05.894.555 1.488l-2.008 2.368M12 12v3M9 12l.75-2.25h4.5l.75 2.25M7.5 12h9m-9 0c0-1.57.96-2.903 2.308-3.424M17.859 10.932a2.25 2.25 0 00-2.404-1.134L15.3 9.776m-1.378-2.651a1.5 1.5 0 10-2.613-1.619 1.5 1.5 0 002.613 1.62zm-1.316 2.454a1.875 1.875 0 01-3.75 0M9.548 6.096A1.875 1.875 0 007.5 7.5a1.875 1.875 0 00-2.048-1.384M19.014 6H21m-2.25 3h.008v.008H18.75V9zm-3.75 6.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 17.25h.008v.008H12v-.008z" />
          </svg>
        } // Camera icon
        title="تحليل"
        bgColor="bg-purple-100"
        onClick={onImageAnalyzeClick}
        ariaLabel="تحليل المكونات عبر الكاميرا أو رفع صورة"
      />

      {/* Existing Text Analysis Card (second position) */}
      <ActionCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.5h16.5m-16.5 2.25h16.5m-16.5 2.25h16.5M3.75 11.25h16.5m-16.5 2.25h16.5m-16.5 2.25h16.5m-16.5 2.25h16.5M3.75 20.25h16.5" />
          </svg>
        } // Scan/List icon (representing analysis)
        title="تحليل المكونات"
        bgColor="bg-blue-100"
        onClick={onTextAnalyzeClick}
        ariaLabel="تحليل المكونات"
      />

      {/* Existing History Card (third position), now linked to onHistoryClick */}
      <ActionCard
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.079 0-2.157.17-3.206.513m15.717 10.384c.195.271.52.366.844.249l.2-.092a2.25 2.25 0 00.901-.977c.373-.797.067-1.75-.659-2.372M12 6.042V12m0 0L9.525 7.375M12 12l4.44-4.75M12 12h8.25V18a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18V6.75m18 0h-3.5" />
          </svg>
        } // Book/bookmark icon
        title="السجل"
        bgColor="bg-yellow-100"
        onClick={onHistoryClick}
        ariaLabel="السجل"
      />
      
      {/* Existing Ingredient Guide Card (fourth position), now linked to onGuideClick */}
      <ActionCard
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3L11.25 6H15a2.25 2.25 0 012.25 2.25V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V8.25a2.25 2.25 0 012.25-2.25H9L10.5 3h-.75M12 6v6m0 0V6a2.25 2.25 0 01-2.25-2.25H9.75M12 6v6m0 0V6a2.25 2.25 0 00-2.25-2.25H9.75m3.75 3.75h-.008v-.008h.008V7.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        } // Beaker/flask icon
        title="دليل المكونات"
        bgColor="bg-green-100"
        onClick={onGuideClick}
        ariaLabel="دليل المكونات"
      />
    </div>
  );
};

export default ActionCardsGrid;