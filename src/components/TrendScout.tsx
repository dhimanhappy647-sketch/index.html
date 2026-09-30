import React, { useState } from 'react';
import { TrendingUp, Flame, PlaySquare, ArrowUpRight, Search, Sparkles, Filter } from 'lucide-react';
import { TrendIdea, ContentFormat, YouTubeChannel } from '../types';
import { INITIAL_TREND_IDEAS } from '../data/defaultData';

interface TrendScoutProps {
  channel: YouTubeChannel;
  onUseTrend: (topic: string, format: ContentFormat) => void;
}

export const TrendScout: React.FC<TrendScoutProps> = ({
  channel,
  onUseTrend,
}) => {
  const [trends, setTrends] = useState<TrendIdea[]>(INITIAL_TREND_IDEAS);
  const [filterFormat, setFilterFormat] = useState<'all' | 'video' | 'short'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrends = trends.filter((t) => {
    const matchesFormat = filterFormat === 'all' || t.suggestedFormat === filterFormat;
    const matchesSearch = t.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.niche.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFormat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            Viral Trend Scout
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Algorithmic keyword opportunities and competitor gaps tailored to {channel.category}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Format filter segmented control */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
            <button
              onClick={() => setFilterFormat('all')}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                filterFormat === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Formats
            </button>
            <button
              onClick={() => setFilterFormat('video')}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                filterFormat === 'video' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Long-Form
            </button>
            <button
              onClick={() => setFilterFormat('short')}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                filterFormat === 'short' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Shorts
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter trends by keyword or niche..."
          className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
        />
        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
      </div>

      {/* Grid of Trend Ideas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTrends.map((trend) => (
          <div
            key={trend.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">{trend.niche}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono tabular-nums ${
                    trend.searchVolume === 'Exploding'
                      ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  }`}>
                    {trend.searchVolume === 'Exploding' ? '🔥 Exploding Volume' : 'High Volume'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Est. {trend.estimatedViews}
                  </span>
                </div>
              </div>

              <h3 className="text-base font-semibold text-white leading-snug">
                {trend.topic}
              </h3>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300">
                <span className="text-amber-400 font-medium">Hook Strategy:</span> {trend.hookAngle}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Format: <strong className="text-white">{trend.suggestedFormat === 'short' ? 'YouTube Short (9:16)' : 'Full Video (16:9)'}</strong>
              </span>

              <button
                onClick={() => onUseTrend(trend.topic, trend.suggestedFormat)}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5 shadow-sm shadow-rose-600/20"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Generate Script
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
