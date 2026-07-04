import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../states/hooks';
import { asyncSetAuthUser } from '../states/authUser/action';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authUser = useAppSelector((state) => state.authUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to home page
  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    const success = await dispatch(asyncSetAuthUser({ email, password }));
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 pb-8">
      <div className="w-full max-w-md glass rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
        {/* Decorative backdrop shapes */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-accent/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-cyan/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex flex-col items-center mb-8 relative">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-brand-accent to-brand-cyan text-white mb-4">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome</h1>
          <p className="text-sm text-slate-400 mt-1">Sign in to join the dev discussion</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-11 glass-input"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full pl-11 glass-input"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!email || password.length < 6}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-accent to-brand-cyan text-white font-semibold hover:opacity-95 active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none shadow-lg shadow-brand-accent/20 transition-all duration-300 mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-slate-400 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-cyan hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
