import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QUESTIONS } from '../../constants';
import { Button } from '../ui/Button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface QuizScreenProps {
  onComplete: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleNext = () => {
    if (!selectedOption) return;
    
    if (currentIndex < QUESTIONS.length - 1) {
      setSelectedOption(null);
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-6 text-white relative overflow-hidden">
       {/* Custom Background Image for Quiz Only */}
       <div className="absolute inset-0 z-0">
          {/* 
            NOTE: Replace the src below with your specific uploaded image URL if needed. 
            I've used a high-quality Lion/Dark theme image to match your request.
          */}
          <img 
            src="https://images.unsplash.com/photo-1615887023516-9b6c50f2717d?q=80&w=1974&auto=format&fit=crop" 
            alt="LionFit Background" 
            className="w-full h-full object-cover object-center opacity-60"
          />
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
          
          {/* Optional: Subtle grid still visible but faint */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20" />
       </div>

      {/* Progress Bar */}
      <div className="w-full max-w-md mx-auto mt-8 mb-12 z-10 relative">
        <div className="flex justify-between mb-2 text-xs font-bold text-zinc-400 uppercase tracking-wider">
          <span>Progresso</span>
          <span>{currentIndex + 1}/{QUESTIONS.length}</span>
        </div>
        <div className="h-2 w-full bg-zinc-900/50 backdrop-blur-sm rounded-full overflow-hidden border border-zinc-700/50">
          <motion.div 
            className="h-full bg-gradient-to-r from-lion-600 to-lion-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full z-10 relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-black leading-tight text-white drop-shadow-lg">
              <span className="text-lion-500 mr-2">#{currentQuestion.id}</span>
              {currentQuestion.text}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
                  className={`w-full p-4 rounded-xl border-2 text-left font-semibold transition-all duration-200 flex items-center justify-between group backdrop-blur-md
                    ${selectedOption === option 
                      ? 'border-lion-500 bg-lion-500/20 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
                      : 'border-zinc-700/50 bg-black/40 text-zinc-300 hover:border-zinc-500 hover:bg-black/60'
                    }`}
                >
                  <span className="drop-shadow-md">{option}</span>
                  {selectedOption === option && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <CheckCircle2 className="w-5 h-5 text-lion-500 drop-shadow-md" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full max-w-md mx-auto mt-auto pb-8 z-10 relative">
        <Button 
          onClick={handleNext} 
          disabled={!selectedOption}
          fullWidth
          className={`${!selectedOption ? 'opacity-50 cursor-not-allowed' : 'shadow-2xl shadow-lion-500/20'}`}
        >
          {currentIndex === QUESTIONS.length - 1 ? 'FINALIZAR' : 'PRÓXIMO'}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};