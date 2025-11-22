
import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { DISCOUNT_PERCENTAGE } from '../../constants';
import { PartyPopper, Lock, Unlock } from 'lucide-react';

interface RouletteScreenProps {
  onFinish: () => void;
}

// Particle component for the explosion
const Particle: React.FC<{ index: number }> = ({ index }) => {
  const angle = (index / 30) * 360; // Spread 30 particles in a circle
  const radius = Math.random() * 200 + 100; // Random distance
  const size = Math.random() * 8 + 4;
  
  return (
    <motion.div
      initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
      animate={{ 
        x: radius * Math.cos(angle * (Math.PI / 180)), 
        y: radius * Math.sin(angle * (Math.PI / 180)), 
        scale: 0,
        opacity: 0 
      }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="absolute top-1/2 left-1/2 bg-gradient-to-br from-yellow-200 to-lion-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)] z-50"
      style={{ width: size, height: size }}
    />
  );
};

export const RouletteScreen: React.FC<RouletteScreenProps> = ({ onFinish }) => {
  const [status, setStatus] = useState<'spinning' | 'locked'>('spinning');
  const numberRef = useRef<HTMLSpanElement>(null);
  
  // Motion value for the number
  const count = useMotionValue(0);
  const rounded = useTransform(count, latest => Math.round(latest));
  
  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (numberRef.current) {
        numberRef.current.textContent = Math.round(latest).toString();
      }
    });

    const runSequence = async () => {
      // Phase 1: Chaos / Acceleration (0 to random high numbers)
      // We loop this animation to simulate high speed spinning
      const spinControls = animate(count, 100, {
        duration: 0.5,
        ease: "linear",
        repeat: 4, // Spin for 2 seconds (0.5 * 4)
        repeatType: "loop",
        onUpdate: (latest) => {
           // Reset to 0 if it hits 100 to look like a loop
           if (latest >= 99) count.set(0);
        }
      });

      // Wait for the "chaos" phase
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      spinControls.stop();

      // Phase 2: Deceleration to Target (from current pos to 55)
      // We ensure we start from a number lower than 55 to count up smoothly at the end
      count.set(10); 
      
      await animate(count, DISCOUNT_PERCENTAGE, {
        duration: 1.5,
        ease: [0.22, 1, 0.36, 1], // Custom cubic bezier for a heavy "mechanical" stop
      });

      setStatus('locked');
      
      // Phase 3: Hold and Transition
      setTimeout(() => {
        onFinish();
      }, 3500);
    };

    runSequence();
    return () => unsubscribe();
  }, [count, rounded, onFinish]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Global Ambient Glow */}
      <div className="absolute inset-0 bg-radial-gradient from-lion-900/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Top Status Text */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h2 className="text-lion-400 text-sm font-bold tracking-[0.3em] uppercase mb-2">
            {status === 'spinning' ? 'Sincronizando Oferta...' : 'Desconto Desbloqueado'}
          </h2>
          <div className="h-1 w-24 bg-zinc-800 mx-auto rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-lion-500"
              animate={{ x: [-100, 100] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </div>
        </motion.div>

        {/* The Vault / Wheel */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          
          {/* Layer 1: Outer Static Ring with Ticks */}
          <div className="absolute inset-0 rounded-full border border-zinc-800 bg-black/40 backdrop-blur-sm z-0" />
          
          {/* Layer 2: Rotating Dashed Ring (Slow) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-20px] rounded-full border border-dashed border-zinc-700 opacity-50"
          />

          {/* Layer 3: Counter-Rotating Tech Ring (Medium) */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-t-lion-500 border-r-transparent border-b-lion-500/30 border-l-transparent shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          />

          {/* Layer 4: The Fast Spinner (Only while spinning) */}
          <AnimatePresence>
            {status === 'spinning' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ rotate: { duration: 1, repeat: Infinity, ease: "linear" } }}
                className="absolute inset-4 rounded-full border-4 border-t-white border-transparent shadow-[0_0_50px_rgba(255,255,255,0.3)]"
              />
            )}
          </AnimatePresence>

          {/* Layer 5: Shockwave (Triggered on Lock) */}
          {status === 'locked' && (
             <>
               <motion.div 
                 initial={{ scale: 0.8, opacity: 0.8, borderWidth: "10px" }}
                 animate={{ scale: 2, opacity: 0, borderWidth: "0px" }}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="absolute inset-0 rounded-full border-lion-500 z-0"
               />
               {/* Particle Explosion */}
               {[...Array(30)].map((_, i) => <Particle key={i} index={i} />)}
             </>
          )}

          {/* Layer 6: Center Display */}
          <motion.div 
            animate={status === 'locked' ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.3 }}
            className="relative z-20 w-56 h-56 bg-gradient-to-b from-zinc-900 to-black rounded-full flex flex-col items-center justify-center border border-zinc-800 shadow-inner"
          >
            {/* Glow behind numbers */}
            <div className={`absolute inset-0 bg-lion-500/10 rounded-full blur-xl transition-opacity duration-300 ${status === 'locked' ? 'opacity-100' : 'opacity-20'}`} />

            {/* The Number */}
            <div className="flex items-start relative">
               <span 
                 ref={numberRef}
                 className={`text-8xl font-black tracking-tighter transition-colors duration-300 ${status === 'locked' ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'text-zinc-500 blur-[1px]'}`}
               >
                 0
               </span>
               <span className={`text-4xl font-bold mt-2 transition-colors duration-300 ${status === 'locked' ? 'text-lion-500' : 'text-zinc-600'}`}>%</span>
            </div>
            
            {/* Lock Icon */}
            <div className="mt-2">
              {status === 'locked' ? (
                <motion.div 
                  initial={{ scale: 0 }} 
                  animate={{ scale: 1 }} 
                  className="flex items-center gap-1 text-lion-500 bg-lion-500/10 px-3 py-1 rounded-full border border-lion-500/30"
                >
                  <Lock className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Aprovado</span>
                </motion.div>
              ) : (
                 <div className="flex items-center gap-1 text-zinc-600 px-3 py-1">
                   <Unlock className="w-3 h-3" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Gerando...</span>
                 </div>
              )}
            </div>

          </motion.div>
        </div>

        {/* Bottom Message */}
        <div className="h-24 mt-12 flex flex-col items-center justify-center text-center px-4">
          <AnimatePresence mode="wait">
            {status === 'locked' ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                  <PartyPopper className="text-lion-500 w-6 h-6" />
                  <span>PARABÉNS!</span>
                  <PartyPopper className="text-lion-500 w-6 h-6" />
                </h3>
                <p className="text-zinc-400 text-sm">Redirecionando para sua oferta...</p>
              </motion.div>
            ) : (
               <motion.p 
                 exit={{ opacity: 0 }}
                 className="text-zinc-500 text-xs animate-pulse max-w-[200px]"
               >
                 O sistema está calculando sua melhor condição baseada nas respostas...
               </motion.p>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
