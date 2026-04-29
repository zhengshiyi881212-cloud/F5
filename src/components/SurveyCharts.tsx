import React from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from 'recharts';
import { motion } from 'motion/react';
import { PureStackedBarChart } from './StackedBarChart';
import { LineChartComponent } from './LineChartComponent';
import HeatmapChart from './HeatmapChart';
import DemographicHeatmap from './DemographicHeatmap';

const sentimentData = [
  { name: '好奇 / Curiosity', value: 45, color: '#7FB3D5' },
  { name: '焦慮 / Anxiety', value: 20, color: '#F1948A' },
  { name: '依賴 / Dependency', value: 25, color: '#7DCEA0' },
  { name: '冷漠 / Indifference', value: 10, color: '#D2B4DE' },
];

const usageTrend = [
  { time: '2021', level: 15 },
  { time: '2022', level: 30 },
  { time: '2023', level: 55 },
  { time: '2024', level: 82 },
  { time: '2025', level: 95 },
];

const emotionalDepth = [
  { subject: '信任 / Trust', A: 80 },
  { subject: '感同身受 / Empathy', A: 65 },
  { subject: '孤獨緩解 / Loneliness', A: 90 },
  { subject: '身份認同 / Identity', A: 45 },
  { subject: '情感安慰 / Comfort', A: 75 },
];

const ChartWrapper = ({ title, children, description, analysis }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
  >
    <div className="lg:col-span-7 glass-card p-10 rounded-[3rem] shadow-xl shadow-black/[0.01]">
      <div className="h-[350px] w-full">
        {children}
      </div>
    </div>
    <div className="lg:col-span-5 space-y-6">
      <div className="h-px w-12 bg-accent-pink" />
      <h3 className="text-3xl font-display font-bold text-brand-text leading-tight">{title}</h3>
      {description && (
        <p className="text-base text-brand-text/60 font-medium leading-relaxed italic border-l-2 border-accent-blue/20 pl-6">
          {description}
        </p>
      )}
      <div className="text-sm text-brand-text/80 leading-relaxed space-y-4">
        {analysis.map((para: string, i: number) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  </motion.div>
);

export function SurveyAnalysis() {
  return (
    <section id="data" className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-transparent">
       <div className="mb-24">
        <h2 className="text-4xl md:text-6xl font-serif italic text-accent-pink">
          調查問卷結果分析
        </h2>
       </div>

      <div className="space-y-32">
        <ChartWrapper 
          title="受訪者定義AI身份後對其服務停止的心理狀態變化" 
          analysis={[
            "這張條形圖展示了受訪者在定義AI身份之後對其服務停止的心理狀態。數據顯示，用戶對 AI 的角色定義與其心理依賴程度呈現出強烈的正相關。在將 AI 視為「虛擬夥伴」的受訪群體中，一旦AI服務停止，高達 50% 的人表示會感到「像失去一位真實朋友」，這種「賽博失戀」的痛感正變得真切且具象。相比之下，將 AI 視為「效率工具」的群體則表現出極強的理性。在服務停止的假設下，該群體中 60% 的人選擇了「感到不便」，這一比例在所有定義的受訪人群中位居首位。這種兩極分化的數據反饋揭示了一個事實，AI 究竟只是代碼，還是靈魂陪伴，其決定權並不在算法本身，而在於用戶對其的定位。"
          ]}
        >
          <PureStackedBarChart />
        </ChartWrapper>

        <ChartWrapper 
          title="處於不同社交狀況下的人群對AI的優勢評價" 
          analysis={[
            "這張折線圖展示了處於不同社交狀況下的人群對AI的優勢評價，在看重 「零社交壓力」 的群體中，36%的受訪者直言正將其作為逃避現實社交的工具。與此同時，AI 的「極度客觀性」展現出截然不同的結果。在選擇AI該特性較強的受訪群體中，高達50%的人選擇利用 AI 與現實生活進行互補，30%的用戶完全沒逃避在現實生活中的社交。"
          ]}
        >
          <LineChartComponent />
        </ChartWrapper>

        <ChartWrapper 
          title="情感連接對 AI 風險感知的影響" 
          analysis={[
            "這張矩陣圖展示了與AI未建立關係以及正在建立關係的受訪者對極端案例的看法。已建立關係的受訪者表現出明顯的維護態度，有30人將其視為獨立個案，共有40人認為不影響自身關係，僅有 25人保持警惕。相比之下，未建立關係的人群更看重底線，35人明確將法律倫理視為紅線，佔比最高，另有 59人因缺乏情感連接而保持客觀疏離。這種對比揭示了一旦產生情感寄託，用戶往往會為了維持與AI的關係而選擇性忽視風險。"
          ]}
        >
          <HeatmapChart />
        </ChartWrapper>

        <ChartWrapper 
          title="不同年齡段人群对AI有需求的时段" 
          analysis={[
            "這張矩陣圖顯示了不同年齡段的人群都在何時對AI有需求。交叉分析展示，30歲以上用戶傾向於利用碎片時間維持社交，高達64.7%的互動發生在碎片化時間中。而18至22歲的年輕群體則表現出截然不同的行為特徵，他們中雖有40%同樣在碎片時間與AI互動，但是與其他年齡段不同的是有24%的互動發生在情緒波動之際，是所有年齡段中唯一將AI作為即時情感撫慰渠道的群體。而18歲以下青少年在「社交補充」一項上達到36%，高於所有其他群體。數據背後折射出人機關係中的年齡差異，年長者視AI為「時間殺手」，而年輕人則更依賴AI的情感陪伴。"
          ]}
        >
          <DemographicHeatmap />
        </ChartWrapper>
      </div>

      <div className="mt-32 text-center max-w-2xl mx-auto">
        <p className="text-xl md:text-2xl font-serif italic text-brand-text/60 leading-relaxed">
          「 在對 205 份問卷的量化分析之外，個體的真實情感正在更深層次地揭示人與 AI 關係中更隱秘的那部分。」
        </p>
      </div>
    </section>
  );
}
