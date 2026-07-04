import { Link } from 'react-router-dom';
import { MessageSquare, Calendar, Tag } from 'lucide-react';
import type { Thread, User } from '../utils/api';
import { postedAt } from '../utils';

interface ThreadCardProps {
  thread: Thread;
  user: User | undefined;
}

export default function ThreadCard({ thread, user }: ThreadCardProps) {
  // Strip HTML tags for clean plain-text excerpt
  const strippedBody = thread.body.replace(/<[^>]*>/g, '');
  const excerpt = strippedBody.length > 150
    ? `${strippedBody.substring(0, 150)}...`
    : strippedBody;

  return (
    <article className="glass-card glass-card-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
      <div>
        {/* Category Tag */}
        <div className="flex items-center gap-1.5 mb-4 text-xs font-semibold text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-full w-fit">
          <Tag className="w-3.5 h-3.5" />
          <span>#{thread.category}</span>
        </div>

        {/* Title */}
        <Link to={`/threads/${thread.id}`} className="block group/title">
          <h2 className="text-xl font-semibold text-white group-hover/title:text-brand-cyan transition-colors mb-2.5 line-clamp-2">
            {thread.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
          {excerpt}
        </p>
      </div>

      {/* Footer / Meta info */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-slate-400 mt-auto">
        {/* User Info */}
        <div className="flex items-center gap-2">
          <img
            src={user?.avatar || 'https://via.placeholder.com/150'}
            alt={user?.name || 'User'}
            className="w-7 h-7 rounded-full border border-white/10"
          />
          <span className="font-medium text-slate-300">
            {user?.name || 'Anonymous'}
          </span>
        </div>

        {/* Post Metadata */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{postedAt(thread.createdAt)}</span>
          </div>

          <div className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{thread.totalComments} comments</span>
          </div>
        </div>
      </div>
    </article>
  );
}
