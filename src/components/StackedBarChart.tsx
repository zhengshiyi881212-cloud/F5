import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// 根據最新截圖更新的百分比數據
const data = [
  {
    name: '效率工具',
    desc: '(看重功能性)',
    count: '106人',
    失去像真實朋友: 15,
    感到不便: 60,
    鬆一口氣: 5,
    毫無波動: 20,
  },
  {
    name: '情緒樹洞',
    desc: '(單向傾訴)',
    count: '46人',
    失去像真實朋友: 30,
    感到不便: 40,
    鬆一口氣: 15,
    毫無波動: 15,
  },
  {
    name: '虛擬夥伴',
    desc: '(人格化社交)',
    count: '36人',
    失去像真實朋友: 50,
    感到不便: 20,
    鬆一口氣: 10,
    毫無波動: 20,
  },
  {
    name: '自我延伸',
    desc: '(意識補充)',
    count: '16人',
    失去像真實朋友: 45,
    感到不便: 30,
    鬆一口氣: 10,
    毫無波動: 15,
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const itemData = data.find(d => d.name === label);
    return (
      <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-lg min-w-[180px]">
        <p className="font-bold text-gray-800 mb-1 text-base">{label}</p >
        <p className="text-xs text-gray-400 mb-3 border-b pb-2">{itemData?.desc} | 總計：{itemData?.count}</p >
        {[...payload].reverse().map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex justify-between items-center py-1">
            <span style={{ color: entry.color }} className="text-sm font-medium">
              {entry.name}:
            </span>
            <span style={{ color: entry.color }} className="text-sm font-bold ml-4">
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomXAxisTick = ({ x, y, payload }: any) => {
  const itemData = data.find(d => d.name === payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={20} textAnchor="middle" fill="#374151" className="font-bold text-[14px]">
        {itemData?.name}
      </text>
      <text x={0} y={0} dy={42} textAnchor="middle" fill="#6b7280" className="text-[13px]">
        {itemData?.desc}
      </text>
      <text x={0} y={0} dy={64} textAnchor="middle" fill="#9ca3af" className="text-[12px] font-medium">
        {itemData?.count}
      </text>
    </g>
  );
};

export const PureStackedBarChart = () => {
  return (
    <div className="w-full h-full bg-white p-6 rounded-3xl shadow-sm flex flex-col">
       <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">受訪者定義 AI 身份後對其服務停止的心理狀態變化</h2>
        <p className="text-sm text-gray-500 mt-1">Y軸：佔比 (%) | X軸：AI 角色定義與人數</p >
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 80 }}
              barSize={60}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis 
                dataKey="name" 
                tick={<CustomXAxisTick />}
                axisLine={{ stroke: '#e5e7eb', strokeWidth: 2 }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
              />
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: '#f9fafb' }} 
              />
              <Legend 
                wrapperStyle={{ paddingTop: '60px' }}
                iconType="circle"
                formatter={(value) => <span className="text-gray-700 text-sm ml-1 mr-4 font-medium">{value}</span>}
              />
              <Bar dataKey="失去像真實朋友" stackId="a" fill="#f08a86" />
              <Bar dataKey="感到不便" stackId="a" fill="#75aadb" />
              <Bar dataKey="鬆一口氣" stackId="a" fill="#a3d9b1" />
              <Bar dataKey="毫無波動" stackId="a" fill="#f7d179" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ResponsiveContainer>
    </div>
  );
};
