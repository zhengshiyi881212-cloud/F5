import React from 'react';
import { motion } from 'motion/react';
import { Brain, Sparkles, Shield } from 'lucide-react';

export function ExpertView() {
  return (
    <section id="experts" className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="mb-24 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-accent-blue text-[10px] font-display tracking-[0.4em] uppercase mb-4 block font-bold"
        >
          Theoretical Perspectives / 专家访谈
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-display font-bold inline-block relative text-brand-text">
          专家访谈
          <div className="absolute -bottom-4 left-0 w-full h-1.5 bg-accent-blue/20 rounded-full" />
        </h2>
      </div>

      <div className="space-y-32">
        <ExpertCard 
          image="https://i.imgur.com/fCan4r7.png"
          icon={<Brain className="w-6 h-6 text-accent-blue" />}
          title="劉錦東，現任香港教育大學助理教授。劉教授先後畢業於英國倫敦國王學院（學士）與香港中文大學（碩士及博士），長期深耕於人機親密關係、AI 伴侶及人工智能倫理領域。其研究致力於探討 AI 技術如何塑造現代年輕人的情感投射與社交模式，並為 AI 產品的倫理邊界與社會影響提供前瞻性的學術視角。"
          expert="劉錦東"
          role="Assistant Professor / 香港教育大學"
          quote=""
          reversed={false}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-24 p-12 md:p-16 bg-white/50 backdrop-blur-md rounded-[3rem] border border-black/5 max-w-4xl mx-auto text-left space-y-6"
      >
        <p className="text-brand-text/70 font-sans leading-relaxed">
          劉教授把目前的 AI 關係定義為，既不親密也不冷漠的「類社交關係」。劉錦東教授指出，人與 AI 的感情，並非是傳統意義上的情感關係，而是一種被科技極度放大的類社交關係。
        </p>
        <p className="text-brand-text/70 font-sans leading-relaxed">
          在這個定義下，人機關係發展就會進入了一個新型模式。它既不像現實戀愛，包含負面情緒影響，也不像計算機那樣冷漠無情。但是許多年輕人並非分不清虛擬與現實，而是清醒地將 AI 視作一個介於工具與人類之間的個體。另外，他們甚至在擁有現實伴侶的同時，依然保留著 AI，並陪伴著他們，是因為兩者在情感圖譜上承擔著完全不同的功能。
        </p>
        <p className="text-brand-text/70 font-sans leading-relaxed">
          那麼這種既不親密也不冷漠的類社交關係的成因是什麼呢？劉教授認為是 AI 具有這三個特性而促成的。首先，在東亞社會高壓的生存環境下，真實的社交往往伴隨著提供更多的情緒價值。「人再怎麼努力也是要睡覺的，但 AI 可以 24 小時在線。」劉教授指出。AI 陪伴的功能營造出零壓力的社交環境。在 AI 的陪伴下，年輕人不需要察言觀色，不需要擔心被評判，更容易展現出自己更真實的一面。
        </p>
      </motion.div>
    </section>
  );
}

function ExpertCard({ image, icon, title, expert, role, quote, reversed }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 lg:gap-20`}
    >
      <div className="w-full md:w-5/12 relative group">
        <div className="absolute inset-0 bg-accent-blue/5 rounded-[4rem] -rotate-3 transition-transform group-hover:rotate-0 duration-700" />
        <img 
          src={image} 
          alt={expert} 
          className="w-full h-auto object-contain rounded-[3.5rem] relative z-10 shadow-2xl border-4 border-white"
          referrerPolicy="no-referrer"
        />
        <div className="mt-8 p-6 bg-white rounded-3xl shadow-xl border border-black/5 relative z-20 mx-4 md:mx-0">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-brand-cream rounded-xl">{icon}</div>
              <div>
                <h4 className="text-xl font-display font-bold text-brand-text">{expert}</h4>
                <p className="text-xs text-accent-blue font-display uppercase tracking-widest font-bold">{role}</p>
              </div>
           </div>
        </div>
      </div>

      <div className="w-full md:w-7/12 relative">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="relative bg-white p-12 md:p-16 rounded-[4rem] shadow-xl shadow-black/[0.02] border border-black/5"
        >
          {/* Bubble tail decoration */}
          <div className={`absolute top-1/2 -translate-y-1/2 ${reversed ? '-right-4' : '-left-4'} w-8 h-8 bg-white rotate-45 border-black/5 border-b border-l hidden md:block`} />
          
          <div className="space-y-6">
            <h4 className="text-lg md:text-xl font-sans text-brand-text/70 leading-relaxed">{title}</h4>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
