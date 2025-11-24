import React from 'react';

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  bgColor: string;
  onClick: () => void;
  ariaLabel: string;
}

const ActionCard: React.FC<ActionCardProps> = ({ icon, title, bgColor, onClick, ariaLabel }) => {
  return (
    <button
      onClick={onClick}
      className={`relative h-40 flex flex-col items-center justify-center p-4 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${bgColor}`}
      aria-label={ariaLabel}
    >
      <div className="mb-2 text-gray-800">{icon}</div> {/* Removed text-4xl from icon div */}
      <span className="text-lg font-semibold text-gray-800">{title}</span>
    </button>
  );
};

export default ActionCard;