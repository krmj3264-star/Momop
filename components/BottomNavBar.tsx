import React from 'react';

interface BottomNavBarProps {
  onAnalyzeClick: () => void;
  onHomeClick: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ onAnalyzeClick, onHomeClick }) => {
  const handleFeatureComingSoon = (featureName: string) => {
    alert(`${featureName} قريباً!`);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-white shadow-lg rounded-t-3xl flex justify-around items-center px-4 z-10">
      {/* Plus Button */}
      <button
        onClick={() => handleFeatureComingSoon('إضافة')}
        className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-3xl font-light shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        aria-label="إضافة عنصر جديد"
      >
        +
      </button>

      {/* Analyze Button */}
      <button
        onClick={onAnalyzeClick}
        className="flex items-center bg-black text-white py-3 px-6 rounded-full shadow-md text-lg font-semibold transition-all duration-200 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        aria-label="الانتقال لتحليل المكونات"
      >
        {/* Document Icon (left in RTL) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 ml-2" /* ml-2 positions it correctly in RTL */
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 8.625v3.375c0 .621.504 1.125 1.125 1.125h.75A1.125 1.125 0 0012 17.625v-3.375m-4.242-10.257L12 2.25l4.242 4.243L12 10.738V12h.008v.008H12v-.008z"
          />
        </svg>
        تحليل
        {/* Person Icon (right in RTL) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 mr-2" /* mr-2 positions it correctly in RTL */
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </button>

      {/* Profile/N Button */}
      <button
        onClick={() => handleFeatureComingSoon('الملف الشخصي')}
        className="w-14 h-14 rounded-full bg-gray-200 text-gray-800 flex items-center justify-center text-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
        aria-label="الملف الشخصي"
      >
        N
      </button>
    </nav>
  );
};

export default BottomNavBar;