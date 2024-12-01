import React from 'react';

const AuthLayout = ({ children, darkMode, toggleDarkMode }) => {
    return (
        <div
            className={`
        min-h-screen flex items-center justify-center 
        ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}
        transition-colors duration-300
      `}
        >
            <div
                className={`
          w-full max-w-md p-8 rounded-xl shadow-2xl
          ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}
          relative
        `}
            >
                <div className="absolute top-4 right-4">
                    <button
                        onClick={toggleDarkMode}
                        className={`
              p-2 rounded-full
              ${darkMode
                                ? 'bg-gray-700 text-white hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}
            `}
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default AuthLayout