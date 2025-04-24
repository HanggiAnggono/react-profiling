import React, { useState } from 'react';

interface StatCardProps {
  title: string;
  value: string;
  color: 'blue' | 'green' | 'yellow' | 'red';
}

// Bottleneck: Not using React.memo for a pure component
const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Bottleneck: Calculating this on every render
  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };
  
  // Bottleneck: Calculating this on every render
  const getLightColorClass = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'yellow':
        return 'bg-yellow-100 text-yellow-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  return (
    <div 
      className={`p-4 rounded-lg shadow transition-all duration-300 ${
        isHovered ? 'transform scale-105' : ''
      } ${getLightColorClass()}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-full ${getColorClass()} flex items-center justify-center text-white`}>
          <span className="text-xl font-bold">
            {title.charAt(0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;