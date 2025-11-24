import React from 'react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <div className="relative z-30 flex flex-col items-center justify-center min-h-screen text-center px-4">
      
      <div className="space-y-2 animate-fade-in transform scale-100 md:scale-125">
        {/* Main Title - Big White Text */}
        <h1 className="text-8xl font-black text-white tracking-tighter drop-shadow-2xl">
          Welcome
        </h1>
        
        {/* Subtitle - Outlined Style */}
        <h2 className="text-4xl font-black text-transparent text-stroke tracking-wide">
          Middle Bots Hiring
        </h2>
      </div>

      <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <button 
          onClick={onContinue}
          className="bg-white text-black text-2xl font-bold py-4 px-12 rounded-full hover:scale-105 transition-transform duration-200 shadow-xl flex items-center gap-2"
        >
          Continue
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  );
};

export default WelcomeScreen;