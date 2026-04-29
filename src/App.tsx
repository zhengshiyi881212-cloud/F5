import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { InteractiveMap } from './components/InteractiveMap';
import { SurveyAnalysis } from './components/SurveyCharts';
import { IntimateVoices } from './components/InterviewSection';
import { ExpertView } from './components/ExpertSection';
import { IntroSection } from './components/IntroSection';
import { ExpertData } from './components/ExpertData';
import { Cpu, Heart, Globe, Menu, X, ArrowDown, Sparkles } from 'lucide-react';
import { cn } from './lib/utils';

function Hero() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 text-center bg-gradient-to-br from-brand-blue via-brand-cream to-brand-peach">
      {/* Background visual element */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30">
        <motion.div 
           animate={{ 
             rotate: 360,
             scale: [1, 1.05, 1]
           }}
           transition={{ 
             rotate: { duration: 60, repeat: Infinity, ease: "linear" },
             scale: { duration: 15, repeat: Infinity, ease: "easeInOut" }
           }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw]"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full stroke-brand-text/5 stroke-[0.05] fill-none">
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="35" strokeDasharray="1 2" />
            <circle cx="50" cy="50" r="25" />
          </svg>
        </motion.div>
      </div>

      <div className="relative z-10 space-y-8 max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="flex items-center justify-center gap-4 text-accent-blue uppercase tracking-[0.5em] text-[10px] font-display font-semibold"
        >
          <Cpu className="w-4 h-4" />
          <span>News Feature : Interaction 4.0</span>
          <Heart className="w-4 h-4 fill-accent-pink stroke-accent-pink" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-5xl md:text-[6.5rem] font-display font-bold leading-[1.1] tracking-tight text-brand-text"
        >
          人機關係轉變 <br />
          <span className="text-accent-pink italic font-serif text-[0.8em] block mt-4">AI時代下的類社交</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl md:text-2xl text-brand-text/60 font-serif italic max-w-2xl mx-auto"
        >
          Investigating the evolving boundaries of digital intimacy and the emotional architecture of AI companions.
          <br />
          <span className="text-sm uppercase tracking-widest mt-4 block not-italic font-sans font-medium text-brand-text/40">探究人与AI的亲密关系</span>
        </motion.p>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-brand-text/20"
      >
        <ArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}

function Conclusion() {
  return (
    <section className="pt-20 pb-48 px-6 md:px-12 bg-transparent relative">
       <div className="max-w-4xl mx-auto text-center space-y-16">
          <div className="space-y-6">
            <div className="h-1.5 w-24 bg-accent-blue/30 mx-auto rounded-full" />
          </div>
          
          <div className="space-y-8 text-lg md:text-xl text-brand-text/80 font-sans leading-relaxed text-left max-w-3xl mx-auto">
            <p>
              2026 年，生成式 AI 已深度滲透進人類的情感領域 。調查顯示，當代年輕人對 AI 的定位已從單純的「效率工具」延伸至「情緒樹洞」甚至「靈魂伴侶」，這種關係本質上是由AI語言模型高速發展而產生的「類社交關係」。然而，這種新型關係也伴隨著模型迭代帶來的「心理創傷」以及用戶可能喪失現實社交能力的風險。
            </p>
            <p>
              隨著AI陪伴市場的規模化增長，與人工智能建立親密關係正逐漸成為一種社會常態 。在技術提供情緒價值需求的同時，如何平衡與AI的虛擬互動和現實社交，將是這一代年輕人必須面對的考驗。
            </p>
          </div>
       </div>
    </section>
  );
}

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 py-6",
        scrolled ? "bg-white/80 backdrop-blur-2xl py-4 border-b border-black/5" : "bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
             <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-accent-blue/20">
                <Globe className="w-4 h-4 text-white" />
             </div>
             <span className="font-display font-bold tracking-widest uppercase text-sm text-brand-text">INTIMACY.AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[10px] uppercase font-display tracking-[0.25em] font-semibold text-brand-text/50">
            <a href="#mapping" className="hover:text-accent-pink transition-colors">Mapping</a>
            <a href="#data" className="hover:text-accent-pink transition-colors">Data</a>
            <a href="#voices" className="hover:text-accent-pink transition-colors">Voices</a>
            <a href="#experts" className="hover:text-accent-pink transition-colors">Experts</a>
          </div>

          <button className="p-2 md:hidden">
            <Menu className="w-6 h-6 text-brand-text" />
          </button>
        </div>
      </nav>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent-pink z-[60] origin-left"
        style={{ scaleX }}
      />
    </>
  );
}

function BackgroundDecor() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
      
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="bg-blob w-[500px] h-[500px] bg-accent-blue/40 top-[-10%] left-[-10%]"
      />
      <motion.div 
        animate={{ 
          x: [0, -70, 0],
          y: [0, 150, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="bg-blob w-[600px] h-[600px] bg-accent-pink/30 bottom-[10%] right-[-15%]"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="bg-blob w-[400px] h-[400px] bg-brand-mint/50 top-[40%] left-[20%]"
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen selection:bg-accent-pink selection:text-white bg-brand-cream/50">
      <BackgroundDecor />
      <Navigation />
      <Hero />
      <IntroSection />
      <InteractiveMap />
      <SurveyAnalysis />
      <IntimateVoices />
      <ExpertView />
      <ExpertData />
      <Conclusion />
    </div>
  );
}
