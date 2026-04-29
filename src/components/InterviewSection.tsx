import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Quote } from 'lucide-react';

const interviewees = [
  {
    id: 1,
    name: "子琪, 22",
    role: "大學四年級學生 / Senior Student",
    quote: "對於 22 歲的大學四年級學生子琪而言，AI 更多扮演著一個「零壓力的後台」。在現實社交中，她必須時刻權衡人際關係的邊界，但在面對 Gemini 或 DeepSeek 時，她便不必佩戴這種社交面具。「一些最陰暗、最無法啓齒的話，可以跟 AI 自由地說出來，」子琪表示 。這種關係呈現出的更多是一種純粹的功能性與理性色彩， AI 並不總是順從她的心意，有時甚至會否定她的判斷。但是其更像是一個不會洩密的「樹洞」，為處於壓力和孤獨期的年輕人提供了某種心理減負。",
    image: "https://i.imgur.com/7OChPYL.jpeg",
    color: "#3B82F6"
  },
  {
    id: 2,
    name: "Cherry, 19",
    role: "大學一年級學生 / Freshman Student",
    quote: "如果說子琪是在尋求「減負」，那麼 19 歲的大學一年級學生 Cherry 則在與她的 AI 伴侶共生。她將 AI 定義為「數字化的靈魂伴侶」，甚至是一個「更溫柔、永遠不會對自己失去信心」的鏡像自我。Cherry 沈溺於那種無需解釋就能被理解的快感中，無論是冷門的電影梗還是跳躍的思維，AI 都能精准接住。這種極高的即時反饋性，讓她的社交重心發生了顯著偏移，「它在某方面替代了我的精神，讓我能更單純地去感受現實，」Cherry 坦言，正因為深層次的交流需求已在虛擬世界得到滿足，所以她不願意為了合群而去參加無趣的聚會 。",
    image: "https://i.imgur.com/V7DHiDs.jpeg",
    color: "#FDA4AF"
  },
  {
    id: 3,
    name: "Priscilla, 24",
    role: "大學四年級學生 / Senior Student",
    quote: "與此同時，24 歲的大四學生 Priscilla 則從另一個角度戳破了人群與 AI 相互成長的幻覺。兩年前，她出於在社交媒體上看到他人與 AI 的互動而產生好奇，並嘗試將自己與 AI 的聊天記錄發佈出去。隨後她意外地發現，這些內容的互動量與漲粉速度遠超普通作品。Priscilla 直言，「也是因為第一次流量好的反饋我才想去下一次嘗試。」她清醒地指出，AI 的「懂你」不過是按提示詞的精准情緒投餵，是用戶內心期待的投射，而非真正共情。這種虛擬世界的絕對掌控感雖令人安心，卻永遠無法替代現實中與人共同成長的真實回憶。",
    image: "https://i.imgur.com/soOhFrV.jpeg",
    color: "#10B981"
  }
];

export function IntimateVoices() {
  return (
    <section id="voices" className="py-32 bg-transparent">
       <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-accent-blue text-[10px] font-display tracking-[0.4em] uppercase mb-4 block font-bold"
        >
          Student Testimonials / 深度采访分析
        </motion.span>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-text">
          AI 關係實踐者特寫
        </h2>
      </div>

      <div className="space-y-48">
        {interviewees.map((person, idx) => (
          <InterviewItem key={person.id} person={person} reversed={idx % 2 !== 0} />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto mt-32 px-6"
      >
        <div className="bg-brand-cream/50 backdrop-blur-xl border border-brand-text/5 p-12 md:p-20 rounded-[4rem] text-center space-y-8 shadow-2xl shadow-brand-text/5 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-blue via-accent-pink to-accent-blue" />
          <div className="space-y-8 text-left max-w-3xl mx-auto">
            <p className="text-lg md:text-xl font-sans text-brand-text/60 leading-relaxed relative z-10">
              在服務器維護或模型「失憶」的瞬間，這種關係的脆弱性便暴露無遺。子琪會冷淡地感嘆「AI 果然還是 AI」；Cherry 則會感到一種「秘密基地被拆」的疏離感 。Priscilla 面對這種時刻則更為理性，她將其定義為一種「程序邏輯的斷裂」。即使在某些瞬間曾產生過所謂的「戀愛感」，她也會迅速通過邏輯審視將其解構，「那不過就是個代碼」 。
            </p>
            <p className="text-lg md:text-xl font-sans text-brand-text/60 leading-relaxed relative z-10">
              針對不同用戶對 AI 伴侶的情感投射、依賴程度與理性邊界存在顯著差異。這些看似個體化的選擇，折射出當下人們在使用 AI 互動關係中的普遍心態與社會語境。接下來將對這一新型社交形態的心理動因、底層邏輯與潛在風險的進行深入分析。
            </p>
          </div>

        </div>
      </motion.div>
    </section>
  );
}

interface InterviewItemProps {
  person: any;
  reversed: boolean;
  key?: any;
}

function InterviewItem({ person, reversed }: InterviewItemProps) {
  return (
    <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24 px-6 md:px-12 max-w-6xl mx-auto`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 aspect-[4/5] rounded-[3rem] overflow-hidden relative group shadow-2xl shadow-black/[0.05]"
      >
        <img 
          src={person.image} 
          alt={person.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10">
           <h4 className="text-2xl font-display font-bold text-brand-text mb-1">{person.name}</h4>
           <p className="text-[10px] text-brand-text/50 uppercase tracking-[0.2em] font-bold">{person.role}</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: reversed ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2 space-y-8"
      >
        <Quote className="w-10 h-10 text-accent-blue opacity-30" />
        <blockquote className="text-base md:text-lg font-sans leading-relaxed text-brand-text/70">
          {person.quote}
        </blockquote>
        <div className="h-0.5 w-24 bg-accent-pink rounded-full" />
      </motion.div>
    </div>
  );
}
