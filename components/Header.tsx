import React from 'react';

const Header: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-white">
      {/* Top Status Bar - Now only shows time on the right (in RTL) */}
      <div className="flex justify-end items-center px-4 py-1 text-sm text-gray-700">
        <div className="flex items-center">
          <span className="text-sm font-medium">{currentTime}</span>
        </div>
      </div>

      {/* Notification and Help Icons */}
      <div className="flex justify-between items-center px-4 mt-2">
        {/* Help Icon (left in RTL) */}
        <button className="text-gray-700 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300" aria-label="مساعدة">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-7 h-7"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </button>

        {/* Notification Bell (right in RTL) */}
        <div className="relative">
          <button className="text-gray-700 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300" aria-label="الإشعارات">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9.067a3.75 3.75 0 00-3.75-3.75H12a2.25 2.25 0 01-2.25-2.25V4.5M3.75 8.25h1.5M12 10.5h.008v.008H12zm2.25 1.5h.008v.008H14.25zm2.25 1.5h.008v.008H16.5m-4.247-2.923a4.5 4.5 0 01-1.15 4.316 4.5 4.5 0 007.081-4.993 4.5 4.5 0 01-5.93-3.084M9 13.75a3 3 0 00-3 3v.75m-3 0h-.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <span className="absolute top-0 right-0 -mr-1 -mt-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            5
          </span>
        </div>
      </div>

      {/* Main Greeting */}
      <h1 className="text-right text-3xl font-bold px-4 mt-4 mb-6 text-gray-900">
        بماذا يمكنني مساعدتك اليوم؟
      </h1>
    </header>
  );
};

export default Header;