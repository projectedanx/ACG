
import React, { useMemo } from 'react';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ComposedChart } from 'recharts';
import { SemanticDiff } from '../types';

interface Props {
  diffs: SemanticDiff[];
}

/**
 * Renders a line chart visualizing the accumulation of architectural drift over time.
 * Calculates linear regression for trendlines based on SemanticDiff scores.
 *
 * @param {Props} props - Component properties.
 * @returns {JSX.Element} The rendered dashboard chart.
 */
const DriftDashboard: React.FC<Props> = ({ diffs }) => {
  const chartData = useMemo(() => {
    const rawData = diffs.map((d, index) => ({
      index,
      name: new Date(d.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      drift: d.driftScore,
      fullDate: d.timestamp.toLocaleString(),
      summary: d.summary
    }));

    if (rawData.length < 2) return rawData;

    // Simple Linear Regression (y = mx + b)
    const n = rawData.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;

    for (const point of rawData) {
      sumX += point.index;
      sumY += point.drift;
      sumXY += point.index * point.drift;
      sumXX += point.index * point.index;
    }

    const divisor = n * sumXX - sumX * sumX;
    // Prevent division by zero if all X are the same (shouldn't happen with unique indices)
    if (divisor === 0) return rawData;

    const slope = (n * sumXY - sumX * sumY) / divisor;
    const intercept = (sumY - slope * sumX) / n;

    return rawData.map(point => ({
      ...point,
      trend: Math.max(0, Math.min(100, slope * point.index + intercept))
    }));
  }, [diffs]);

  const stats = useMemo(() => {
    if (diffs.length === 0) return { avg: 0, peak: 0, trend: 'N/A' };
    const total = diffs.reduce((acc, d) => acc + d.driftScore, 0);
    const peak = Math.max(...diffs.map(d => d.driftScore));
    const avg = Math.round(total / diffs.length);
    
    let trend = 'Stable';
    if (diffs.length > 1) {
      const last = diffs[diffs.length - 1].driftScore;
      const prev = diffs[diffs.length - 2].driftScore;
      trend = last > prev ? 'Increasing' : 'Decreasing';
    }

    return { avg, peak, trend };
  }, [diffs]);

  const latestDrift = diffs.length > 0 ? diffs[diffs.length - 1].driftScore : 0;
  const statusInfo = useMemo(() => {
    if (latestDrift < 20) return { label: 'Optimal', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (latestDrift < 50) return { label: 'Degraded', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    return { label: 'Critical', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200' };
  }, [latestDrift]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Architectural Drift Governance</h2>
          <p className="text-sm text-slate-500">Real-time semantic divergence tracking across development cycles</p>
        </div>
        <div className={`px-4 py-2 rounded-full border ${statusInfo.bg} ${statusInfo.border} ${statusInfo.color} flex items-center gap-2`}>
          <div className={`w-2 h-2 rounded-full animate-pulse bg-current`} />
          <span className="text-sm font-bold uppercase tracking-wider">{statusInfo.label} Integrity</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Average Drift</p>
          <p className="text-2xl font-bold text-slate-800">{stats.avg}%</p>
          <div className="mt-2 w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full" style={{ width: `${stats.avg}%` }} />
          </div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Peak Variance</p>
          <p className="text-2xl font-bold text-slate-800">{stats.peak}%</p>
          <p className="text-[10px] text-slate-500 mt-1">Highest recorded divergence</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Drift Trend</p>
          <p className={`text-2xl font-bold ${stats.trend === 'Increasing' ? 'text-red-500' : 'text-emerald-500'}`}>
            {stats.trend}
          </p>
          <p className="text-[10px] text-slate-500 mt-1">Overall semantic trajectory</p>
        </div>
      </div>

      <div className="h-72 w-full bg-slate-50/50 rounded-xl p-4 border border-slate-100">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <defs>
                <linearGradient id="driftGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#64748b', fontWeight: 500}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 10, fill: '#64748b', fontWeight: 500}}
                domain={[0, 100]}
                dx={-10}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const driftPoint = payload.find(p => p.dataKey === 'drift');
                    const trendPoint = payload.find(p => p.dataKey === 'trend');
                    return (
                      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-xl">
                        <p className="text-xs font-bold text-slate-900 mb-1">{label}</p>
                        {driftPoint && <p className="text-sm font-bold text-indigo-600">Drift: {driftPoint.value}%</p>}
                        {trendPoint && <p className="text-[10px] font-bold text-rose-500 mb-2">Trend: {Number(trendPoint.value).toFixed(1)}%</p>}
                        <p className="text-[10px] text-slate-500 max-w-[200px] leading-tight line-clamp-2">
                          {payload[0].payload.summary}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={20} stroke="#10b981" strokeDasharray="3 3" label={{ position: 'right', value: 'Goal', fill: '#10b981', fontSize: 10 }} />
              <ReferenceLine y={50} stroke="#f59e0b" strokeDasharray="3 3" label={{ position: 'right', value: 'Warning', fill: '#f59e0b', fontSize: 10 }} />
              
              <Area 
                type="monotone" 
                dataKey="drift" 
                stroke="#4f46e5" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#driftGradient)" 
                animationDuration={1000}
                activeDot={{ r: 6, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
              />

              {chartData.length >= 2 && (
                <Line 
                  type="monotone" 
                  dataKey="trend" 
                  stroke="#f43f5e" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={false} 
                  activeDot={false}
                  animationDuration={1200}
                />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-slate-400 text-sm font-medium">Historical data pending plan execution</p>
          </div>
        )}
      </div>

      <div className="mt-8 border-t border-slate-100 pt-6">
        <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider flex items-center gap-2">
          <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Semantic Drift Narrative
        </h3>
        <div className="space-y-2">
          {diffs.slice().reverse().map(diff => (
            <div key={diff.id} className="p-4 bg-white rounded-lg border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 group hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${diff.driftScore > 50 ? 'bg-red-500' : diff.driftScore > 20 ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <div>
                  <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{diff.summary}</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-widest">{new Date(diff.timestamp).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
                <div className="text-right">
                  <p className={`text-sm font-bold ${diff.driftScore > 50 ? 'text-red-600' : 'text-indigo-600'}`}>
                    {diff.driftScore}% Divergence
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono">HASH: {diff.id.slice(0,8)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriftDashboard;
