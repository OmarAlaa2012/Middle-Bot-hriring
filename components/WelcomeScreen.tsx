import React from 'react';

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <div className="relative z-30 flex flex-col items-center justify-center min-h-screen text-center px-4 overflow-hidden">
      
      <div className="relative z-10 space-y-6 animate-fade-in transform scale-100 md:scale-110">
        {/* Main Title - Massive with soft glow */}
        <h1 className="text-8xl md:text-9xl font-black text-white tracking-tighter drop-shadow-[0_0_35px_rgba(255,255,255,0.25)]">
          Welcome
        </h1>
        
        {/* Subtitle - Gradient Text with Glow instead of outline */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-green-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">
          Middle Bots Hiring
        </h2>
      </div>

      <div className="relative z-10 mt-24 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <button 
          onClick={onContinue}
          className="group relative bg-white text-black text-2xl font-bold py-5 px-16 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] active:scale-95"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center gap-3">
            Continue 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
        </button>
      </div>

    </div>
  );
};

export default WelcomeScreen;