/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Menu, 
  X, 
  Youtube, 
  Instagram, 
  Twitter, 
  ArrowRight, 
  Hammer, 
  Bone, 
  Cpu, 
  Globe, 
  Clock, 
  Rocket,
  Search,
  Mail,
  Download,
  ChevronRight
} from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import VideoCard from './components/ArtistCard'; // Using the refactored card
import AIChat from './components/AIChat';
import { Video } from './types';

// Data
const LATEST_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'A Engenharia por trás das Turbinas',
    category: 'Engenharia Mecânica',
    thumbnail: 'https://images.unsplash.com/photo-1535930248460-c3d3869d0c6d?q=80&w=1000&auto=format&fit=crop',
    views: '250K',
    duration: '14:20',
    description: 'Como transformamos vento e calor em energia cinética massiva? Uma análise detalhada dos componentes.'
  },
  {
    id: '2',
    title: 'O Fim dos Dinossauros: Geocronologia',
    category: 'Paleontologia',
    thumbnail: 'https://images.unsplash.com/photo-1519702209772-23c343b9c96b?q=80&w=1000&auto=format&fit=crop',
    views: '180K',
    duration: '22:15',
    description: 'Analisando a camada K-Pg e os isótopos que revelam a data exata do impacto de Chicxulub.'
  },
  {
    id: '3',
    title: 'James Webb: Olhando para o Passado',
    category: 'Astronomia',
    thumbnail: 'https://images.unsplash.com/photo-1614730341194-75c607400070?q=80&w=1000&auto=format&fit=crop',
    views: '320K',
    duration: '18:45',
    description: 'As primeiras galáxias e a luz infravermelha. O que o novo telescópio realmente descobriu?'
  }
];

