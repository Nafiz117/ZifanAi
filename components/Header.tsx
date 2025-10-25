import React from 'react';

const Logo: React.FC = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 inline-block mr-3 animate-pulse-slow"
        aria-hidden="true"
    >
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
        </defs>
        <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="url(#logoGradient)"
        />
        <path
            d="M12 17.5C15.04 17.5 17.5 15.04 17.5 12C17.5 8.96 15.04 6.5 12 6.5C8.96 6.5 6.5 8.96 6.5 12C6.5 15.04 8.96 17.5 12 17.5ZM12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5Z"
            fill="url(#logoGradient)"
        />
        <path
            d="M12 10.5C11.17 10.5 10.5 11.17 10.5 12C10.5 12.83 11.17 13.5 12 13.5C12.83 13.5 13.5 12.83 13.5 12C13.5 11.17 12.83 10.5 12 10.5Z"
            fill="white"
        />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8 md:mb-12">
      <div className="flex items-center justify-center">
        <Logo />
        <h1 className="font-audiowide text-4xl sm:text-5xl md:text-6xl tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          ZifanAI
        </h1>
      </div>
      <p className="mt-3 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400">
        Upload your photo and watch the magic happen. Select an effect and let ZifanAI transform your image!
      </p>
    </header>
  );
};