import React, { useEffect, useRef } from 'react';

const BackgroundGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { x: number; y: number; speed: number; size: number; opacity: number }[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        speed: Math.random() * 1.5 + 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1
      };
    };

    // Initialize particles
    for (let i = 0; i < 70; i++) {
        particles.push({
            ...createParticle(),
            y: Math.random() * canvas.height
        });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, index) => {
        p.y -= p.speed;
        p.opacity -= 0.003;

        if (p.y < -10 || p.opacity <= 0) {
          particles[index] = createParticle();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        // Cyan/Greenish glowy particles
        ctx.fillStyle = `rgba(50, 255, 200, ${p.opacity})`; 
        ctx.fill();
        
        // Slight glow for larger particles
        if (p.size > 2) {
             ctx.shadowBlur = 10;
             ctx.shadowColor = "rgba(50, 255, 200, 0.5)";
        } else {
            ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black pointer-events-none">
      {/* Background Image - Roblox Collage Style - Darker for better contrast */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1614726365723-49cfae92782f?q=80&w=2600&auto=format&fit=crop" 
          alt="Gaming Background" 
          className="w-full h-full object-cover opacity-20 blur-[3px]"
        />
      </div>

      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10 opacity-80" />

      {/* Radial Gradient Overlay to focus center */}
      <div className="absolute inset-0 z-20 bg-radial-gradient from-transparent via-black/40 to-black/90"></div>
    </div>
  );
};

export default BackgroundGrid;