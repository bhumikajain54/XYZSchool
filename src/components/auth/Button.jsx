import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  onClick, 
  disabled = false, 
  className = '',
  loading = false 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative w-full overflow-hidden
        bg-gradient-to-r from-purple-600 to-indigo-600 
        hover:from-purple-500 hover:to-indigo-500
        active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        text-white font-bold py-3 px-6 rounded-xl
        transition-all duration-200 transform hover:brightness-110 hover:shadow-lg hover:shadow-indigo-500/20
        flex items-center justify-center gap-2
        ${className}
      `}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Processing...</span>
        </div>
      ) : children}
    </button>
  );
};

export default Button;
