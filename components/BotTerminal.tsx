import React, { useEffect, useState, useRef } from 'react';
import { generateBotProtocol } from '../services/geminiService';
import { TradeConfig } from '../types';

interface BotTerminalProps {
  config: TradeConfig;
}

const BotTerminal: React.FC<BotTerminalProps> = ({ config }) => {
  const [logs, setLogs] = useState<string[]>([
    "Initializing system...",
    "Connecting to secure servers...",
  ]);
  const [botMessage, setBotMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<'initializing' | 'connected' | 'waiting'>('initializing');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;

    const initBot = async () => {
      setTimeout(() => {
        if(mounted) setLogs(prev => [...prev, `Selected Game: ${config.game}`]);
      }, 1000);

      setTimeout(() => {
        if(mounted) setLogs(prev => [...prev, "Searching for available middleman bots..."]);
      }, 2000);
      
      setTimeout(() => {
        if(mounted) setLogs(prev => [...prev, "Bot Found: MiddleMan1552 (Verified)"]);
      }, 3000);

      setTimeout(async () => {
        if(mounted) {
           setStatus('connected');
           const message = await generateBotProtocol(config);
           if(mounted) {
             setBotMessage(message);
             setLogs(prev => [...prev, "Protocol message received."]);
             setStatus('waiting');
           }
        }
      }, 4500);
    };

    initBot();

    return () => { mounted = false; };
  }, [config]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, botMessage]);

  return (
    <div className="relative z-10 w-full max-w-3xl mx-auto p-4 animate-fade-in">
      
      <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
        {/* Header */}
        <div className="bg-[#252525] p-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-800 rounded-full overflow-hidden border-2 border-green-500">
                <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=MiddleMan1552`} alt="Bot" className="w-full h-full p-1" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">MiddleMan1552</h2>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online & Ready
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px] flex flex-col font-mono text-sm">
          
          <div className="space-y-2 text-gray-400 flex-1">
            {logs.map((log, index) => (
              <div key={index} className="border-l-2 border-gray-700 pl-3 py-1">
                <span className="text-gray-600 mr-2">{new Date().toLocaleTimeString()}</span>
                {log}
              </div>
            ))}
          </div>

          {botMessage && (
            <div className="mt-6 bg-[#111] p-4 rounded-lg border border-gray-700">
              <div className="text-xs text-gray-500 mb-2 uppercase font-bold tracking-wider">Bot Message</div>
              <div className="text-white whitespace-pre-wrap leading-relaxed">
                {botMessage}
              </div>
            </div>
          )}
          
          {status === 'waiting' && (
             <div className="mt-6 text-center bg-blue-900/20 py-4 rounded-lg border border-blue-500/30">
                <p className="text-blue-200 font-semibold animate-pulse">Waiting for you to add MiddleMan1552...</p>
             </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default BotTerminal;