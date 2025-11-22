
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppScreen } from './types';
import { HomeScreen } from './components/screens/HomeScreen';
import { QuizScreen } from './components/screens/QuizScreen';
import { RouletteScreen } from './components/screens/RouletteScreen';
import { OfferScreen } from './components/screens/OfferScreen';
import { Activity } from 'lucide-react';

// --- Initial Loading Screen ---
const InitialLoader: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 500); // Small delay after 100% before unmounting
          return 100;
        }
        // Random increment for realistic feel
        return prev + Math.floor(Math.random() * 15) + 5; 
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" />

      {/* Content Wrapper */}
      <div className="relative z-20 flex flex-col items-center">
        {/* Logo Pulse */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="bg-lion-500 p-4 rounded-2xl shadow-[0_0_50px_rgba(245,158,11,0.5)] animate-pulse">
            <Activity className="text-black w-10 h-10" />
          </div>
          <h1 className="text-5xl font-black tracking-widest text-white uppercase drop-shadow-2xl">LionFit</h1>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-72 h-1.5 bg-zinc-900 rounded-full overflow-hidden relative border border-zinc-800">
          <motion.div 
            className="h-full bg-gradient-to-r from-lion-600 to-lion-400 shadow-[0_0_20px_rgba(245,158,11,0.8)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
        
        {/* Status Text */}
        <motion.div className="mt-6 flex flex-col items-center space-y-2">
          <span className="text-lion-500 font-mono text-xs font-bold tracking-[0.3em] uppercase drop-shadow-md animate-pulse">
            {progress < 100 ? 'Inicializando Sistema...' : 'Acesso Liberado'}
          </span>
        </motion.div>
      </div>

    </motion.div>
  );
};

// --- Intermediate Loading Screen (Quiz -> Roulette) ---
const CalculatingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 2000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4 relative z-10">
      <div className="w-16 h-16 border-4 border-lion-500/30 border-t-lion-500 rounded-full animate-spin" />
      <h2 className="text-white font-bold text-lg animate-pulse">Analisando suas respostas...</h2>
    </div>
  );
};

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };

    // Resize handling
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    // Particle Class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow drift
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        // Mix of Gold and muted White
        this.color = Math.random() > 0.6 ? 'rgba(245, 158, 11, ' : 'rgba(255, 255, 255, '; 
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        // Base opacity is low for subtle feel
        ctx.fillStyle = this.color + '0.4)'; 
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.08), 100); // Responsive count
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and Draw Particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();

        // Interaction: Draw line to mouse if close
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 150;

        if (distance < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(245, 158, 11, ${1 - distance / maxDistance})`; // Gold fade
          ctx.lineWidth = 0.5;
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    // Event Listeners
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    const handleTouchMove = (e: TouchEvent) => {
        if(e.touches.length > 0) {
            mouse.x = e.touches[0].clientX;
            mouse.y = e.touches[0].clientY;
        }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    
    // Init
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'linear-gradient(to bottom, #050505, #0f0f0f)' }}
    />
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [screen, setScreen] = useState<AppScreen>(AppScreen.HOME);

  const renderScreen = () => {
    switch (screen) {
      case AppScreen.HOME:
        return <HomeScreen onStart={() => setScreen(AppScreen.QUIZ)} />;
      case AppScreen.QUIZ:
        return <QuizScreen onComplete={() => setScreen(AppScreen.CALCULATING)} />;
      case AppScreen.CALCULATING:
        return <CalculatingScreen onComplete={() => setScreen(AppScreen.ROULETTE)} />;
      case AppScreen.ROULETTE:
        return <RouletteScreen onFinish={() => setScreen(AppScreen.OFFER)} />;
      case AppScreen.OFFER:
        return <OfferScreen />;
      default:
        return null;
    }
  };

  return (
    // Removed overflow-hidden to allow vertical scrolling
    <div className="min-h-screen text-white font-sans antialiased selection:bg-lion-500 selection:text-black relative">
      
      <AnimatePresence>
        {isLoading && (
          <InitialLoader onFinish={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <InteractiveBackground />
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="w-full relative z-10"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default App;
