
import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  ...props 
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-gray-800 
        shadow-md rounded-lg 
        border border-gray-200 dark:border-gray-700
        ${className}
      `}
      {...props}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          {title && <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card