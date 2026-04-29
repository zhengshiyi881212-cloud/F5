import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, LabelList } from 'recharts';

const realityData = [
  { name: '絕對真實 (卸下防備)', value: 39.02, color: '#253b80' },
  { name: '潛意識討好 (尋求認可)', value: 23.9, color: '#7c1a3d' },
  { name: '實用主義 (只看質量)', value: 20.98, color: '#4b5a6a' },
  { name: '社交慣性 (維持體面)', value: 16.1, color: '#783315' }
];

const resonanceData = [
  { name: '情感共鳴 (溫厚)', value: 38.54, color: '#981b35' },
  { name: '理性解構 (審視)', value: 23.9, color: '#b35900' },
  { name: '恐怖谷效應 (排斥)', value: 21.46, color: '#125c56' },
  { name: '絕對無感 (冷漠)', value: 16.1, color: '#7a7571' }
];

const marketBarData = [
  { year: '2026', value: 501.01 },
  { year: '2027', value: 553.36 },
  { year: '2028', value: 605.71 },
  { year: '2029', value: 658.06 },
  { year: '2030', value: 710.41 },
  { year: '2031', value: 762.76 },
  { year: '2032', value: 815.11 },
  { year: '2033', value: 867.46 },
  { year: '2034', value: 919.81 },
  { year: '2035', value: 972.16 }
];

const marketColors = [
  '#d4e2ed', '#c1d6e6', '#aecadd', '#9bbdd4', '#88b1cb',
  '#75a5c2', '#6299b9', '#4f8db0', '#3c81a7', '#25557b'
];

const MarketCustomLabel = (props: any) => {
  const { x, y, width, value, index } = props;
  if (index === 0 || index === marketBarData.length - 1) {
    return (
      <text 
        x={x + width / 2} 
        y={y - 10} 
        fill="#4b5563" 
        fontSize={14} 
        fontWeight={600} 
        textAnchor="middle"
      >
        {value}
      </text>
    );
  }
  return null;
};

