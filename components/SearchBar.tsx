import React from 'react';

const SearchBar: React.FC = () => {
  return (
    <div className="px-4 mt-40"> {/* Adjusted mt to push it below the fixed header */}
      <div className="flex items-center bg-white rounded-full shadow-sm pr-4 pl-2 h-14 border border-gray-200">
        {/* Microphone Icon (right in RTL) */}
        <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="البحث الصوتي">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 6a6 6 0 01-6-6v-1.5m6 6v3.75m-3.75 0h7.5M12 10.5v-1.5m0 0a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
          </svg>
        </button>
        {/* Input Field */}
        <input
          type="text"
          placeholder="اسأل او ابحث عن اي شيء"
          className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-800 text-lg mx-2"
          aria-label="أدخل استعلام البحث"
        />
        {/* Search Icon (left in RTL) */}
        <button className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none" aria-label="زر البحث">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;