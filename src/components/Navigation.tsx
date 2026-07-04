import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../states/hooks';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import { LogOut, LogIn, MessageSquare } from 'lucide-react';

export default function Navigation() {
  const authUser = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5 py-4 px-6 mb-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-gradient-to-tr from-brand-accent to-brand-cyan text-white shadow-lg group-hover:scale-105 transition-all duration-300">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-cyan bg-clip-text text-transparent">
            DevTalk
          </span>
        </Link>

        {/* User profile / Login */}
        <div className="flex items-center gap-4">
          {authUser ? (
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="w-8 h-8 rounded-full border border-white/20 shadow-md object-cover"
              />
              <span className="hidden sm:inline text-sm font-medium text-slate-300">
                {authUser.name}
              </span>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
