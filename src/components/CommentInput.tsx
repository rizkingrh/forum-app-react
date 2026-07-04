import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface CommentInputProps {
  onSubmitComment: (content: string) => void;
}

export default function CommentInput({ onSubmitComment }: CommentInputProps) {
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmitComment(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts on this thread..."
        className="w-full min-h-[110px] glass-input pr-12 py-3.5 resize-none border border-white/5 focus:border-brand-accent/50 focus:ring-1 focus:ring-brand-accent/30 bg-slate-950/40 rounded-2xl text-slate-100 text-sm leading-relaxed"
      />
      <button
        type="submit"
        disabled={!content.trim()}
        title="Post Comment"
        className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-gradient-to-r from-brand-accent to-[#7c3aed] text-white hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:pointer-events-none transition-all duration-300 shadow-md shadow-brand-accent/25"
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
