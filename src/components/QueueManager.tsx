import React, { useState } from 'react';
import { 
  Radio, 
  Flame, 
  Clock, 
  Play, 
  CheckCircle, 
  Plus, 
  ExternalLink, 
  Eye, 
  ThumbsUp, 
  Calendar, 
  ChevronRight, 
  Trash2, 
  Sparkles,
  RefreshCw,
  Send
} from 'lucide-react';
import { VideoContent, YouTubeChannel } from '../types';

interface QueueManagerProps {
  posts: VideoContent[];
  activeChannel: YouTubeChannel;
  onOpenGenerator: () => void;
  onOpenBatch: () => void;
  onSelectPost: (post: VideoContent) => void;
  onPublishNow: (post: VideoContent) => void;
  onDeletePost: (id: string) => void;
  onTriggerAutoTick: () => void;
  streakDays: number;
}

export const QueueManager: React.FC<QueueManagerProps> = ({
  posts,
  activeChannel,
  onOpenGenerator,
  onOpenBatch,
  onSelectPost,
  onPublishNow,
  onDeletePost,
  onTriggerAutoTick,
  streakDays,
}) => {
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'published' | 'draft'>('all');
  const [isTickActive, setIsTickActive] = useState(false);

  const filteredPosts = posts.filter((p) => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  const scheduledCount = posts.filter((p) => p.status === 'scheduled').length;
  const publishedCount = posts.filter((p) => p.status === 'published').length;

  // Find next upcoming scheduled post
  const nextPost = posts
    .filter((p) => p.status === 'scheduled')
    .sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())[0];

  const handleManualPostTrigger = () => {
    setIsTickActive(true);
    onTriggerAutoTick();
    setTimeout(() => setIsTickActive(false), 1200);
  };

  return (
    <div className="space-y-6">
      {/* Consistency Status Hero Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span className="tabular-nums">{streakDays}</span>-Day Unbroken Streak
              </span>
              <span className="text-xs text-slate-400">
                Target: {activeChannel.cadence.toUpperCase()} @ {activeChannel.preferredPostTimeUtc} UTC
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Consistent YouTube Automation
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Your channel pipeline has <strong className="text-white font-mono">{scheduledCount} videos queued</strong> for automated publishing. The algorithm rewards steady posting intervals.
            </p>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400 font-medium">Next Scheduled Upload</div>
              {nextPost ? (
                <div className="text-xs font-semibold text-white truncate max-w-xs flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{nextPost.title}</span>
                </div>
              ) : (
                <div className="text-xs text-slate-500">No scheduled posts. Generate more!</div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleManualPostTrigger}
                disabled={isTickActive || !nextPost}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 active:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold rounded-2xl border border-slate-700 transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap"
                title="Immediately publishes the next scheduled video to test the pipeline"
              >
                <Radio className={`w-4 h-4 text-rose-400 ${isTickActive ? 'animate-pulse' : ''}`} />
                {isTickActive ? 'Publishing...' : 'Trigger Auto-Post Now'}
              </button>

              <button
                onClick={onOpenGenerator}
                className="px-5 py-3 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white text-xs font-semibold rounded-2xl shadow-lg shadow-rose-600/25 transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                Create New Content
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Controls & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              filter === 'all' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Videos ({posts.length})
          </button>
          <button
            onClick={() => setFilter('scheduled')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              filter === 'scheduled' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Scheduled Buffer ({scheduledCount})
          </button>
          <button
            onClick={() => setFilter('published')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              filter === 'published' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Published ({publishedCount})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-3 py-1.5 rounded-lg transition-colors font-medium ${
              filter === 'draft' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Drafts
          </button>
        </div>

        <button
          onClick={onOpenBatch}
          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          Batch 7-Day Scheduler
        </button>
      </div>

      {/* Posts List / Grid */}
      <div className="grid grid-cols-1 gap-3">
        {filteredPosts.map((post) => {
          const isShort = post.format === 'short';
          const isPublished = post.status === 'published';

          return (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="flex items-start gap-4">
                {/* Thumbnail Preview */}
                <div className="relative w-28 h-18 sm:w-36 sm:h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-slate-800">
                  <img
                    src={post.thumbnailUrl || '/src/assets/images/studio_thumbnail_sample_1790790972715.jpg'}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white font-medium">
                    {post.estimatedDuration}
                  </span>
                  {isShort && (
                    <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-amber-500/90 text-[9px] font-bold text-black uppercase">
                      Short
                    </span>
                  )}
                </div>

                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize ${
                      isPublished
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : post.status === 'scheduled'
                        ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {post.status}
                    </span>

                    <span className="text-slate-400 text-xs">
                      {isPublished
                        ? `Published ${new Date(post.publishedAt || post.createdAt).toLocaleDateString()}`
                        : `Scheduled for ${new Date(post.scheduledFor).toLocaleDateString()} @ ${new Date(post.scheduledFor).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
                    </span>

                    {post.isAutoGenerated && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-rose-400">
                        <Sparkles className="w-3 h-3" />
                        AI Produced
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-semibold text-white leading-snug group-hover:text-rose-400 transition-colors line-clamp-1">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-1 italic">
                    Hook: "{post.hook || post.description.slice(0, 80)}"
                  </p>
                </div>
              </div>

              {/* Stats / Controls */}
              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                {isPublished ? (
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold tabular-nums">
                      <Eye className="w-3.5 h-3.5" />
                      {(post.views || 42180).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400 tabular-nums">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {(post.likes || 2940).toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPublishNow(post);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-rose-600/15 hover:bg-rose-600/30 text-rose-400 border border-rose-500/30 text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    Publish Now
                  </button>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePost(post.id);
                  }}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </div>
            </div>
          );
        })}

        {filteredPosts.length === 0 && (
          <div className="p-12 rounded-2xl bg-slate-900/50 border border-slate-800 text-center space-y-3">
            <Radio className="w-8 h-8 text-slate-600 mx-auto" />
            <h4 className="text-sm font-semibold text-white">No content in this view</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Use the AI Content Studio or Batch Calendar to stock your channel with high-converting scripts.
            </p>
            <button
              onClick={onOpenGenerator}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-all"
            >
              Generate New Video
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
