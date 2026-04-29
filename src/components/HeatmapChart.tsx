import React from 'react';

const HeatmapChart = () => {
  // Y軸標籤 (由上至下)
  const yLabels = [
    '完全不影響習慣',
    '看重法律倫理界線',
    '因為是個案沒有影響',
    '主動警惕減少投入'
  ];

  // X軸標籤 (由左至右)
  const xLabels = ['未建立關係 (115人)', '正在建立關係 (90人)'];

  // 矩陣數據 (對應 Y 軸與 X 軸)
  const data = [
    [27, 10],
    [35, 20],
    [32, 35],
    [21, 25]
  ];

  // 根據數值計算漸層背景色 (模擬 ECharts 的 visualMap)
  // 範圍: 0 - 40, 顏色: #e0f3f8 -> #74add1 -> #313695
  const getColor = (value: number) => {
    const pct = Math.min(Math.max(value / 40, 0), 1);
    let r, g, b;
    if (pct <= 0.5) {
      // 0-20 區間
      const p = pct / 0.5;
      r = Math.round(224 + (116 - 224) * p);
      g = Math.round(243 + (173 - 243) * p);
      b = Math.round(248 + (209 - 248) * p);
    } else {
      // 20-40 區間
      const p = (pct - 0.5) / 0.5;
      r = Math.round(116 + (49 - 116) * p);
      g = Math.round(173 + (54 - 173) * p);
      b = Math.round(209 + (149 - 209) * p);
    }
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-transparent p-4 md:p-8 font-sans max-w-3xl mx-auto">
      
      {/* 主要圖表區塊 */}
      <div className="flex w-full mb-3">
        
        {/* Y軸標籤 */}
        <div className="w-[30%] flex flex-col justify-between pr-4 py-2 text-right text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wider leading-tight">
          {yLabels.map((label, i) => (
            <div key={i} className="flex-1 flex items-center justify-end">
              {label}
            </div>
          ))}
        </div>

        {/* 熱力圖網格 */}
        <div className="w-[70%] grid grid-cols-2 grid-rows-4 gap-2">
          {data.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((val, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="flex items-center justify-center text-white text-base md:text-lg font-bold tracking-wider transition-all duration-300 hover:scale-[1.02] shadow-sm rounded-lg"
                  style={{ 
                    backgroundColor: getColor(val), 
                    minHeight: '65px'
                  }}
                >
                  {val}人
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* X軸標籤 */}
      <div className="flex w-full">
        <div className="w-[30%]"></div>
        <div className="w-[70%] flex text-center text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-4">
          {xLabels.map((label, i) => (
            <div key={i} className="flex-1">{label}</div>
          ))}
        </div>
      </div>

      {/* 底部圖例 (Legend) */}
      <div className="mt-12 flex flex-col items-center w-full max-w-sm">
        <div className="flex justify-between w-full text-slate-400 text-[10px] font-bold mb-2 px-1 uppercase tracking-tighter">
          <span>0 (低頻度)</span>
          <span>40 (高頻度)</span>
        </div>
        <div
          className="w-full h-1.5 rounded-full"
          style={{
            background: 'linear-gradient(to right, rgb(224, 243, 248), rgb(116, 173, 209), rgb(49, 54, 149))'
          }}
        ></div>
      </div>
      
    </div>
  );
};

export default HeatmapChart;
