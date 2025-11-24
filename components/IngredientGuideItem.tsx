import React from 'react';
import { GuideIngredient } from '../types';

interface IngredientGuideItemProps {
  ingredient: GuideIngredient;
  isExpanded: boolean;
  onClick: (id: string) => void;
}

const IngredientGuideItem: React.FC<IngredientGuideItemProps> = ({ ingredient, isExpanded, onClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
      <button
        onClick={() => onClick(ingredient.id)}
        className="w-full flex items-center justify-between p-4 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors duration-200 hover:bg-gray-50"
        aria-expanded={isExpanded}
        aria-controls={`ingredient-details-${ingredient.id}`}
        aria-label={`توسيع/طي تفاصيل ${ingredient.name}`}
      >
        <span className="text-lg font-semibold text-gray-800">
          {ingredient.name} {ingredient.eNumber && `(${ingredient.eNumber})`}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isExpanded && (
        <div id={`ingredient-details-${ingredient.id}`} className="p-4 border-t border-gray-200 bg-gray-50 text-gray-700 text-base leading-relaxed">
          <p className="mb-2"><span className="font-medium text-gray-800">الوصف:</span> {ingredient.description}</p>
          <p className="mb-2"><span className="font-medium text-gray-800">الاستخدامات الشائعة:</span> {ingredient.usage}</p>
          <p className="mb-2"><span className="font-medium text-gray-800">المخاطر المحتملة:</span> {ingredient.potentialRisks.join('، ')}</p>
        </div>
      )}
    </div>
  );
};

export default IngredientGuideItem;