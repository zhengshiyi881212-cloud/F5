import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// 根據 HTML 源碼修正後的精確數據
const data = [
  {
    name: '零社交壓力',
    承認正在逃避: 36,
    沒意識到但意願低: 20,
    現實互補_不逃避: 30,
    完全沒逃避: 14,
  },
  {
    name: '極高的即時性',
    承認正在逃避: 15,
    沒意識到但意願低: 15,
    現實互補_不逃避: 45,
    完全沒逃避: 25,
  },
  {
    name: '極度的客觀性',
    承認正在逃避: 10,
    沒意識到但意願低: 10,
    現實互補_不逃避: 50,
    完全沒逃避: 30,
  },
  {
    name: '記憶的永恆性',
    承認正在逃避: 25,
    沒意識到但意願低: 20,
    現實互補_不逃避: 35,
    完全沒逃避: 20,
  }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
        <p className="font-bold text-gray-800 mb-2">{label}</p >
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} style={{ color: entry.color }} className="text-sm font-medium">
            {entry.name === '現實互補_不逃避' ? '現實互補(不逃避)' : entry.name}: {entry.value}%
          </p >
        ))}
      </div>
    );
  }
  return null;
};

export function LineChartComponent() {
  return (
    <div className="w-full h-full flex flex-col items-center bg-white/40 p-6 rounded-2xl relative overflow-hidden">
      <div className="w-full h-[400px] relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
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
              tickFormatter={(value) => `${value}%`}
              domain={[0, 60]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
              formatter={(value) => (
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider ml-1 mr-4">
                  {value === '現實互補_不逃避' ? '現實互補(不逃避)' : value}
                </span>
              )}
            />
            <Line 
              type="monotone" 
              dataKey="承認正在逃避" 
              stroke="#F1948A" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="沒意識到但意願低" 
              stroke="#FAD7A0" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="現實互補_不逃避" 
              stroke="#7FB3D5" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6 }}
            />
            <Line 
              type="monotone" 
              dataKey="完全沒逃避" 
              stroke="#ABEBC6" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
