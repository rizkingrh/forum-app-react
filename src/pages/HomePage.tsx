import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../states/hooks';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import ThreadCard from '../components/ThreadCard';
import { ThreadListSkeleton } from '../components/SkeletonLoader';
import { Tag, FilterX } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const threads = useAppSelector((state) => state.threads);
  const users = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  // Extract unique categories from threads
  const categories = Array.from(new Set(threads.map((t) => t.category))).filter(Boolean);

  // Filter threads by category if one is selected
  const filteredThreads = selectedCategory
    ? threads.filter((t) => t.category === selectedCategory)
    : threads;

  return (
    <div className="max-w-6xl mx-auto px-6 pb-16">
      {/* Intro section */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl bg-gradient-to-r from-white via-slate-200 to-brand-cyan bg-clip-text text-transparent">
          Active Discussions
        </h1>
        <p className="mt-2 text-slate-400 text-sm">
          Browse topics, ask questions, or share your developer insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Thread List */}
        <div className="lg:col-span-3 space-y-6">
          {loading ? (
            <ThreadListSkeleton />
          ) : filteredThreads.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredThreads.map((thread) => {
                const user = users.find((u) => u.id === thread.ownerId);
                return <ThreadCard key={thread.id} thread={thread} user={user} />;
              })}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center border border-white/5 bg-slate-950/10">
              <p className="text-slate-400 text-sm">No threads found in this category.</p>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-brand-cyan border border-brand-cyan/20 rounded-xl hover:bg-brand-cyan/10 transition-all duration-300"
                >
                  Clear Category Filter
                </button>
              )}
            </div>
          )}
        </div>

        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="glass rounded-2xl p-6 border border-white/5 sticky top-28 bg-slate-950/10">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4 text-brand-accent" />
              Categories
            </h3>

            {categories.length > 0 ? (
              <div className="flex flex-wrap lg:flex-col gap-2">
                {/* Reset button */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-fit lg:w-full flex items-center justify-between text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 border ${
                    selectedCategory === null
                      ? 'bg-brand-cyan/15 border-brand-cyan/30 text-brand-cyan shadow-sm'
                      : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-slate-200'
                  }`}
                >
                  <span>All Discussions</span>
                  {selectedCategory !== null && <FilterX className="w-3.5 h-3.5 opacity-60" />}
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-fit lg:w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 border truncate ${
                      selectedCategory === category
                        ? 'bg-brand-cyan/15 border-brand-cyan/30 text-brand-cyan shadow-sm'
                        : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-slate-200'
                    }`}
                  >
                    #{category}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">No categories found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
