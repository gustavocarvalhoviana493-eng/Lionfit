
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, ShieldCheck, Lock, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 mt-20 relative z-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Sponsors / As Seen On */}
        <div className="border-b border-zinc-900 pb-12 mb-12">
          <p className="text-center text-zinc-600 text-xs font-bold uppercase tracking-[0.2em] mb-8">
            Parceiros e Mídia
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale transition-opacity duration-300 hover:opacity-100 hover:grayscale-0">
             {/* Simulated Logos using text/svg concepts for a premium look */}
             <div className="text-xl font-black text-white tracking-tighter">MEN'S HEALTH</div>
             <div className="text-xl font-black text-white italic">NIKE<span className="text-lion-500">TRAINING</span></div>
             <div className="text-xl font-bold text-white flex items-center gap-1"><div className="w-6 h-6 bg-white rounded-full"></div> GYMPASS</div>
             <div className="text-xl font-black text-white tracking-widest">FORBES</div>
             <div className="text-xl font-bold text-white">SMART<span className="text-lion-500">FIT</span></div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-lion-500 p-1.5 rounded-md">
                <div className="w-4 h-4 bg-black rounded-sm" />
              </div>
              <h2 className="text-xl font-black tracking-widest text-white uppercase">LionFit</h2>
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              A plataforma de treinos mais completa do mercado. Junte-se a mais de 15.000 alunos e transforme seu corpo com nossa tecnologia exclusiva.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="bg-zinc-900 p-2 rounded-full hover:bg-lion-500 hover:text-black transition-colors text-zinc-400">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="bg-zinc-900 p-2 rounded-full hover:bg-lion-500 hover:text-black transition-colors text-zinc-400">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-zinc-900 p-2 rounded-full hover:bg-lion-500 hover:text-black transition-colors text-zinc-400">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="bg-zinc-900 p-2 rounded-full hover:bg-lion-500 hover:text-black transition-colors text-zinc-400">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-wider text-xs">Empresa</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-lion-500 transition-colors">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-lion-500 transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-lion-500 transition-colors">Blog Oficial</a></li>
              <li><a href="#" className="hover:text-lion-500 transition-colors">Imprensa</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-wider text-xs">Suporte</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li><a href="#" className="hover:text-lion-500 transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-lion-500 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-lion-500 transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-lion-500 transition-colors">Contato</a></li>
            </ul>
          </div>

        </div>

        {/* Security & Copyright */}
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <p className="text-zinc-600 text-xs">
            © 2024 LionFit Technology. Todos os direitos reservados. CNPJ 00.000.000/0001-00
          </p>

          <div className="flex items-center gap-6 opacity-70">
            <div className="flex items-center gap-1 text-zinc-500 text-xs font-medium">
               <Lock className="w-3 h-3 text-lion-500" />
               <span>SSL Blindado</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-500 text-xs font-medium">
               <ShieldCheck className="w-3 h-3 text-lion-500" />
               <span>Google Safe</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-500 text-xs font-medium">
               <Globe className="w-3 h-3 text-lion-500" />
               <span>Site Verificado</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
