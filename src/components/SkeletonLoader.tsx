export function ThreadListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="glass rounded-2xl p-6 animate-pulse border border-white/5 bg-slate-950/10">
          <div className="h-5 bg-white/5 rounded-full w-20 mb-4"></div>
          <div className="h-7 bg-white/10 rounded-lg w-5/6 mb-3"></div>
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-white/5 rounded w-full"></div>
            <div className="h-4 bg-white/5 rounded w-4/5"></div>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10"></div>
              <div className="h-3 bg-white/5 rounded w-16"></div>
            </div>
            <div className="h-3 bg-white/5 rounded w-24"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ThreadDetailSkeleton() {
  return (
    <div className="glass rounded-2xl p-8 animate-pulse border border-white/5 bg-slate-950/15 space-y-6">
      <div className="h-5 bg-white/5 rounded-full w-20"></div>
      <div className="h-9 bg-white/10 rounded-lg w-3/4"></div>
      <div className="flex items-center gap-3 py-2">
        <div className="w-10 h-10 rounded-full bg-white/10"></div>
        <div>
          <div className="h-4 bg-white/10 rounded w-24 mb-1.5"></div>
          <div className="h-3 bg-white/5 rounded w-16"></div>
        </div>
      </div>
      <div className="space-y-2 pt-4">
        <div className="h-4 bg-white/5 rounded w-full"></div>
        <div className="h-4 bg-white/5 rounded w-full"></div>
        <div className="h-4 bg-white/5 rounded w-5/6"></div>
      </div>
    </div>
  );
}
