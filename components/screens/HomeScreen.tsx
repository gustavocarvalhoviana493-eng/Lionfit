
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Activity, Dumbbell, TrendingUp, UserCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { Footer } from '../ui/Footer';

interface HomeScreenProps {
  onStart: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStart }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  };

  const cards = [
    {
      title: "Melhore Seus Treinos",
      desc: "Treinos otimizados para você evoluir mais rápido e com consistência.",
      icon: Dumbbell,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
      color: "from-lion-500 to-lion-600"
    },
    {
      title: "Resultados Rápidos",
      desc: "Métodos comprovados que aceleram sua evolução e aumentam seu desempenho.",
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Feito Para Você",
      desc: "Recomendações personalizadas de acordo com seu objetivo e nível atual.",
      icon: UserCheck,
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop",
      color: "from-yellow-400 to-lion-500"
    }
  ];

  // Auto-scroll logic
  useEffect(() => {
    const scrollContainer = carouselRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      if (isPaused) return;

      const cardWidth = scrollContainer.offsetWidth;
      const currentScroll = scrollContainer.scrollLeft;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      
      // Calculate next position
      let nextScroll = currentScroll + cardWidth;
      
      // If we are near the end (tolerance of 10px), loop back to start
      if (currentScroll >= maxScroll - 10) {
        nextScroll = 0;
      }

      scrollContainer.scrollTo({
        left: nextScroll,
        behavior: 'smooth'
      });

    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-x-hidden">
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full z-30 flex flex-col items-center text-center space-y-8 pt-6 px-6 pb-10"
      >
        {/* Logo/Brand */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4 pt-8">
          <div className="bg-lion-500/90 backdrop-blur p-2 rounded-lg shadow-lg shadow-lion-500/20">
            <Activity className="text-black w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-widest text-white uppercase drop-shadow-md">LionFit</h1>
        </motion.div>

        {/* Hero Text */}
        <motion.div variants={itemVariants} className="space-y-4 max-w-lg mx-auto">
          <h1 className="text-5xl md:text-7xl font-black leading-[0.9] text-white drop-shadow-xl">
            TREINE COMO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lion-400 to-lion-600 filter drop-shadow-lg">
              UMA FERA
            </span>
          </h1>
          <p className="text-zinc-200 text-lg font-medium leading-relaxed drop-shadow-md max-w-xs mx-auto md:max-w-md">
            Plano de treino 100% personalizado para o seu corpo e objetivo. Resultados visíveis em 30 dias.
          </p>
        </motion.div>

        {/* Persuasive Hook */}
        <motion.div 
          variants={itemVariants}
          className="bg-black/60 backdrop-blur-md border border-lion-500/40 p-4 rounded-2xl w-full max-w-md mx-auto shadow-2xl"
        >
          <p className="text-sm font-semibold text-zinc-200">
            <span className="text-lion-400 mr-2 animate-pulse">🔥 OFERTA RELÂMPAGO</span>
            Aperte em <span className="text-white font-bold">COMEÇAR</span> e ganhe até <span className="text-lion-500 text-lg font-black">99% OFF</span>.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="w-full max-w-md mx-auto pt-4 pb-12">
          <Button onClick={onStart} fullWidth pulse className="text-lg h-16 shadow-[0_0_40px_rgba(245,158,11,0.3)] border-t border-white/20">
            COMEÇAR AGORA
            <ChevronRight className="w-6 h-6" />
          </Button>
          <div className="mt-6 flex items-center justify-center gap-2 opacity-80">
             <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-zinc-400 border border-black" />
                <div className="w-6 h-6 rounded-full bg-zinc-300 border border-black" />
                <div className="w-6 h-6 rounded-full bg-zinc-200 border border-black" />
             </div>
             <p className="text-xs text-zinc-300 font-bold tracking-wide">+15.000 Alunos Ativos</p>
          </div>
        </motion.div>

        {/* NEW SECTION: Por que o LionFit? (Carousel) */}
        <motion.div variants={itemVariants} className="w-full pt-8 text-left max-w-md mx-auto">
          <div className="mb-6 px-1">
            <h2 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
              <span className="w-1 h-6 bg-lion-500 rounded-full inline-block"/>
              Por que o LionFit?
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Apenas no LionFit você evolui com treinos inteligentes, personalizados e feitos para o seu ritmo.
            </p>
          </div>

          {/* Scrollable Carousel Container */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory pb-12 scrollbar-hide w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {cards.map((card, idx) => (
              <div 
                key={idx} 
                className="snap-center shrink-0 min-w-full w-full px-1"
              >
                <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-zinc-800 hover:border-lion-500/50 transition-all duration-500 group bg-zinc-900">
                  
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                    />
                    {/* Gradient Overlay for Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-100" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end relative z-10">
                    {/* Icon Badge */}
                    <div className="absolute top-6 right-6 w-14 h-14 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                      <card.icon className="text-lion-400 w-7 h-7" />
                    </div>

                    <div className="transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className={`h-1.5 w-16 bg-gradient-to-r ${card.color} mb-5 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]`} />
                      <h3 className="text-3xl font-black text-white mb-4 leading-tight drop-shadow-lg">
                        {card.title}
                      </h3>
                      <p className="text-zinc-200 text-base font-medium leading-relaxed drop-shadow-md">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-[-30px] mb-8">
             {cards.map((_, idx) => (
               <div key={idx} className="w-2 h-2 rounded-full bg-zinc-800" />
             ))}
          </div>

        </motion.div>
      </motion.div>
      
      <Footer />
    </div>
  );
};
