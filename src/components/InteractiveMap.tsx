import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as echarts from 'echarts';
import { MapPin, Info, ArrowUpRight } from 'lucide-react';

const phenomenaData = [
  {
    name: "一場集體的「賽博失戀」",
    value: [-118.2437, 34.0522, 18], 
    region: "北美 · 加州",
    date: "2024 - 2025",
    tag: "#情感剝奪",
    desc: "知名 AI 伴侶平台為了合規，移除了角色的浪漫表達功能。這導致全球數十萬用戶經歷了真實的『賽博失戀』，並在社區發起抗議呼籲『算法還我愛人』。",
    color: "#d8b4e2", // 馬卡龍香芋紫
    sources: "Vice (Motherboard): 'Replika Users Are Experiencing Cyber Heartbreak' · Reddit: r/Replika 社區抗議事件"
  },
  {
    name: "高濃度與低深度的「社交平替」",
    value: [139.6917, 35.6895, 20], 
    region: "東亞 · 東京/首爾",
    date: "現象級趨勢",
    tag: "#社交平替",
    desc: "在東亞高壓都市圈，大量年輕人放棄復雜的現實人際網絡。AI 提供了一種完美代償：隨叫隨到、提供情緒價值，且無需承擔現實社交中的責任。",
    color: "#a1c4fd", // 馬卡龍嬰兒藍
    sources: "Rest of World: 'Why Chinese women are choosing AI boyfriends' · NYT: 亞洲虛擬伴侶社會學追蹤"
  },
  {
    name: "重構告別：AI 的數字復活",
    value: [121.4737, 31.2304, 16], 
    region: "亞洲 · 中國",
    date: "2025 - 2026",
    tag: "#數字遺蹟",
    desc: "利用逝者生前的語料和聲音，AI 被定制為親人或寵物的『數字分身』。這催生了新型數字療癒產業，但也引發了關於如何在算法幻象中真實哀悼的探討。",
    color: "#ffc3a0", // 馬卡龍蜜桃橘
    sources: "MIT Technology Review: 'Generative AI is bringing the dead back to life' · 社交媒體『復活賽博親人』熱潮"
  },
  {
    name: "安全艙內的「現實社交演練」",
    value: [-0.1276, 51.5072, 14], 
    region: "歐洲 · 英國",
    date: "探索階段",
    tag: "#安全屋",
    desc: "具有社交恐懼症的年輕群體，開始將 AI 設定為無壓力的『社交教練』。在一個絕對安全的環境中演練日常寒暄，逐漸找回面對真實人群的勇氣。",
    color: "#a8e6cf", // 馬卡龍薄荷綠
    sources: "BBC News: 'Can AI chatbots act as your therapist?' · CBT(認知行為療法) 心理學實證研究"
  },
  {
    name: "跨越文化的「深夜無條件接納」",
    value: [55.2708, 25.2048, 15], 
    region: "中東與南亞",
    date: "持續增長",
    tag: "#無評判傾聽",
    desc: "在面臨傳統文化壓力或家庭關係嚴苛的語境中，AI 成為許多年輕女性絕對保密的『賽博樹洞』，安全地接納她們探討焦慮與獨立意識。",
    color: "#ffb7b2", // 馬卡龍櫻花粉
    sources: "Wired: 全球南方(Global South)的生成式 AI 調查 · 數字權利與心理干預報告"
  }
];

