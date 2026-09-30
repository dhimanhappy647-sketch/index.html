import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  ShieldCheck, 
  Power, 
  Key, 
  AlertTriangle, 
  Database, 
  Clock, 
  CheckCircle2, 
  RefreshCw, 
  Play, 
  LogOut, 
  Terminal,
  Activity,
  Sparkles
} from 'lucide-react';
import { AdminSettings, SystemLog, YouTubeChannel } from '../types';

interface AdminControlPanelProps {
  settings: AdminSettings;
  onUpdateSettings: (newSettings: Partial<AdminSettings>) => void;
  logs: SystemLog[];
  onTriggerAutoTick: () => void;
  onLogout: () => void;
  activeChannel: YouTubeChannel;
}

export const AdminControlPanel: React.FC<AdminControlPanelProps> = ({
  settings,
  onUpdateSettings,
  logs,
  onTriggerAutoTick,
  onLogout,
  activeChannel,
}) => {
  const [apiKey, setApiKey] = useState(settings.youtubeApiKey || '');
  const [clientId, setClientId] = useState(settings.youtubeClientId || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isTickRunning, setIsTickRunning] = useState(false);

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      youtubeApiKey: apiKey.trim(),
      youtubeClientId: clientId.trim(),
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleManualTick = () => {
    setIsTickRunning(true);
    onTriggerAutoTick();
    setTimeout(() => setIsTickRunning(false), 1200);
  };

  const quotaPercent = Math.min(100, Math.round((settings.quotaUsedToday / settings.quotaLimitDaily) * 100));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-rose-500" />
              Admin Master Control Panel
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Authenticated (happy087)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure automated YouTube posting daemons, API quota thresholds, and emergency overrides.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleManualTick}
            disabled={isTickRunning || settings.emergencyStop}
            className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5 border border-slate-700"
            title="Forces the cron runner to execute an immediate check on scheduled posts"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-rose-400 ${isTickRunning ? 'animate-spin' : ''}`} />
            Run Cron Tick Now
          </button>

          <button
            onClick={onLogout}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium rounded-xl transition-colors flex items-center gap-1.5 border border-slate-800"
          >
            <LogOut className="w-3.5 h-3.5" />
            Exit Admin Mode
          </button>
        </div>
      </div>

      {/* Primary Toggles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Toggle 1: Auto-Poster Engine */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">
                Master Auto-Poster
              </span>
              <span className={`w-2 h-2 rounded-full ${settings.isAutoPosterActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'}`} />
            </div>
            <p className="text-xs text-slate-400">
              When active, automatically publishes scheduled videos to YouTube when their target UTC time arrives.
            </p>
          </div>

          <button
            onClick={() => onUpdateSettings({ isAutoPosterActive: !settings.isAutoPosterActive })}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              settings.isAutoPosterActive
                ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <Power className="w-4 h-4" />
            {settings.isAutoPosterActive ? 'Engine: ACTIVE' : 'Engine: PAUSED'}
          </button>
        </div>

        {/* Toggle 2: Infinite Consistency Autopilot */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Infinite Autopilot
              </span>
              <span className={`w-2 h-2 rounded-full ${settings.infiniteConsistencyMode ? 'bg-amber-400' : 'bg-slate-600'}`} />
            </div>
            <p className="text-xs text-slate-400">
              Automatically triggers Gemini to draft and schedule the next video whenever the upload queue drops below 3 items.
            </p>
          </div>

          <button
            onClick={() => onUpdateSettings({ infiniteConsistencyMode: !settings.infiniteConsistencyMode })}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              settings.infiniteConsistencyMode
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {settings.infiniteConsistencyMode ? 'Autopilot: ENABLED' : 'Autopilot: OFF'}
          </button>
        </div>

        {/* Toggle 3: Emergency Kill Switch */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Emergency Kill Switch
              </span>
              <span className={`w-2 h-2 rounded-full ${settings.emergencyStop ? 'bg-rose-500 animate-ping' : 'bg-slate-600'}`} />
            </div>
            <p className="text-xs text-slate-400">
              Instantly halts all outbound API requests, uploads, and automated posting processes across all channels.
            </p>
          </div>

          <button
            onClick={() => onUpdateSettings({ emergencyStop: !settings.emergencyStop })}
            className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              settings.emergencyStop
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'bg-slate-800 text-slate-400 hover:bg-rose-950/40 hover:text-rose-300'
            }`}
          >
            {settings.emergencyStop ? 'SYSTEM HALTED' : 'Normal Operation'}
          </button>
        </div>
      </div>

      {/* Quota & Credentials Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* YouTube API Quota Gauge */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-indigo-400" />
              YouTube Data API v3 Daily Quota
            </span>
            <span className="text-xs font-mono text-slate-400 tabular-nums">
              {settings.quotaUsedToday.toLocaleString()} / {settings.quotaLimitDaily.toLocaleString()} units
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                quotaPercent > 80 ? 'bg-rose-500' : quotaPercent > 50 ? 'bg-amber-500' : 'bg-indigo-500'
              }`}
              style={{ width: `${quotaPercent}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span>Video Insert Cost: 1,600 units</span>
            <span>Shorts Cost: 800 units</span>
            <span>Resets: 00:00 PST</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
            Current capacity allows approximately <strong className="text-white font-mono">{Math.floor((settings.quotaLimitDaily - settings.quotaUsedToday) / 1600)}</strong> more full video uploads or <strong className="text-white font-mono">{Math.floor((settings.quotaLimitDaily - settings.quotaUsedToday) / 800)}</strong> Shorts today.
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSaveCredentials} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-amber-400" />
              YouTube API v3 Credentials
            </span>
            {savedSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Updated!
              </span>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              YouTube Data API v3 Key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-slate-400 mb-1">
              OAuth 2.0 Client ID
            </label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="185481...apps.googleusercontent.com"
              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white font-mono focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm shadow-rose-600/20"
            >
              Save Credentials
            </button>
          </div>
        </form>
      </div>

      {/* System Audit Logs */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-emerald-400" />
            System Audit & Execution Logs
          </span>
          <span className="text-xs font-mono text-slate-500">
            {logs.length} events logged
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 max-h-56 overflow-y-auto">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 text-slate-300 text-[11px] leading-relaxed">
              <span className="text-slate-500 shrink-0 tabular-nums">
                [{new Date(log.timestamp).toLocaleTimeString()}]
              </span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold shrink-0 ${
                log.type === 'success'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : log.type === 'admin'
                  ? 'bg-rose-500/10 text-rose-400'
                  : log.type === 'warning'
                  ? 'bg-amber-500/10 text-amber-400'
                  : 'bg-slate-800 text-slate-300'
              }`}>
                {log.type}
              </span>
              <div className="flex-1">
                <span>{log.message}</span>
                {log.details && (
                  <div className="text-slate-500 text-[10px] mt-0.5">{log.details}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
