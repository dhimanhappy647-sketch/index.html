import React, { useState } from 'react';
import { Youtube, X, Check, Globe, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { YouTubeChannel } from '../types';

interface ChannelConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectChannel: (channel: YouTubeChannel) => void;
}

export const ChannelConnectModal: React.FC<ChannelConnectModalProps> = ({
  isOpen,
  onClose,
  onConnectChannel,
}) => {
  const [handle, setHandle] = useState('@MyCreatorChannel');
  const [title, setTitle] = useState('My Creator Channel');
  const [category, setCategory] = useState('Science & Technology');
  const [niche, setNiche] = useState('AI tutorials, coding deep dives, and software architecture');
  const [targetAudience, setTargetAudience] = useState('Developers and tech enthusiasts looking for actionable tutorials');
  const [tone, setTone] = useState('Authoritative, fast-paced, insightful');
  const [cadence, setCadence] = useState<'daily' | 'twice-daily' | 'mwf' | 'weekly'>('daily');
  const [preferredPostTimeUtc, setPreferredPostTimeUtc] = useState('16:00');
  const [defaultPrivacy, setDefaultPrivacy] = useState<'public' | 'unlisted' | 'private'>('public');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  if (!isOpen) return null;

  const handleOAuthConnect = () => {
    setIsAuthorizing(true);
    // Simulate YouTube OAuth handshake
    setTimeout(() => {
      const newChannel: YouTubeChannel = {
        id: `ch-${Date.now()}`,
        title: title.trim() || 'My YouTube Channel',
        handle: handle.startsWith('@') ? handle.trim() : `@${handle.trim()}`,
        avatarUrl: '/src/assets/images/channel_default_avatar_1790790959860.jpg',
        subscribersCount: Math.floor(Math.random() * 25000) + 1200,
        videoCount: Math.floor(Math.random() * 40) + 5,
        totalViews: Math.floor(Math.random() * 850000) + 45000,
        category,
        niche,
        targetAudience,
        tone,
        cadence,
        preferredPostTimeUtc,
        isConnected: true,
        connectedAt: new Date().toISOString(),
        defaultPrivacy,
        authType: 'oauth',
      };

      setIsAuthorizing(false);
      onConnectChannel(newChannel);
      onClose();
    }, 900);
  };

  const applyPreset = (presetName: string) => {
    if (presetName === 'tech') {
      setTitle('NextGen AI & Tech');
      setHandle('@NextGenAIOfficial');
      setCategory('Science & Technology');
      setNiche('Cutting edge artificial intelligence, autonomous agents, and dev tools');
      setTargetAudience('Engineers, developers, and tech builders');
      setTone('Technical, crisp, engaging');
      setCadence('daily');
      setPreferredPostTimeUtc('16:00');
    } else if (presetName === 'shorts') {
      setTitle('60s Viral Science');
      setHandle('@ViralScienceDaily');
      setCategory('Education');
      setNiche('Mind-bending physics, space discoveries, and computer science facts');
      setTargetAudience('Mobile curiosity seekers and students');
      setTone('Sensational, high-energy, punchy');
      setCadence('twice-daily');
      setPreferredPostTimeUtc('12:00');
    } else if (presetName === 'finance') {
      setTitle('Smart Money & Macro');
      setHandle('@SmartMoneyDaily');
      setCategory('Finance & Business');
      setNiche('Personal finance, market trends, and macro economics');
      setTargetAudience('Investors, founders, and professionals');
      setTone('Pragmatic, data-backed, clear');
      setCadence('mwf');
      setPreferredPostTimeUtc('14:00');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 relative overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-500">
              <Youtube className="w-4 h-4 fill-rose-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Connect YouTube Channel</h3>
              <p className="text-xs text-slate-400">Link channel to enable automated content generation & auto-uploading</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] font-medium text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Quick Channel Profile Presets:
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => applyPreset('tech')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              💻 Tech & AI Engineering
            </button>
            <button
              type="button"
              onClick={() => applyPreset('shorts')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              ⚡ 60s Viral Shorts Hub
            </button>
            <button
              type="button"
              onClick={() => applyPreset('finance')}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            >
              📈 Finance & Tech Markets
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Channel Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. ApexTech AI"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                YouTube Handle
              </label>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="@handle"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Channel Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
            >
              <option value="Science & Technology">Science & Technology</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Gaming">Gaming</option>
              <option value="Howto & Style">Howto & Style</option>
              <option value="Finance & Business">Finance & Business</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Content Niche & Key Topics
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g. AI agent tutorials, Python automation, tech breakdowns"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Target Audience
            </label>
            <input
              type="text"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              placeholder="Who are the videos crafted for?"
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Posting Cadence
              </label>
              <select
                value={cadence}
                onChange={(e) => setCadence(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
              >
                <option value="daily">Daily (1 post/day)</option>
                <option value="twice-daily">Twice Daily (Shorts)</option>
                <option value="mwf">Mon / Wed / Fri</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                Post Time (UTC)
              </label>
              <input
                type="time"
                value={preferredPostTimeUtc}
                onChange={(e) => setPreferredPostTimeUtc(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400" />
                Default Visibility
              </label>
              <select
                value={defaultPrivacy}
                onChange={(e) => setDefaultPrivacy(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
              >
                <option value="public">Public</option>
                <option value="unlisted">Unlisted (Review)</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>YouTube Data API v3 OAuth Ready</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOAuthConnect}
              disabled={isAuthorizing || !title.trim()}
              className="px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-500 active:bg-rose-700 disabled:opacity-50 rounded-xl transition-all shadow-md shadow-rose-600/20 flex items-center gap-2"
            >
              {isAuthorizing ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Authorizing...
                </>
              ) : (
                <>
                  <Youtube className="w-4 h-4 fill-white" />
                  Link & Authorize Channel
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
