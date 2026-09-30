import React from 'react';
import { 
  X, 
  Play, 
  ExternalLink, 
  Clock, 
  ThumbsUp, 
  Eye, 
  MessageSquare, 
  Radio, 
  Trash2, 
  Copy, 
  Check, 
  Flame, 
  Youtube 
} from 'lucide-react';
import { VideoContent } from '../types';

interface VideoDetailModalProps {
  post: VideoContent | null;
  onClose: () => void;
  onPublishNow: (post: VideoContent) => void;
  onDeletePost: (id: string) => void;
}

export const VideoDetailModal: React.FC<VideoDetailModalProps> = ({
  post,
  onClose,
  onPublishNow,
  onDeletePost,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!post) return null;

  const isShort = post.format === 'short';
  const isPublished = post.status === 'published';

  const copyUrl = () => {
    if (post.youtubeVideoUrl) {
      navigator.clipboard.writeText(post.youtubeVideoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 relative overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${
              isShort ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }`}>
              {isShort ? <Flame className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isShort ? 'YouTube Short (9:16)' : 'Full Video (16:9)'}
            </span>

            <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${
              post.status === 'published'
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : post.status === 'scheduled'
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                : 'bg-slate-800 text-slate-400'
            }`}>
              {post.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Mockup */}
        <div className="mt-5 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-black border border-slate-800 group shadow-lg">
            <div className={`relative ${isShort ? 'aspect-[9/16] max-w-xs mx-auto' : 'aspect-video w-full'}`}>
              <img
                src={post.thumbnailUrl || '/src/assets/images/studio_thumbnail_sample_1790790972715.jpg'}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-rose-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-white ml-0.5" />
                </div>
              </div>

              {/* YouTube Player top overlay */}
              <div className="absolute top-0 inset-x-0 p-3 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between text-white text-xs">
                <span className="font-medium truncate max-w-sm">{post.title}</span>
                <span className="font-mono bg-black/60 px-2 py-0.5 rounded text-[11px]">
                  {post.estimatedDuration}
                </span>
              </div>

              {/* Bottom controls bar mockup */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-3">
                  <Play className="w-4 h-4 fill-white" />
                  <span className="text-[11px] font-mono">0:00 / {post.estimatedDuration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Youtube className="w-4 h-4 text-rose-500" />
                  <span className="text-[10px] text-slate-300 font-medium">AutoTube Automation</span>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-bold text-white leading-snug">
            {post.title}
          </h2>

          {/* Published stats or scheduled time */}
          {isPublished ? (
            <div className="flex items-center gap-4 text-xs text-slate-400 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <Eye className="w-3.5 h-3.5" />
                <span className="tabular-nums font-mono font-semibold">{(post.views || 42180).toLocaleString()}</span> Views
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <ThumbsUp className="w-3.5 h-3.5 text-indigo-400" />
                <span className="tabular-nums font-mono">{(post.likes || 2940).toLocaleString()}</span> Likes
              </span>
              <span>·</span>
              <span className="text-slate-400">Published: {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>

              {post.youtubeVideoUrl && (
                <div className="ml-auto flex items-center gap-2">
                  <a
                    href={post.youtubeVideoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-rose-400 hover:text-rose-300 flex items-center gap-1 font-medium"
                  >
                    Watch on YouTube
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    onClick={copyUrl}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Copy URL"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-400 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Scheduled Auto-Post: <strong className="text-white font-mono">{new Date(post.scheduledFor).toLocaleString()}</strong></span>
            </div>
          )}

          {/* Retention Hook */}
          {post.hook && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-200">
              <span className="font-semibold text-amber-400">Retention Hook:</span> "{post.hook}"
            </div>
          )}

          {/* SEO Description */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-400">Description:</span>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {post.description || 'No description provided.'}
            </div>
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-xs text-slate-400 font-mono"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              onDeletePost(post.id);
              onClose();
            }}
            className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete from Queue
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>

            {!isPublished && (
              <button
                onClick={() => {
                  onPublishNow(post);
                  onClose();
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl transition-all shadow-md shadow-rose-600/20 flex items-center gap-1.5"
              >
                <Radio className="w-3.5 h-3.5" />
                Publish to YouTube Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
