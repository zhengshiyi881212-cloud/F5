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

const data = [
  {
    name: '效率工具',
    失去像真實朋友: 15.4,
    感到不便: 60.0,
    鬆一口氣: 4.6,
    毫無波動: 20.0,
  },
  {
    name: '情緒樹洞',
    失去像真實朋友: 30.0,
    感到不便: 40.0,
    鬆一口氣: 15.0,
    毫無波動: 15.0,
  },
  {
    name: '虛擬夥伴',
    失去像真實朋友: 50.0,
    感到不便: 20.0,
    鬆一口氣: 10.0,
    毫無波動: 20.0,
  },
  {
    name: '自我延伸',
    失去像真實朋友: 45.0,
    感到不便: 30.0,
    鬆一口氣: 10.0,
    毫無波動: 15.0,
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 shadow-md rounded-md">
        <p className="font-bold text-gray-700 mb-2 text-sm">{label}</p>
        {[...payload].reverse().map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }} className="text-xs font-medium py-0.5">
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function PureStackedBarChart() {
  return (
    <div className="w-full h-full p-4 flex flex-col relative bg-white/40 rounded-2xl">
      <div className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-4 ml-4">佔比 (%)</div>
      
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: -15,
            bottom: 10,
          }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
          
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
            axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
            tickLine={false}
            dy={10}
          />
          
          <YAxis 
            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
          
          <Legend 
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => (
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mr-4">
                {value}
              </span>
            )}
          />
          
          <Bar dataKey="失去像真實朋友" stackId="a" fill="#F1948A" radius={[0, 0, 0, 0]} />
          <Bar dataKey="感到不便" stackId="a" fill="#7FB3D5" radius={[0, 0, 0, 0]} />
          <Bar dataKey="鬆一口氣" stackId="a" fill="#ABEBC6" radius={[0, 0, 0, 0]} />
          <Bar dataKey="毫無波動" stackId="a" fill="#FAD7A0" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
