import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  pulse?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  fullWidth = false,
  pulse = false,
  ...props 
}) => {
  const baseStyles = "relative font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-lion-500 to-lion-600 text-white shadow-lg shadow-lion-500/20 hover:shadow-lion-500/40 border border-lion-400/20",
    outline: "bg-transparent border-2 border-zinc-700 text-zinc-300 hover:border-lion-500 hover:text-lion-500",
    ghost: "bg-transparent text-zinc-400 hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${fullWidth ? 'w-full' : ''} 
        ${pulse ? 'animate-glow' : ''}
        ${className}
      `}
      {...props}
    >
      {/* Shine effect overlay */}
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      )}
      <span className="relative z-20 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};