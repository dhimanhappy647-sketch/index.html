import React from 'react';
import { 
  PlaySquare, 
  Flame, 
  Lock, 
  Unlock, 
  Youtube, 
  ChevronDown, 
  PlusCircle, 
  Radio, 
  Calendar, 
  TrendingUp, 
  SlidersHorizontal 
} from 'lucide-react';
import { YouTubeChannel } from '../types';

interface NavbarProps {
  currentTab: 'queue' | 'generator' | 'batch' | 'trends' | 'admin';
  setCurrentTab: (tab: 'queue' | 'generator' | 'batch' | 'trends' | 'admin') => void;
  activeChannel: YouTubeChannel;
  channels: YouTubeChannel[];
  onSelectChannel: (channel: YouTubeChannel) => void;
  onOpenConnectModal: () => void;
  isAdminAuthenticated: boolean;
  onOpenAdminModal: () => void;
  onAdminLogout: () => void;
  streakDays: number;
  autoPosterActive: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  activeChannel,
  channels,
  onSelectChannel,
  onOpenConnectModal,
  isAdminAuthenticated,
  onOpenAdminModal,
  onAdminLogout,
  streakDays,
  autoPosterActive,
}) => {
  const [channelDropdownOpen, setChannelDropdownOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Youtube className="w-5 h-5 text-white fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-white flex items-center gap-1.5">
              AutoTube Studio
              {autoPosterActive ? (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Auto-Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Paused
                </span>
              )}
            </span>
            <span className="text-xs text-slate-400 truncate max-w-[160px] sm:max-w-xs">
              {activeChannel.title}
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => setCurrentTab('queue')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'queue'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-rose-400" />
            Posting Pipeline
          </button>

          <button
            onClick={() => setCurrentTab('generator')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'generator'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <PlaySquare className="w-3.5 h-3.5 text-indigo-400" />
            AI Content Studio
          </button>

          <button
            onClick={() => setCurrentTab('batch')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'batch'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            Consistency Calendar
          </button>

          <button
            onClick={() => setCurrentTab('trends')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'trends'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            Trend Scout
          </button>

          <button
            onClick={() => {
              if (isAdminAuthenticated) {
                setCurrentTab('admin');
              } else {
                onOpenAdminModal();
              }
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'admin'
                ? 'bg-slate-800 text-rose-300 shadow-sm'
                : isAdminAuthenticated
                ? 'text-rose-400 hover:bg-rose-950/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Admin Controls
          </button>
        </nav>

        {/* Zone 3: Channel profile selector & Admin Access Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Consistency Streak */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
            <span className="tabular-nums font-semibold">{streakDays}</span>
            <span className="text-amber-300/80">Day Streak</span>
          </div>

          {/* Channel Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setChannelDropdownOpen(!channelDropdownOpen)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              <img
                src={activeChannel.avatarUrl}
                alt={activeChannel.title}
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover border border-slate-700"
              />
              <span className="hidden md:inline truncate max-w-[110px]">{activeChannel.handle}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {channelDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setChannelDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-xl p-2 z-40 space-y-1">
                  <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Connected Channels
                  </div>
                  {channels.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => {
                        onSelectChannel(ch);
                        setChannelDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs transition-colors ${
                        ch.id === activeChannel.id
                          ? 'bg-rose-500/10 text-rose-300 font-medium'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <img
                        src={ch.avatarUrl}
                        alt={ch.title}
                        referrerPolicy="no-referrer"
                        className="w-6 h-6 rounded-full object-cover border border-slate-700"
                      />
                      <div className="flex-1 truncate">
                        <div className="truncate font-medium">{ch.title}</div>
                        <div className="text-[10px] text-slate-400 font-mono tabular-nums">
                          {ch.subscribersCount.toLocaleString()} subs
                        </div>
                      </div>
                      {ch.isConnected && (
                        <span className="w-2 h-2 rounded-full bg-emerald-400" title="Connected" />
                      )}
                    </button>
                  ))}

                  <div className="pt-1 border-t border-slate-800 mt-1">
                    <button
                      onClick={() => {
                        setChannelDropdownOpen(false);
                        onOpenConnectModal();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      Connect Another Channel
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Admin Access Button */}
          {isAdminAuthenticated ? (
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentTab('admin')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/15 text-rose-300 border border-rose-500/30 text-xs font-medium hover:bg-rose-500/25 transition-colors whitespace-nowrap"
                title="Admin Mode Active (Password verified: happy087)"
              >
                <Unlock className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Admin Mode</span>
              </button>
              <button
                onClick={onAdminLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title="Exit Admin Mode"
              >
                <Lock className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium hover:text-white transition-colors whitespace-nowrap"
              title="Admin access required for pipeline configuration"
            >
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Admin Access</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav strip */}
      <div className="flex md:hidden items-center justify-around pt-2.5 mt-2 border-t border-slate-800/60 text-xs">
        <button
          onClick={() => setCurrentTab('queue')}
          className={`flex flex-col items-center gap-1 py-1 px-2 ${currentTab === 'queue' ? 'text-rose-400 font-semibold' : 'text-slate-400'}`}
        >
          <Radio className="w-4 h-4" />
          <span>Pipeline</span>
        </button>
        <button
          onClick={() => setCurrentTab('generator')}
          className={`flex flex-col items-center gap-1 py-1 px-2 ${currentTab === 'generator' ? 'text-indigo-400 font-semibold' : 'text-slate-400'}`}
        >
          <PlaySquare className="w-4 h-4" />
          <span>Studio</span>
        </button>
        <button
          onClick={() => setCurrentTab('batch')}
          className={`flex flex-col items-center gap-1 py-1 px-2 ${currentTab === 'batch' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}
        >
          <Calendar className="w-4 h-4" />
          <span>Calendar</span>
        </button>
        <button
          onClick={() => setCurrentTab('trends')}
          className={`flex flex-col items-center gap-1 py-1 px-2 ${currentTab === 'trends' ? 'text-emerald-400 font-semibold' : 'text-slate-400'}`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Trends</span>
        </button>
        <button
          onClick={() => {
            if (isAdminAuthenticated) setCurrentTab('admin');
            else onOpenAdminModal();
          }}
          className={`flex flex-col items-center gap-1 py-1 px-2 ${currentTab === 'admin' ? 'text-rose-400 font-semibold' : 'text-slate-400'}`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Admin</span>
        </button>
      </div>
    </header>
  );
};
