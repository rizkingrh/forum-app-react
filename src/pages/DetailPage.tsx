import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../states/hooks';
import { asyncReceiveThreadDetail, asyncCreateComment } from '../states/threadDetail/action';
import CommentCard from '../components/CommentCard';
import CommentInput from '../components/CommentInput';
import { ThreadDetailSkeleton } from '../components/SkeletonLoader';
import { Calendar, Tag, MessageSquare, ArrowLeft, LogIn } from 'lucide-react';
import { postedAt } from '../utils';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);

  const threadDetail = useAppSelector((state) => state.threadDetail);
  const authUser = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(asyncReceiveThreadDetail(id)).then(() => {
        setLoading(false);
      });
    }
  }, [id, dispatch]);

  const handleSubmitComment = async (content: string) => {
    if (id) {
      await dispatch(asyncCreateComment({ threadId: id, content }));
    }
  };

  if (loading || !threadDetail) {
    return (
      <div className="max-w-4xl mx-auto px-6 pb-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 mb-6 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to home
        </Link>
        <ThreadDetailSkeleton />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pb-16">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to home
      </Link>

      <article className="glass rounded-2xl p-6 sm:p-8 border border-white/5 relative overflow-hidden bg-slate-950/10 mb-8">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Category Tag */}
        <div className="flex items-center gap-1.5 mb-4 text-xs font-semibold text-brand-cyan bg-brand-cyan/10 px-2.5 py-1 rounded-full w-fit">
          <Tag className="w-3.5 h-3.5" />
          <span>#{threadDetail.category}</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
          {threadDetail.title}
        </h1>

        {/* Author & Info */}
        <div className="flex items-center gap-3 py-4 border-y border-white/5 mb-6 text-xs text-slate-400">
          <img
            src={threadDetail.owner.avatar || 'https://via.placeholder.com/150'}
            alt={threadDetail.owner.name}
            className="w-9 h-9 rounded-full border border-white/10"
          />
          <div>
            <h4 className="font-semibold text-slate-200">{threadDetail.owner.name}</h4>
            <div className="flex items-center gap-3 mt-0.5 text-slate-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {postedAt(threadDetail.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div
          className="text-slate-300 text-sm sm:text-base leading-relaxed"
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />
      </article>

      {/* Discussion Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-brand-cyan" />
            Discussion ({threadDetail.comments.length})
          </h2>
        </div>

        {/* Comment box */}
        {authUser ? (
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Add to discussion
            </h3>
            <CommentInput onSubmitComment={handleSubmitComment} />
          </div>
        ) : (
          <div className="glass rounded-xl p-5 border border-dashed border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-950/20">
            <div>
              <h4 className="text-sm font-semibold text-slate-200">Want to join the discussion?</h4>
              <p className="text-xs text-slate-400 mt-1">You must sign in before posting comments.</p>
            </div>
            <Link
              to="/login"
              className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl bg-brand-accent hover:opacity-90 text-white shadow-md shadow-brand-accent/25 transition-all duration-300 w-fit"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </Link>
          </div>
        )}

        {/* Comments list */}
        <div className="space-y-4 pt-2">
          {threadDetail.comments.length > 0 ? (
            threadDetail.comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          ) : (
            <p className="text-slate-500 text-sm text-center py-8">
              No comments yet. Be the first to start the conversation!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