const THEMES = [
  { name: 'Mecânica', icon: Hammer, desc: 'Engrenagens & Motores' },
  { name: 'Paleonto', icon: Bone, desc: 'Fósseis & História' },
  { name: 'Cosmos', icon: Rocket, desc: 'Astronomia & Espaço' },
  { name: 'Civil', icon: Globe, desc: 'Estruturas & Obras' },
  { name: 'Tempo', icon: Clock, desc: 'Geocronologia' },
  { name: 'Tech', icon: Cpu, desc: 'Futuro & Inovação' },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const Logo = ({ className }: { className?: string }) => (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Provided Logo URL */}
      <img 
        src="https://i.imgur.com/G5OQd8Y.png" 
        alt="VITTIN Logo" 
        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(242,152,73,0.3)]"
      />
    </div>
  );

  return (
    <div className="relative min-h-screen text-white selection:bg-[#f29849] selection:text-[#264039] cursor-auto md:cursor-none overflow-x-hidden font-sans">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 bg-[#264039]/80 backdrop-blur-md border-b border-[#8c4c27]/30">
        <div className="flex items-center gap-4 z-50">
          <div className="w-10 h-10 md:w-12 md:h-12">
            <Logo />
          </div>
          <span className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white">VITTIN</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-medium tracking-widest uppercase items-center">
          {['Séries', 'Sobre', 'Recursos'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
              className="text-[#f29f8d] hover:text-[#f29849] transition-colors cursor-pointer bg-transparent border-none font-bold"
              data-hover="true"
            >
              {item}
            </button>
          ))}
          <a 
            href="https://youtube.com" 
            target="_blank"
            className="flex items-center gap-2 bg-[#f29849] text-[#264039] px-6 py-2 rounded-sm font-bold uppercase tracking-wider hover:bg-[#d97d30] transition-all transform hover:-translate-y-1 shadow-[0_4px_0_#8c4c27]"
            data-hover="true"
          >
            <Youtube className="w-4 h-4" />
            Assinar
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-[#f29849] z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-30 bg-[#264039] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Séries', 'Sobre', 'Recursos'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
                className="text-4xl font-heading font-bold text-[#f29f8d] uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <a href="https://youtube.com" className="mt-8 bg-[#f29849] text-[#264039] px-10 py-4 text-lg font-bold uppercase rounded shadow-lg">
              Assinar no YouTube
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="hero" className="relative pt-32 pb-20 md:min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 md:px-12">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 z-10 flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#507306] rounded-full bg-[#507306]/20 text-[#f29f8d] text-xs font-mono uppercase mb-6 tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#f29849] animate-pulse"></span>
              Ciência • Engenharia • História
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] mb-6 text-white">
              VITTIN <br />
              <GradientText text="DA TERRA" /> <br />
              <span className="text-outline">AO ESPAÇO</span>
            </h1>

            <p className="text-lg md:text-xl text-[#f29f8d]/80 font-light max-w-lg leading-relaxed mb-8 border-l-2 border-[#f29849] pl-6">
              Engenharia, fósseis e cosmos explicados com curiosidade e exatidão. Uma jornada do núcleo terrestre às galáxias distantes.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                 className="bg-[#f29849] text-[#264039] px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white transition-all duration-300 flex items-center gap-2 rounded-sm shadow-[4px_4px_0px_#8c4c27]"
                 data-hover="true"
              >
                <Youtube className="w-5 h-5" /> Assinar Agora
              </button>
              <button 
                 onClick={() => scrollToSection('series')}
                 className="border border-[#f29f8d] text-[#f29f8d] px-8 py-4 text-sm font-bold tracking-widest uppercase hover:bg-[#f29f8d] hover:text-[#264039] transition-all duration-300 rounded-sm"
                 data-hover="true"
              >
                Ver Séries
              </button>
            </div>
          </motion.div>

          {/* Right/Center Visuals */}
          <div className="lg:col-span-6 relative h-[500px] md:h-[700px] flex items-center justify-center">
             {/* Hologram Effect Background */}
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
               className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-[#507306]/30 rounded-full border-dashed"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="absolute w-[300px] h-[300px] md:w-[450px] md:h-[450px] border border-[#f29849]/20 rounded-full"
             />

             {/* Hologram Center Icon (Abstract Engine/Planet mix) */}
             <motion.div 
               className="absolute z-0 opacity-50 mix-blend-screen"
               animate={{ 
                 scale: [1, 1.1, 1],
                 opacity: [0.4, 0.7, 0.4] 
               }}
               transition={{ duration: 4, repeat: Infinity }}
             >
                <img src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png" className="w-64 h-64 invert opacity-40 blur-sm" alt="Hologram" />
             </motion.div>

             {/* Presenter Image */}
             <motion.div
               initial={{ opacity: 0, y: 50 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3, duration: 0.8 }}
               className="relative z-10 w-full h-full flex items-end justify-center"
             >
               {/* Presenter Masked Image */}
               <img 
                 src="https://images.unsplash.com/photo-1542596768-5d1d21f1cfbc?q=80&w=1000&auto=format&fit=crop" 
                 alt="Vittin Apresentador" 
                 className="h-[90%] object-contain drop-shadow-[0_0_50px_rgba(38,64,57,0.8)] mask-image-gradient"
                 style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
               />
               
               {/* Floating Overlay Badge */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute bottom-20 right-0 md:right-10 bg-[#264039]/90 backdrop-blur-md border border-[#f29849] p-4 rounded-lg shadow-xl max-w-[200px]"
               >
                 <div className="text-[#f29849] text-xs font-bold uppercase mb-1">Último Vídeo</div>
                 <div className="text-white text-sm leading-tight">Análise Estrutural: Pontes Romanas</div>
               </motion.div>
             </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#f29f8d]/50"
           animate={{ y: [0, 10, 0] }}
           transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] uppercase tracking-widest">Explorar</span>
          <ArrowRight className="rotate-90 w-4 h-4" />
        </motion.div>
      </header>

      {/* THEMES SECTION */}
      <section className="py-20 bg-[#223832] border-y border-[#8c4c27]/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">TEMAS</h2>
              <div className="h-1 w-20 bg-[#f29849]"></div>
            </div>
            <p className="text-[#f29f8d] max-w-md text-right mt-4 md:mt-0">
              Uma abordagem multidisciplinar para entender como o mundo foi construído e para onde estamos indo.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {THEMES.map((theme, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, backgroundColor: 'rgba(80, 115, 6, 0.2)' }}
                className="bg-[#264039] border border-[#8c4c27]/30 p-6 rounded-lg flex flex-col items-center text-center gap-3 transition-colors cursor-default group"
              >
                <div className="p-3 bg-[#264039] rounded-full border border-[#507306] group-hover:border-[#f29849] transition-colors">
                  <theme.icon className="w-6 h-6 text-[#f29f8d] group-hover:text-[#f29849]" />
                </div>
                <h3 className="font-bold text-white uppercase tracking-wider text-sm">{theme.name}</h3>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{theme.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST VIDEOS SECTION */}
      <section id="series" className="py-24 max-w-7xl mx-auto px-4 md:px-12">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-2 h-10 bg-[#f29849]"></div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white">Últimos Vídeos</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LATEST_VIDEOS.map((video, index) => (
            <VideoCard key={video.id} video={video} index={index} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="group flex items-center gap-3 text-[#f29f8d] hover:text-[#f29849] font-heading font-bold tracking-widest uppercase transition-colors" data-hover="true">
            Ver canal completo <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* ABOUT CREATOR SECTION */}
      <section id="sobre" className="py-20 relative">
        <div className="absolute inset-0 bg-[#8c4c27]/10 skew-y-3 transform origin-top-left -z-10 h-full w-full" />
        <div className="max-w-7xl mx-auto px-4 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="order-2 md:order-1 relative">
             <div className="absolute -inset-4 border-2 border-[#507306] rounded-lg opacity-30 translate-x-4 translate-y-4"></div>
             <img 
               src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000&auto=format&fit=crop" 
               alt="Quem é Vittin?" 
               className="w-full h-[500px] object-cover rounded-lg grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
             />
          </div>

          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              O CRIADOR <span className="text-[#f29849]">.</span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Apaixonado por entender como as coisas funcionam — sejam máquinas modernas ou ecossistemas pré-históricos. VITTIN nasceu da vontade de conectar a engenharia bruta com a ciência pura.
            </p>
            
            <ul className="space-y-6">
              {[
                { title: 'Engenharia Civil', desc: 'Análise estrutural e grandes obras.' },
                { title: 'Paleontologia Amadora', desc: 'Colecionador e entusiasta de fósseis.' },
                { title: '+500k Inscritos', desc: 'Comunidade apaixonada por ciência.' },
                { title: 'Didática Visual', desc: 'Explicações complexas simplificadas.' }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-2 h-2 bg-[#f29849] rotate-45" />
                  <div>
                    <strong className="text-white block font-heading uppercase tracking-wide">{item.title}</strong>
                    <span className="text-[#f29f8d] text-sm">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* RESOURCES & NEWSLETTER */}
      <section id="recursos" className="py-24 px-4 md:px-12 bg-gradient-to-b from-[#264039] to-[#1a2e29]">
        <div className="max-w-5xl mx-auto bg-[#264039] border border-[#8c4c27] p-8 md:p-16 rounded-2xl shadow-2xl relative overflow-hidden">
          {/* Decorative background lines */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-repeat opacity-5" style={{ backgroundImage: 'radial-gradient(#f29849 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
          
          <div className="relative z-10 text-center">
            <Mail className="w-12 h-12 text-[#f29849] mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">BOLETIM CIENTÍFICO</h2>
            <p className="text-[#f29f8d] mb-8 max-w-lg mx-auto">
              Receba resumos dos vídeos, referências bibliográficas e downloads de modelos 3D exclusivos toda semana.
            </p>

            <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-[#1a2e29] border border-[#507306] text-white px-6 py-4 rounded focus:outline-none focus:border-[#f29849] placeholder-[#f29f8d]/30"
              />
              <button className="bg-[#f29849] text-[#264039] px-8 py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors rounded">
                Inscrever
              </button>
            </form>

            <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center gap-2 group cursor-pointer" data-hover="true">
                 <Download className="w-6 h-6 text-[#507306] group-hover:text-[#f29849] transition-colors" />
                 <span className="text-xs uppercase font-bold text-gray-400">Modelos 3D</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer" data-hover="true">
                 <Search className="w-6 h-6 text-[#507306] group-hover:text-[#f29849] transition-colors" />
                 <span className="text-xs uppercase font-bold text-gray-400">Referências</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer" data-hover="true">
                 <Globe className="w-6 h-6 text-[#507306] group-hover:text-[#f29849] transition-colors" />
                 <span className="text-xs uppercase font-bold text-gray-400">Comunidade</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer" data-hover="true">
                 <Rocket className="w-6 h-6 text-[#507306] group-hover:text-[#f29849] transition-colors" />
                 <span className="text-xs uppercase font-bold text-gray-400">Wallpaper</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1a2e29] border-t border-[#507306]/30 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
               <div className="w-8 h-8 opacity-50"><Logo /></div>
               <span className="font-heading text-2xl font-bold text-white">VITTIN</span>
            </div>
            <p className="text-xs text-[#f29f8d]/50 max-w-xs">
              © 2024 VITTIN. Engenharia, Ciência e Exploração. <br/> Todos os direitos reservados.
            </p>
          </div>

          <div className="flex gap-8">
            <a href="#" className="text-[#f29f8d] hover:text-[#f29849] transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="text-[#f29f8d] hover:text-[#f29849] transition-colors"><Twitter className="w-6 h-6" /></a>
            <a href="#" className="text-[#f29f8d] hover:text-[#f29849] transition-colors"><Youtube className="w-6 h-6" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;