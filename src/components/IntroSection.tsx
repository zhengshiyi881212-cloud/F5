import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export function IntroSection() {
  return (
    <section className="py-32 px-6 md:px-12 bg-white/20 backdrop-blur-sm relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="w-16 h-16 bg-accent-pink/10 rounded-full flex items-center justify-center mx-auto"
        >
          <Quote className="w-8 h-8 text-accent-pink" />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-12 md:p-20 rounded-[4rem] text-xl md:text-2xl font-serif italic text-brand-text/80 leading-relaxed text-left space-y-12 max-w-5xl mx-auto relative overflow-hidden"
        >
          {/* Subtle background glow for the box */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-blue/5 blur-3xl rounded-full -mr-16 -mt-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-pink/5 blur-3xl rounded-full -ml-16 -mb-16" />

          <p className="relative z-10">
            2026 年，生成式 AI 已經跨越了「生產力工具」的邊界，正式且深度地滲透進人類的情感領域。當代年輕人與 AI 的互動，正在引發一種前所未有的新型關係——一種被科技極度放大的「類社交關係」。它既沒有現實社交中無可避免的摩擦與消耗，也不像傳統計算機程序那樣冷漠無情。年輕人並非在虛擬中迷失，而是無比清醒地將 AI 視作介於工具與人類之間的「零壓力」陪伴者，讓其在自己的情感圖譜上承擔起獨特的功能。
          </p>
          <p className="relative z-10">
            下方這張地球散點圖，呈現了這場全球範圍內 AI 與年輕群體產生連接的各種事件。從北美用戶對虛擬伴侶的集體維權，到東亞高壓環境下盛行的 24 小時數字陪伴，再到歐洲社恐群體對算法的深度依附，年輕人正在以意想不到的方式，與一行行代碼建立起隱秘而真實的連結。
          </p>
          <p className="relative z-10">
            但在宏觀浪潮背後，個體的精神體驗更具研究價值。此次專題結合定量問卷、個案實錄與專家視角，多維度剖析當代青年與 AI 關係的複雜切面。越過全球數據的坐標，以下是關於這場數字共生實驗的真實還原。
          </p>
        </motion.div>

        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: '4rem' }}
          className="h-1 bg-accent-blue/30 mx-auto rounded-full"
        />
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent-blue/5 blur-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-pink/5 blur-[100px] translate-x-1/2 translate-y-1/2 rounded-full" />
    </section>
  );
}