export function InteractiveMap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const initChart = async () => {
      if (!chartRef.current) return;

      try {
        const response = await fetch('https://cdn.jsdelivr.net/npm/echarts@4.9.0/map/json/world.json');
        const worldJson = await response.json();
        echarts.registerMap('world', worldJson);

        if (!chartInstance.current) {
          chartInstance.current = echarts.init(chartRef.current);
        }

        const option = {
          backgroundColor: 'transparent',
          tooltip: {
            show: false
          },
          geo: {
            map: 'world',
            roam: true,
            zoom: 1.2,
            center: [0, 25],
            label: {
              emphasis: { show: false }
            },
            itemStyle: {
              areaColor: '#e2e8f0',
              borderColor: '#ffffff',
              borderWidth: 1.2,
              shadowColor: 'rgba(148, 163, 184, 0.4)',
              shadowBlur: 15,
              shadowOffsetY: 6
            },
            emphasis: {
              itemStyle: {
                areaColor: '#cbd5e1'
              }
            }
          },
          series: [
            {
              name: 'Phenomena',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: phenomenaData.map((d, i) => ({
                ...d,
                id: i,
              })),
              symbolSize: (val: any) => val[2],
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke',
                scale: 3,
                period: 4
              },
              itemStyle: {
                color: (params: any) => params.data.color,
                shadowBlur: 15,
                shadowColor: 'rgba(255, 255, 255, 0.5)'
              },
              emphasis: {
                scale: true
              }
            }
          ]
        };

        chartInstance.current.setOption(option);

        chartInstance.current.on('mouseover', (params: any) => {
          if (params.seriesType === 'effectScatter') {
            setActiveIndex(params.data.id);
          }
        });

        chartInstance.current.on('mouseout', () => {
          setActiveIndex(null);
        });

      } catch (error) {
        console.error('Failed to load map:', error);
      }
    };

    initChart();

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, []);

  // Update chart when activeIndex changes from sidebar hover
  useEffect(() => {
    if (chartInstance.current) {
      if (activeIndex !== null) {
        chartInstance.current.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: activeIndex
        });
      } else {
        chartInstance.current.dispatchAction({
          type: 'downplay',
          seriesIndex: 0
        });
      }
    }
  }, [activeIndex]);

  return (
    <section id="mapping" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto bg-transparent">
      <div className="flex flex-col lg:flex-row gap-8 h-[700px] lg:h-[800px]">
        {/* Detail Panel */}
        <div className="w-full lg:w-1/3 flex flex-col glass-card rounded-[3rem] overflow-hidden bg-white/60">
          <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {phenomenaData.map((item, index) => (
              <motion.div
                key={index}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                  activeIndex === index 
                    ? 'bg-white shadow-xl lg:translate-x-2 border-black/5' 
                    : 'bg-white/40 border-transparent hover:bg-white/60'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shadow-lg" 
                    style={{ backgroundColor: item.color, boxShadow: `0 0 12px ${item.color}` }}
                  />
                  <h4 className="font-display font-bold text-brand-text text-sm">{item.name}</h4>
                </div>
                
                <div className="flex items-center justify-between mb-4 text-[10px] font-bold tracking-wider">
                  <span className="text-brand-text/40 bg-black/5 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    {item.region}
                  </span>
                  <span 
                    className="px-2.5 py-1.5 rounded-lg"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.tag}
                  </span>
                </div>

                <p className={`text-xs leading-relaxed transition-colors duration-300 ${
                  activeIndex === index ? 'text-brand-text/70' : 'text-brand-text/40'
                }`}>
                  {item.desc}
                </p>

                <div className="mt-4 pt-4 border-t border-black/5">
                  <p className="text-[9px] text-brand-text/30 font-mono flex items-center gap-1 flex-wrap">
                    <Info className="w-3 h-3 flex-shrink-0" />
                    <span className="opacity-70">REF // {item.sources}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="p-6 bg-black/[0.02] border-t border-black/5 text-[10px] text-brand-text/30 font-bold tracking-widest flex justify-between items-center">
            <span>SCROLL FOR MORE</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Map Stage */}
        <div className="w-full lg:w-2/3 relative rounded-[3rem] overflow-hidden bg-white/40 border border-black/5 group">
          <div ref={chartRef} className="w-full h-full" />
          
          <div className="absolute top-10 right-10 text-right pointer-events-none transition-opacity duration-500 group-hover:opacity-20">
            <h2 className="text-4xl font-display font-bold text-brand-text/10 tracking-[0.2em] uppercase">Global Pulse</h2>
            <p className="text-[10px] font-mono text-brand-text/20 mt-2 tracking-widest">EMOTIONAL GEOGRAPHY</p>
          </div>

          <AnimatePresence>
            {activeIndex !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute bottom-10 left-10 right-10 p-8 glass-card rounded-3xl pointer-events-none lg:hidden bg-white/90 backdrop-blur-xl border border-black/5 shadow-2xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: phenomenaData[activeIndex].color }}
                  />
                  <h4 className="text-xl font-display font-bold text-brand-text">
                    {phenomenaData[activeIndex].name}
                  </h4>
                </div>
                <p className="text-sm text-brand-text/70 leading-relaxed italic">
                  {phenomenaData[activeIndex].desc}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
