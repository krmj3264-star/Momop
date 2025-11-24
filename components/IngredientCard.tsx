import React from 'react';
import { IngredientAnalysisResult } from '../types';

interface IngredientCardProps {
  ingredient: IngredientAnalysisResult;
}

const getRiskLevelColor = (riskLevel: IngredientAnalysisResult['riskLevel']) => {
  switch (riskLevel) {
    case 'High':
      return 'bg-red-100 text-red-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'Low':
      return 'bg-green-100 text-green-800';
    case 'Informational':
    default:
      return 'bg-blue-100 text-blue-800';
  }
};

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient }) => {
  const riskColorClass = getRiskLevelColor(ingredient.riskLevel);

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200" aria-labelledby={`ingredient-name-${ingredient.ingredientName}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 id={`ingredient-name-${ingredient.ingredientName}`} className="text-xl font-semibold text-gray-800">{ingredient.ingredientName}</h3>
        <span className={`px-3 py-1 text-sm font-medium rounded-full ${riskColorClass}`} aria-label={`مستوى الخطر: ${ingredient.riskLevel}`}>
          {ingredient.riskLevel === 'High' && 'خطر مرتفع'}
          {ingredient.riskLevel === 'Medium' && 'خطر متوسط'}
          {ingredient.riskLevel === 'Low' && 'خطر منخفض'}
          {ingredient.riskLevel === 'Informational' && 'معلومات'}
        </span>
      </div>
      <p className="text-gray-700 mb-3 text-base leading-relaxed">{ingredient.details}</p>

      {ingredient.warnings && ingredient.warnings.length > 0 && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <h4 className="text-lg font-medium text-gray-700 mb-2">تحذيرات ومخاطر محتملة:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600" aria-label="قائمة التحذيرات">
            {ingredient.warnings.map((warning, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 ml-2">•</span> {/* Adjusted margin for RTL */}
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IngredientCard;