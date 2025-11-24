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
    username: '',
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
    <div className="min-h-screen text-white font-sans">
      <BackgroundGrid />

      {step === AppStep.WELCOME && (
        <WelcomeScreen onContinue={() => setStep(AppStep.SELECT_GAME)} />
      )}

      {step !== AppStep.WELCOME && (
        <div className="relative z-10 min-h-screen flex flex-col items-center pt-10 px-4 pb-10">
          
          {/* Navigation Bar */}
          <div className="w-full max-w-4xl mb-8 flex items-center justify-between">
             <button 
                onClick={() => setStep(AppStep.WELCOME)} 
                className="text-gray-400 hover:text-white font-semibold flex items-center gap-2 transition-colors"
                disabled={isSubmitting}
             >
                ← Back
             </button>
             <div className="text-gray-500 font-medium">Middle Bots Services</div>
          </div>

          {/* GAME SELECTION */}
          {step === AppStep.SELECT_GAME && (
            <div className="w-full max-w-4xl">
              <h2 className="text-3xl font-bold text-center mb-8 text-white drop-shadow-md">Select Your Game</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {GAMES.map((game) => (
                  <button
                    key={game.id}
                    onClick={() => handleGameSelect(game.id)}
                    className="group relative h-64 rounded-2xl overflow-hidden shadow-2xl transition-transform hover:-translate-y-2"
                  >
                    {/* Image */}
                    <div className="absolute inset-0">
                      <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    </div>
                    
                    {/* Title */}
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                      <h3 className="text-2xl font-bold text-white mb-1">{game.name}</h3>
                      <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity">Click to select</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TRADE SETUP FORM */}
          {step === AppStep.TRADE_SETUP && (
            <div className="w-full max-w-xl bg-[#1a1a1a] rounded-2xl p-8 shadow-2xl border border-gray-800 animate-fade-in">
              <div className="mb-6 text-center border-b border-gray-800 pb-4">
                <h3 className="font-bold text-2xl text-white">Trade Details</h3>
                <p className="text-gray-400 text-sm mt-1">Configure your request for {config.game}</p>
              </div>

              <form onSubmit={handleTradeSetup} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Your Username</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Username"
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white focus:outline-none transition-colors"
                    value={config.username}
                    onChange={(e) => setConfig({...config, username: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Trade Description</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe exactly what items are being traded..."
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white focus:outline-none transition-colors resize-none"
                    value={config.description}
                    onChange={(e) => setConfig({...config, description: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">When do you want to trade?</label>
                  <select 
                    className="w-full bg-[#111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-white focus:outline-none transition-colors appearance-none"
                    value={config.tradeTime}
                    onChange={(e) => setConfig({...config, tradeTime: e.target.value})}
                    required
                  >
                    <option value="">Select a time...</option>
                    <option value="now">Right Now</option>
                    <option value="15min">In 15 Minutes</option>
                    <option value="1hour">In 1 Hour</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-white text-black font-bold text-lg py-4 rounded-xl hover:bg-gray-200 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : 'Hire Bot'}
                </button>
              </form>
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