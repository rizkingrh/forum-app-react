import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './states/hooks';
import { asyncPreloadProcess } from './states/isPreload/action';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import CreatePage from './pages/CreatePage';
import LoadingBar from './components/LoadingBar';
import { Plus } from 'lucide-react';

export default function App() {
  const isPreload = useAppSelector((state) => state.isPreload);
  const authUser = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#080b11] text-slate-100">
        <div className="relative flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-brand-accent/20 border-t-brand-accent animate-spin"></div>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500 animate-pulse">
            Loading DevTalk
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#080b11] relative">
      {/* Global Loading Bar */}
      <LoadingBar />

      {/* Main Navigation */}
      <Navigation />

      {/* Main Content Layout */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/new" element={<CreatePage />} />
        </Routes>
      </main>

      {/* Floating Sticky Create Thread Button (Only visible to logged-in users) */}
      {authUser && (
        <Link
          to="/new"
          title="Create New Thread"
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-brand-accent to-brand-cyan text-white shadow-xl shadow-brand-accent/20 hover:scale-110 active:scale-95 border border-white/10 transition-all duration-300 group"
        >
          <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </Link>
      )}

      {/* Simple Footer */}
      <footer className="py-8 border-t border-white/5 text-center text-xs text-slate-600 mt-auto">
        <p>© 2026 DevTalk Forum. All rights reserved.</p>
      </footer>
    </div>
  );
}
