
import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
  children, 
  onClick, 
  variant = 'primary', 
  isLoading = false, 
  className = '', 
  disabled = false,
  ...props
}) => {
  const baseClasses = 'px-4 py-2 rounded-md transition-all duration-300 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500',
    outline: 'border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-500'
  };

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${isLoading ? 'cursor-not-allowed opacity-50' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 animate-spin" size={20} />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;