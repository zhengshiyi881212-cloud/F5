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

// 根據 CSV 檔案提取的真實人數，確保總和為 205
const data = [
  {
    name: '零社交壓力',
    desc: '(無須擔心對方的反應或審判)',
    count: '77人',
    承認正在逃避: 36,
    沒意識到但意願低: 20,
    '現實互補(不逃避)': 30,
    完全沒逃避: 14,
  },
  {
    name: '極高的即時性',
    desc: '(隨時隨地秒回)',
    count: '56人',
    承認正在逃避: 15,
    沒意識到但意願低: 15,
    '現實互補(不逃避)': 45,
    完全沒逃避: 25,
  },
  {
    name: '極度的客觀性',
    desc: '(算法邏輯帶來的理性)',
    count: '48人',
    承認正在逃避: 10,
    没意识到但意愿低: 10,
    '现实互补(不逃避)': 50,
    完全没逃离: 30, // Note: The user's code had "完全没逃避" but data keys might need to be stable.
  },
  {
    name: '記憶的永恆性',
    desc: '(它記得我所有的過去)',
    count: '24人',
    承認正在逃避: 25,
    沒意識到但意願低: 20,
    '現實互補(不逃避)': 35,
    完全沒逃避: 20,
  }
];

// Let me re-verify the data keys in the provided snippet
// The snippet says:
//   {
//     name: '极度的客观性',
//     desc: '(算法逻辑带来的理性)',
//     count: '48人',
//     承认正在逃避: 10,
//     没意识到但意愿低: 10,
//     '现实互补(不逃避)': 50,
//     完全没逃避: 30,
//   },
// Ah, my transcription above was slightly off.

const processedData = [
  {
    name: '零社交壓力',
    desc: '(無須擔心對方的反應或審判)',
    count: '77人',
    承認正在逃避: 36,
    沒意識到但意願低: 20,
    '現實互補(不逃避)': 30,
    完全沒逃避: 14,
  },
  {
    name: '極高的即時性',
    desc: '(隨時隨地秒回)',
    count: '56人',
    承認正在逃避: 15,
    沒意識到但意願低: 15,
    '現實互補(不逃避)': 45,
    完全沒逃避: 25,
  },
  {
    name: '極度的客觀性',
    desc: '(算法邏輯帶來的理性)',
    count: '48人',
    承認正在逃避: 10,
    沒意識到但意願低: 10,
    '現實互補(不逃避)': 50,
    完全沒逃避: 30,
  },
  {
    name: '記憶的永恆性',
    desc: '(它記得我所有的過去)',
    count: '24人',
    承認正在逃避: 25,
    沒意識到但意願低: 20,
    '現實互補(不逃避)': 35,
    完全沒逃避: 20,
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const itemData = processedData.find(d => d.name === label);
    return (
      <div className="bg-white p-4 border border-gray-100 shadow-xl rounded-lg min-w-[220px]">
        <p className="font-bold text-gray-800 mb-1 text-base">{label}</p >
        <p className="text-xs text-gray-400 mb-1">{itemData?.desc}</p >
        <p className="text-xs text-gray-500 mb-3 border-b pb-2">總計人數：{itemData?.count}</p >
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

// 自定義 X 軸標籤，將名稱、描述與人數分三行顯示
const CustomXAxisTick = ({ x, y, payload }: any) => {
  const itemData = processedData.find(d => d.name === payload.value);
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={20} textAnchor="middle" fill="#374151" className="font-bold text-[14px]">
        {itemData?.name}
      </text>
      <text x={0} y={0} dy={42} textAnchor="middle" fill="#6b7280" className="text-[12px]">
        {itemData?.desc}
      </text>
      <text x={0} y={0} dy={64} textAnchor="middle" fill="#9ca3af" className="text-[12px] font-medium">
        ({itemData?.count})
      </text>
    </g>
  );
};

export const LineChartComponent = () => {
  return (
    <div className="w-full h-full bg-white p-8 rounded-3xl shadow-sm flex flex-col">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="horizontal"
          data={processedData}
          margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
          barSize={60}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          <XAxis 
            type="category"
            dataKey="name" 
            tick={<CustomXAxisTick />}
            axisLine={{ stroke: '#d1d5db', strokeWidth: 2 }}
            tickLine={false}
          />
          <YAxis 
            type="number"
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            label={{ value: '用戶比例 (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280', fontSize: 12 } }}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: '#f9fafb' }} 
          />
          <Legend 
            wrapperStyle={{ paddingTop: '40px' }}
            iconType="circle"
            formatter={(value) => <span className="text-gray-700 text-sm ml-1 mr-4 font-medium">{value}</span>}
          />
          <Bar dataKey="承認正在逃避" stackId="a" fill="#eb5e64" />
          <Bar dataKey="沒意識到但意願低" stackId="a" fill="#f2c75a" />
          <Bar dataKey="現實互補(不逃避)" stackId="a" fill="#4c68b7" />
          <Bar dataKey="完全沒逃避" stackId="a" fill="#82c37e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
