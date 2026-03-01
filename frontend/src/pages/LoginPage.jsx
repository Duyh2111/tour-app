import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdExplore } from 'react-icons/md';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (result.success) {
      navigate(result.role === 'admin' ? '/admin' : '/tours');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-12">
            <MdExplore className="text-gold-500 text-2xl" />
            <span className="font-display text-2xl font-semibold text-navy-900">
              Wander<span className="text-gold-500">Lux</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-4xl text-navy-900 font-light mb-2">Welcome back</h1>
            <p className="font-body text-gray-500 text-sm">Sign in to your account to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-2">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-field pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy-800"
                >
                  {showPass ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy-900 text-white py-4 font-body font-semibold text-sm tracking-wide hover:bg-navy-950 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <p className="font-body text-sm text-gray-500 mt-6 text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-navy-800 font-semibold hover:text-gold-600 transition-colors">
              Create one
            </Link>
          </p>

          {/* Demo credentials */}
          <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
            <p className="font-body text-xs uppercase tracking-widest text-gray-400 mb-3">Demo Accounts</p>
            <div className="space-y-2">
              <div className="flex gap-3">
                <span className="badge-gold text-xs">Admin</span>
                <span className="font-body text-xs text-gray-600">admin@tourapp.com / Admin@123456</span>
              </div>
              <div className="flex gap-3">
                <span className="badge-navy text-xs">User</span>
                <span className="font-body text-xs text-gray-600">user@tourapp.com / User@123456</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=900&h=1200&fit=crop"
          alt="Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-900/40" />
        <div className="absolute bottom-12 left-12 right-12">
          <blockquote className="font-display text-2xl text-white font-light italic leading-relaxed">
            "The world is a book, and those who do not travel read only one page."
          </blockquote>
          <cite className="font-body text-white/60 text-sm mt-4 block">— Saint Augustine</cite>
        </div>
      </div>
    </div>
  );
}
