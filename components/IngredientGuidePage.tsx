import React, { useState, useEffect } from 'react';
import { ingredientGuideData } from '../data/ingredientGuideData';
import IngredientGuideItem from './IngredientGuideItem';

interface IngredientGuidePageProps {
  onBack: () => void;
}

const IngredientGuidePage: React.FC<IngredientGuidePageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIngredients, setFilteredIngredients] = useState(ingredientGuideData);
  const [expandedIngredientId, setExpandedIngredientId] = useState<string | null>(null);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = ingredientGuideData.filter(ingredient =>
      ingredient.name.toLowerCase().includes(lowercasedSearchTerm) ||
      ingredient.eNumber?.toLowerCase().includes(lowercasedSearchTerm) ||
      ingredient.description.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredIngredients(filtered);
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleItemClick = (id: string) => {
    setExpandedIngredientId(prevId => (prevId === id ? null : id));
  };

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
          دليل المكونات
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mr-2 text-green-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3L11.25 6H15a2.25 2.25 0 012.25 2.25V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V8.25a2.25 2.25 0 012.25-2.25H9L10.5 3h-.75M12 6v6m0 0V6a2.25 2.25 0 01-2.25-2.25H9.75M12 6v6m0 0V6a2.25 2.25 0 00-2.25-2.25H9.75m3.75 3.75h-.008v-.008h.008V7.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </h1>
        <div className="w-1/4"></div> {/* Placeholder for alignment */}
      </div>

      <p className="text-gray-600 text-center text-sm md:text-base mb-6">
        ابحث عن أي مكون غذائي للحصول على شرح مفصل عنه، بما في ذلك استخدامه ومخاطره المحتملة.
      </p>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="ابحث في دليل المكونات..."
          className="w-full p-3 pr-10 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 text-lg"
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="مربع البحث عن المكونات"
        />
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1"
            aria-label="مسح البحث"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {filteredIngredients.length === 0 ? (
          <div className="text-center text-gray-600 text-lg py-10">
            <p>لا توجد مكونات مطابقة لبحثك.</p>
          </div>
        ) : (
          filteredIngredients.map(ingredient => (
            <IngredientGuideItem
              key={ingredient.id}
              ingredient={ingredient}
              isExpanded={expandedIngredientId === ingredient.id}
              onClick={handleItemClick}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default IngredientGuidePage;