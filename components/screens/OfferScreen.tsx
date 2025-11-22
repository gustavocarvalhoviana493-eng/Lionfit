
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Clock, Check, Star } from 'lucide-react';
import { Button } from '../ui/Button';
import { DISCOUNT_PERCENTAGE } from '../../constants';

export const OfferScreen: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleRedirect = () => {
    window.location.href = "https://zod.site/";
  };

  return (
    <div className="min-h-screen text-white p-6 relative flex flex-col items-center">
      
      {/* Sticky Top Bar for Urgency */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 bg-lion-600 text-white z-50 py-3 px-4 shadow-lg flex justify-center items-center gap-2"
      >
        <Clock className="w-4 h-4 animate-pulse" />
        <span className="text-sm font-bold uppercase tracking-wide">
          Oferta expira em: {formatTime(timeLeft)}
        </span>
      </motion.div>

      <div className="pt-16 max-w-lg w-full flex flex-col gap-6 pb-24">
        
        {/* Celebration Header */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="inline-block bg-zinc-900 border border-lion-500/50 rounded-full px-4 py-1 mb-4">
            <span className="text-lion-400 text-xs font-bold uppercase tracking-widest">Cupom Ativado</span>
          </div>
          <h1 className="text-4xl font-black leading-none text-white">
            PARABÉNS! <br />
            VOCÊ GANHOU <span className="text-lion-500 text-5xl block mt-2">{DISCOUNT_PERCENTAGE}% OFF</span>
          </h1>
          <p className="text-zinc-400 font-medium">
            Seu perfil foi selecionado para receber acesso total ao LionFit por um preço especial.
          </p>
        </motion.div>

        {/* Pricing Card */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-zinc-900/80 backdrop-blur-xl border border-lion-500 rounded-3xl p-6 relative overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.15)]"
        >
          {/* Best Value Badge */}
          <div className="absolute top-0 right-0 bg-lion-500 text-black text-xs font-bold px-4 py-1 rounded-bl-xl">
            MELHOR ESCOLHA
          </div>

          <div className="flex flex-col gap-6">
            <div className="space-y-2 border-b border-zinc-800 pb-6">
               <h3 className="text-xl font-bold text-white">Plano Vitalício LionFit</h3>
               <div className="flex items-end gap-2">
                 <span className="text-zinc-500 text-lg line-through font-medium">R$ 297,00</span>
                 <span className="text-4xl font-black text-lion-500">R$ 97,00</span>
                 <span className="text-zinc-400 text-sm mb-1">/único</span>
               </div>
            </div>

            <ul className="space-y-3">
              {[
                "Acesso vitalício ao app",
                "Treinos Personalizados",
                "Guia de Nutrição Incluso",
                "Comunidade VIP",
                "Suporte 24/7"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-zinc-300">
                  <div className="bg-lion-500/20 p-1 rounded-full">
                    <Check className="w-3 h-3 text-lion-500" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Social Proof */}
        <div className="bg-zinc-900/50 rounded-xl p-4 flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full bg-zinc-700 border-2 border-zinc-900" />
            ))}
          </div>
          <div>
            <div className="flex text-lion-500 mb-1">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
            </div>
            <p className="text-xs text-zinc-400"><span className="text-white font-bold">4.9/5</span> de satisfação</p>
          </div>
        </div>

      </div>

      {/* Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent z-40 pb-6">
        <div className="max-w-md mx-auto">
          <Button 
            fullWidth 
            pulse 
            variant="primary" 
            className="text-lg h-16 shadow-[0_0_30px_rgba(245,158,11,0.4)]"
            onClick={handleRedirect}
          >
             <Lock className="w-5 h-5 mr-1" />
             QUERO MEU DESCONTO
          </Button>
          <p className="text-center text-[10px] text-zinc-600 mt-3 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Compra 100% Segura e Garantida
          </p>
        </div>
      </div>

    </div>
  );
};
