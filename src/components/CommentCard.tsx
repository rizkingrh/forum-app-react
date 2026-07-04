import { Calendar } from 'lucide-react';
import type { Comment } from '../utils/api';
import { postedAt } from '../utils';

interface CommentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="glass-card rounded-xl p-5 border border-white/5 bg-slate-950/20">
      <div className="flex items-start justify-between gap-4 mb-3">
        {/* Creator Info */}
        <div className="flex items-center gap-3">
          <img
            src={comment.owner.avatar || 'https://via.placeholder.com/150'}
            alt={comment.owner.name}
            className="w-8 h-8 rounded-full border border-white/10"
          />
          <div>
            <h4 className="text-sm font-semibold text-slate-200">
              {comment.owner.name}
            </h4>
            <span className="text-[10px] text-brand-cyan/80 font-medium uppercase tracking-wider">Member</span>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Calendar className="w-3.5 h-3.5" />
          <span>{postedAt(comment.createdAt)}</span>
        </div>
      </div>

      {/* Content */}
      <div
        className="text-slate-300 text-sm leading-relaxed pl-11"
        dangerouslySetInnerHTML={{ __html: comment.content }}
      />
    </div>
  );
}
