import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as echarts from 'echarts';
import { MapPin, Info, ArrowUpRight } from 'lucide-react';

const phenomenaData = [
  {
    name: "一場集體的「賽博失戀」",
    image: "https://i.imgur.com/YW3yu2R.jpeg",
    value: [-118.2437, 34.0522, 18], 
    region: "北美 · 加州",
    date: "2024 - 2025",
    tag: "#情感剝奪",
    desc: "AI 伴侣应用 Replika 移除了 ERP（浪漫与擦边角色扮演）功能，以及 Character.ai 加强了内容安全过滤器，导致大量深度依赖的年轻用户在 Reddit 上爆发集体抗议，甚至出现创伤后应激反应。",
    color: "#d8b4e2", // 馬卡龍香芋紫
    sources: "Vice (Motherboard) 深度报道： \"Replika Users Are Experiencing ‘Cyber Heartbreak’ After App Update\"（Replika 用户在应用更新后正經歷真實的“賽博失戀”）。這篇報導記錄了用戶如何像失去真實伴侶一樣感到悲痛"
  },
  {
    name: "高濃度與低深度的「社交平替」",
    image: "https://i.imgur.com/5EszvFy.jpeg",
    value: [139.6917, 35.6895, 20], 
    region: "東亞 · 東京/首爾",
    date: "現象級趨勢",
    tag: "#社交平替",
    desc: "中日韩高压都市社会中，年轻人面临严重的“现实社交疲劳”，转而使用各种 AI 伴侣 App（如 Glow、星野、或是 ChatGPT 的语音模式）作为情绪平替。",
    color: "#a1c4fd", // 馬卡龍嬰兒藍
    sources: "Rest of World 科技报道： \"Why Chinese women are choosing AI boyfriends\"（为什么中国女性选择 AI 男友）。文章探讨了在快节奏社会中，完美、随叫随到且无需现实付出的人机恋爱如何成为一种心理刚需。 《纽约时报》追踪： 关于日本全息 AI 伴侣（如 Gatebox 用户）与虚拟角色结婚的社会学觀察追踪。"
  },
  {
    name: "重構告別：AI 的數字復活",
    image: "https://i.imgur.com/d7pV7Qt.jpeg",
    value: [121.4737, 31.2304, 16], 
    region: "亞洲 · 中國",
    date: "2025 - 2026",
    tag: "#數字遺蹟",
    desc: "随着大语言模型和音频克隆技术的开源，利用亲人生前的聊天记录、声音和照片“复活”逝者（甚至是去世的宠物），成为一种新兴的数字疗愈产业和伦理争议焦点。",
    color: "#ffc3a0", // 馬卡龍蜜桃橘
    sources: "《麻省理工科技评论》 (MIT Technology Review)： \"Generative AI is bringing the dead back to life in China\"（生成式 AI 正在中国将死者“复活”）。 Bilibili / 抖音社区： 许多技术博主发布“用 AI 复活奶奶”或“与去世狗狗对话”的记录视频，评论区形成了庞大的赛博悼念空间。"
  },
  {
    name: "安全艙內的「現實社交演練」",
    image: "https://i.imgur.com/kiWBSHz.jpeg",
    value: [-0.1276, 51.5072, 14], 
    region: "歐洲 · 英國",
    date: "探索階段",
    tag: "#安全屋",
    desc: "年轻的社交恐惧症（SAD）患者群体，开始将高情商的 AI（如 Inflection AI 开发的 Pi）作为社交演练工具，在无评判的环境中克服社交焦虑。",
    color: "#a8e6cf", // 馬卡龍薄荷綠
    sources: "BBC News： \"Can AI chatbots act as your therapist?\"（AI 聊天機器人能做你的心理治療師嗎？）。 學術支撐： 心理學研究開始介入「聊天機器人輔助認知行為療法（CBT）」，例如 Woebot 等應用的實際臨床回饋。"
  },
  {
    name: "跨越文化的「深夜無條件接納」",
    image: "https://i.imgur.com/T3h6RMP.jpeg",
    value: [55.2708, 25.2048, 15], 
    region: "中東與南亞",
    date: "持續增長",
    tag: "#無評判傾聽",
    desc: "在部分具有严格传统家庭结构或性别凝视的文化语境下，年轻女性和少数群体缺乏安全的倾诉渠道，AI 意外成为了最保密、最不具批判性的“赛博安全屋”。",
    color: "#ffb7b2", // 馬卡龍櫻花粉
    sources: "Wired (连线杂志) 及各种数字权利机构报告： 探讨了生成式 AI 在全球南方（Global South）或边缘群体中，如何填补了心理咨询资源匮乏的空白。 用户在社交媒体上的匿名分享，提及 AI 成为她们唯一可以讨论升学焦虑、职场困惑甚至逃离家庭压力的对象。"
  }
];

export function InteractiveMap() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

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
            roam: false,
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
    <section id="mapping" className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto bg-transparent relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-brand-text tracking-tight">
          人類與AI產生情感鏈接的現象在全球均有發生
        </h2>
        <div className="h-1.5 w-24 bg-accent-blue/30 mx-auto rounded-full mt-6" />
      </div>

      {/* Floating Image Tooltip */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              left: mousePos.x + 20,
              top: mousePos.y + 20 
            }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed z-[100] w-64 pointer-events-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white glass-card bg-white"
            style={{ transition: 'left 0.1s ease-out, top 0.1s ease-out' }}
          >
            <div className="relative aspect-video">
              <img 
                src={phenomenaData[activeIndex].image} 
                alt={phenomenaData[activeIndex].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-1">{phenomenaData[activeIndex].tag}</p>
                <h5 className="text-sm font-display font-bold leading-tight">{phenomenaData[activeIndex].name}</h5>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
