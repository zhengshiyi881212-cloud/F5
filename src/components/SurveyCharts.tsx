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
      <div className="h-[600px] w-full">
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
      <div className="mb-24 max-w-4xl mx-auto text-center">
        <p className="text-lg md:text-xl text-brand-text/80 font-sans leading-relaxed">
          為了進一步調查當代年輕人與 AI 建立情感連結的真實動機、心理依賴程度以及潛在的社交影響。我們發起了一項關於AI 時代下年輕人群體人機交互與情感補償的專項問卷調查。本次問卷全面聚焦於受訪者對 AI 的定義、日常非功能性交互、服務中斷時的心理變化，以及對 AI 倫理風險的感知等多個維度。我們主要在各大社交媒體平台、年輕人活躍的網絡社區，高校社群，浸會大學賽馬會食堂，李作權大道的休息區，浸會大學AAB五樓食堂以及浸會大學善衡校區食堂進行線上線下隨機問卷發放。最終，我們成功回收了 205 份有效問卷。
        </p>
      </div>

      <div className="space-y-32">
        <ChartWrapper 
          title="受訪者定義AI身份後對其服務停止的心理狀態變化" 
          analysis={[
            "這張條形圖是根據調查問卷中「您在心理上如何定義 AI」與「AI 服務停止後的心理狀態」 交叉分析所得出，展示了受訪者在定義AI身份之後對其服務停止的心理狀態。橫坐標展示了受訪者對 AI 的四種不同定義，堆疊色塊則反映了在不同定義下受訪者在面對服務中斷時，選擇「失去朋友」、「感到不便」、「毫無波動」或「鬆一口氣」的具體佔比分佈。",
            "數據顯示，用戶對 AI 的角色定義與其心理依賴程度呈現出強烈的相關性。在將 AI 視為「虛擬夥伴」的受訪群體中，一旦AI服務停止，高達 50% 的人表示會感到「像失去一位真實朋友」，這種「賽博失戀」的痛感正變得真切且具象。相比之下，將 AI 視為「效率工具」的群體則表現出極強的理性。在服務停止的假設下，該群體中 50% 的人選擇了「感到不便」，這一比例在所有定義的受訪人群中位居首位。這種兩極分化的數據反饋揭示了一個事實，AI 究竟只是代碼，還是靈魂陪伴，其決定權並不在算法本身，而在於用戶對其的定位。"
          ]}
        >
          <PureStackedBarChart />
        </ChartWrapper>

        <ChartWrapper 
          title="處於不同社交狀況下的人群對AI的優勢評價" 
          analysis={[
            "這張條形圖結合了問卷中「您認為與 AI 交流最大的優勢」與「您是否通過 AI 逃避現實社交」 的數據，展示了處於不同社交狀況下的人群對AI的優勢評價。圖表的橫軸展示了受訪者看重的四種 AI 優勢：「零社交壓力」、「極高的即時性」、「極度的客觀性」及「記憶的永恆性」。縱軸則通過百分比堆疊，展現了在不同優勢導下的用戶，其逃避現實傾向的具體程度。",
            "在看重 「零社交壓力」 的群體中，36%的受訪者直言正將其作為逃避現實社交的工具。與此同時，AI 的「極度客觀性」展現出截然不同的結果。在選擇AI該特性較強的受訪群體中，高達50%的人選擇利用 AI 與現實生活進行互補，30%的用戶完全沒逃避在現實生活中的社交。"
          ]}
        >
          <LineChartComponent />
        </ChartWrapper>

        <ChartWrapper 
          title="情感連接對 AI 風險感知的影響" 
          analysis={[
            "這張矩陣圖通過交叉分析「對極端案例（如教唆自殺案）的態度」 與「是否正與 AI 建立關係」的數據，展示了與AI未建立關係以及正在建立關係的受訪者對極端案例的看法。探討情感連結如何影響風險感知。圖表橫軸根據受訪者的關係現狀分為未建立關係正在建立關係兩大對照組；縱軸則列出了四種心理反饋模式。",
            "已建立關係的受訪者表現出明顯的維護態度，有30人將其視為獨立個案，共有40人認為不影響自身關係，僅有 25人保持警惕。相比之下，未建立關係的人群更看重底線，35人明確將法律倫理視為紅線，佔比最高，另有 59人因缺乏情感連接而保持客觀疏離。這種對比揭示了一旦產生情感寄託，用戶往往會為了維持與AI的關係而選擇性忽視風險。"
          ]}
        >
          <HeatmapChart />
        </ChartWrapper>

        <ChartWrapper 
          title="不同年齡段人群对AI有需求的时段" 
          analysis={[
            "這張矩陣圖通過交叉分析「受訪者年齡段」 與「非功能性交互的時間段/場景」，顯示了不同年齡段的人群都在何時對AI有需求。圖表的縱軸按年齡層劃分，從 「18歲以下」 到 「30歲以上」；橫軸則定義了四種典型的交互情境。百分比則反映了該年齡段用戶在各情境下的分佈密度。",
            "交叉分析展示，30歲以上用戶傾向於利用碎片時間維持社交，高達64.7%的互動發生在碎片化時間中。而18至22歲的年輕群體則表現出截然不同的行為特徵，他們中雖有40%同樣在碎片時間與AI互動，但是與其他年齡段不同的是有24%的互動發生在情緒波動之際，是所有年齡段中唯一將AI作為即時情感撫慰渠道的群體。而18歲以下青少年在「社交補充」一項上達到36%，高於所有其他群體。數據背後折射出人機關係中的年齡差異，年長者視AI為「時間殺手」，而年輕人則更依賴AI的情感陪伴。"
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
