import React from 'react';

const DemographicHeatmap = () => {
  // Y軸標籤 (由上至下)
  const yLabels = [
    '30歲以上',
    '27-30歲',
    '23-26歲',
    '18-22歲',
    '18歲以下'
  ];

  // X軸標籤 (由左至右)
  const xLabels = ['碎片時間', '社交補充', '深夜孤獨', '情緒波動'];

  // 矩陣數據 (對應 Y 軸與 X 軸的百分比數值)
  const data = [
    [64.7, 11.8, 11.8, 11.8],
    [34, 29, 17, 20],
    [39, 25, 20, 16],
    [40, 20, 16, 24],
    [45, 36, 9, 9]
  ];

  // 根據數值計算漸層背景色 (範圍: 0 - 70)
  // 顏色過渡: 淺黃 (#fef0d9) -> 橘色 (#fc8d59) -> 深紅 (#b30000)
  const getColor = (value: number) => {
    const pct = Math.min(Math.max(value / 70, 0), 1);
    let r, g, b;
    if (pct <= 0.5) {
      // 0-35 區間
      const p = pct / 0.5;
      r = Math.round(254 + (252 - 254) * p);
      g = Math.round(240 + (141 - 240) * p);
      b = Math.round(217 + (89 - 217) * p);
    } else {
      // 35-70 區間
      const p = (pct - 0.5) / 0.5;
      r = Math.round(252 + (179 - 252) * p);
      g = Math.round(141 + (0 - 141) * p);
      b = Math.round(89 + (0 - 89) * p);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-transparent p-4 md:p-8 font-sans max-w-4xl mx-auto overflow-visible">
      
      {/* 主要圖表區塊 */}
      <div className="flex w-full mb-3">
        
        {/* Y軸標籤 */}
        <div className="w-[20%] flex flex-col justify-between pr-4 py-2 text-right text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider leading-tight">
          {yLabels.map((label, i) => (
            <div key={i} className="flex-1 flex items-center justify-end">
              {label}
            </div>
          ))}
        </div>

        {/* 熱力圖網格 */}
        <div className="w-[80%] grid grid-cols-4 grid-rows-5 gap-1.5">
          {data.map((row, rowIndex) => (row.map((val, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="flex items-center justify-center text-slate-900 text-[10px] md:text-sm font-bold tracking-tighter md:tracking-normal transition-all duration-300 hover:scale-[1.05] shadow-sm rounded-sm"
              style={{ 
                backgroundColor: getColor(val), 
                minHeight: '40px' 
              }}
            >
              {val}%
            </div>
          ))))}
        </div>
      </div>

      {/* X軸標籤 */}
      <div className="flex w-full">
        <div className="w-[20%]"></div>
        <div className="w-[80%] flex text-center text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-4">
          {xLabels.map((label, i) => (
            <div key={i} className="flex-1 px-1">{label}</div>
          ))}
        </div>
      </div>

      {/* 底部圖例 (Legend) */}
      <div className="mt-8 flex flex-col items-center w-full max-w-xs">
        <div className="flex justify-between w-full text-slate-400 text-[9px] font-bold mb-1.5 px-0.5 uppercase tracking-tighter">
          <span>0 (低頻)</span>
          <span>70 (高頻)</span>
        </div>
        <div
          className="w-full h-1 rounded-full shadow-inner"
          style={{
            background: 'linear-gradient(to right, rgb(254, 240, 217), rgb(252, 141, 89), rgb(179, 0, 0))'
          }}
        ></div>
      </div>
      
    </div>
  );
};

export default DemographicHeatmap;
