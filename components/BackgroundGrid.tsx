import React from 'react';

const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#111] pointer-events-none">
      {/* Background Image - Roblox Collage Style */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1614726365723-49cfae92782f?q=80&w=2600&auto=format&fit=crop" 
          alt="Gaming Background" 
          className="w-full h-full object-cover opacity-40 blur-[2px]"
        />
      </div>

      {/* Simple Dark Overlay for readability */}
      <div className="absolute inset-0 z-10 bg-black/60"></div>
    </div>
  );
};

export default BackgroundGrid;