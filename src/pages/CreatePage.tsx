import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../states/hooks';
import { asyncCreateThread } from '../states/threads/action';
import { PlusCircle, ArrowLeft } from 'lucide-react';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const authUser = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // If user is not authenticated, redirect to login page
  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !body) return;

    // Default category to 'general' if empty
    const threadCategory = category.trim() || 'general';
    const success = await dispatch(asyncCreateThread({ title, body, category: threadCategory }));

    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 pb-16">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 mb-6 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to home
      </Link>

      <div className="glass rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Decorative background blurs */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/5 relative">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-brand-accent to-brand-cyan text-white">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Create New Thread</h1>
            <p className="text-xs text-slate-400 mt-0.5">Start a conversation with the developer community</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Thread Title
            </label>
            <div className="relative">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What is your topic about?"
                required
                className="w-full pl-11 glass-input"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Category / Tag
            </label>
            <div className="relative">
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="react, typescript, css (defaults to 'general')"
                className="w-full pl-11 glass-input"
              />
            </div>
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Description / Body
            </label>
            <div className="relative">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Provide a detailed explanation of your topic..."
                required
                rows={8}
                className="w-full pl-11 py-3.5 glass-input min-h-[180px] resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/5 mt-8">
            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 transition-all duration-300"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={!title.trim() || !body.trim()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-accent to-brand-cyan text-white text-xs font-semibold hover:opacity-95 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none shadow-md shadow-brand-accent/20 transition-all duration-300"
            >
              Publish Thread
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