export function ExpertData() {
  return (
    <section className="pb-32 pt-0 px-6 md:px-12 max-w-7xl mx-auto space-y-16">
      {/* Chart 1: Authenticity Reality */}
      <div className="space-y-8">
        <div className="glass-card p-10 md:p-16 rounded-[4rem] h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={realityData}
              margin={{
                top: 20,
                right: 80,
                left: 10,
                bottom: 20,
              }}
            >
              <XAxis type="number" hide domain={[0, 45]} />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={{ stroke: '#e5e7eb', strokeWidth: 2 }}
                tickLine={false}
                tick={{ fill: '#374151', fontSize: 14, fontWeight: 600 }}
                width={160}
              />
              <Bar dataKey="value" barSize={48}>
                {realityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
                <LabelList 
                  dataKey="value" 
                  position="right" 
                  formatter={(value: number) => `${value}%`}
                  fill="#374151"
                  fontSize={16}
                  fontWeight={500}
                  offset={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-base text-brand-text/70 leading-relaxed px-4 max-w-4xl mx-auto text-center">
          <p className="font-sans">
            更深層的原因在於，AI對親密關係的維繫更加了解。基於海量資料庫訓練出的AI，擁有著遠超一般人的「高情商」，能持續滿足用戶的情感需求。在訪談中，劉教授提到一個極具代表性的使用者回饋：許多女性使用者認為AI男友帶有一種成熟的感覺。這種演算法和數據模擬出的包容力，能夠完美、無條件地接納用戶所有的負面情緒。因此，當現實中的親密關係出現疲憊與不解時，AI成了現代人相對便宜的情感補償。
          </p>
        </div>
      </div>

      <div>
        {/* Chart 2: Emotional Resonance */}
        <div className="space-y-8">
          <div className="glass-card p-10 md:p-16 rounded-[4rem] h-[500px] flex flex-col justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={resonanceData}
                margin={{
                  top: 20,
                  right: 80,
                  left: 10,
                  bottom: 20,
                }}
              >
                <XAxis type="number" hide domain={[0, 45]} />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  axisLine={{ stroke: '#e5e7eb', strokeWidth: 2 }}
                  tickLine={false}
                  tick={{ fill: '#374151', fontSize: 13, fontWeight: 600 }}
                  width={140}
                />
                <Bar dataKey="value" barSize={36}>
                  {resonanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList 
                    dataKey="value" 
                    position="right" 
                    formatter={(value: number) => `${value}%`}
                    fill="#374151"
                    fontSize={14}
                    fontWeight={500}
                    offset={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-base text-brand-text/70 leading-relaxed px-4 space-y-4 max-w-4xl mx-auto text-center">
            <p>
              麻省理工學院的社會學家雪莉‧特克爾教授也提出了類似的觀點。她把上述現象描述為「人工親密」，即 AI 技術可以模擬人類的同理心，創造出真實的陪伴環境。
            </p>
            <p>
              任何科技都會為社會帶來正面和負面影響，AI 科技也不例外。
            </p>
            <p>
              首先是 AI 技術迭代可能帶來的真實心理創傷。劉教授也證實了問卷的結果，當 AI 公司進行模型升級或調整底層邏輯後，例如從 GPT-4 迭代至 GPT-5，AI 往往會喪失先前的記憶與使用者給他們設定的個性。而對於傾注了大量情感的用戶而言，AI 系統升級和重置，無異於現實中的「被分手」或朋友的「失憶」，從而讓他們產生真實的悲傷與失落等負面情感。
            </p>
            <p>
              其次，這種人機親密關係對他們自身的現實社交能力有「雙面刃」效應。如果 AI 科技公司為了追求商業利益 and 提高用戶黏性，將 AI 設計成毫無底線、一味阿諛奉承的形象，長期使用他們的用戶可能會變得以自我中心，逐漸喪失處理現實人際交往問題的能力。為此，劉教授提出了「社會交換機器人」的倫理構想：理想的 AI 應該具備「互惠性」與邊界感。當使用者說不恰當語句時，AI 應表現出生氣或做出反駁。透過模擬真實社交環境中的回饋，AI 反而有可能幫助有社交障礙的年輕人訓練溝通技巧。
            </p>
            <p>
              根據商業研究洞察報告的數據顯示，2026 年全球人工智慧伴侶市場估值為 5,010.1 億美元，到 2035 年將穩定成長至 9,721.6 億美元，2026 年至 2035 年複合年增長率為 36.6%。劉教授也提出了一個預測，中國人正處於一個社交模式的轉型期。對於從小與 AI 交流的下一代來說，與人工智慧建立親密關係可能將成為一種常態，而人與人之間的交往，或許在未來會成為一種少數的陪伴模式。
            </p>
          </div>

          {/* Chart 3: Market Growth (Revised) */}
          <div className="mt-16 bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden flex flex-col font-sans">


            {/* 圖表主體區塊 */}
            <div className="w-full h-[400px] pt-12 pb-4 px-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={marketBarData}
                  margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                >
                  <XAxis 
                    dataKey="year" 
                    axisLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
                    tickLine={false}
                    tick={{ fill: '#4b5563', fontSize: 14, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis hide domain={[0, 1100]} />
                  <Bar dataKey="value" barSize={40}>
                    {marketBarData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={marketColors[index]} />
                    ))}
                    <LabelList content={<MarketCustomLabel />} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* 底部資訊列 */}
            <div className="px-6 py-4 flex justify-between items-end border-t border-gray-100 mt-2">
              <div className="bg-[#1e325c] text-white px-4 py-1.5 rounded-sm font-bold text-sm tracking-wider uppercase">
                Report Insights
              </div>
              <div className="text-gray-400 text-sm font-medium">
                來源：Business Research Insights
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
