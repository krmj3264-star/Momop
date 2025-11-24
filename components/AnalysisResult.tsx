import React from 'react';
import { IngredientAnalysisResult } from '../types';
import IngredientCard from './IngredientCard';

interface AnalysisResultProps {
  results: IngredientAnalysisResult[] | null;
  error: string | null;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ results, error }) => {
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-8" role="alert">
        <strong className="font-bold">خطأ في التحليل: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!results) {
    return null; // Don't render anything if there are no results yet
  }

  if (results.length === 0) {
    return (
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative my-8" role="alert">
        <strong className="font-bold">لا توجد نتائج: </strong>
        <span className="block sm:inline">لم يتم العثور على تحليل للمكونات المدخلة. يرجى التحقق من القائمة والمحاولة مرة أخرى.</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 my-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">نتائج تحليل المكونات</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((ingredient, index) => (
          <IngredientCard key={index} ingredient={ingredient} />
        ))}
      </div>
    </div>
  );
};

export default AnalysisResult;