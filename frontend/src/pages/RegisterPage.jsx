import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { MdExplore } from 'react-icons/md';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass]   = useState(false);
  const [error, setError]         = useState('');
  const { register, loading }     = useAuth();
  const navigate                  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setError('');
    const result = await register(form.name, form.email, form.password);
    if (result.success) navigate('/tours');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Image */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555921015-5532091f6026?w=900&h=1200&fit=crop"
          alt="Hoi An, Vietnam"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-900/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500" />
            <span className="font-body text-gold-500 text-xs uppercase tracking-widest">Hội An, Vietnam</span>
          </div>
          <h2 className="font-display text-4xl text-white font-light leading-tight mb-4">
            Begin your journey<br />
            <em className="text-gold-400">through Vietnam</em>
          </h2>
          <p className="font-body text-white/60 text-sm leading-relaxed">
            Join thousands of travellers who have discovered Vietnam's extraordinary beauty with Trần Gia Travel.
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 py-12 bg-white">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="flex items-center gap-2 mb-12 group">
            <MdExplore className="text-gold-500 text-2xl group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-display text-2xl font-semibold text-navy-900">
              Trần Gia<span className="text-gold-500"> Travel</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-4xl text-navy-900 font-light mb-2">Create account</h1>
            <p className="font-body text-gray-500 text-sm">Start exploring Vietnam's wonders today</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 font-body text-sm px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: 'Full Name',         key: 'name',            type: 'text',     icon: FiUser,  placeholder: 'Nguyễn Văn An' },
              { label: 'Email Address',     key: 'email',           type: 'email',    icon: FiMail,  placeholder: 'you@example.com' },
              { label: 'Password',          key: 'password',        type: 'password', icon: FiLock,  placeholder: 'Min. 6 characters', toggleShow: true },
              { label: 'Confirm Password',  key: 'confirmPassword', type: 'password', icon: FiLock,  placeholder: 'Repeat password' },
            ].map(({ label, key, type, icon: Icon, placeholder, toggleShow }) => (
              <div key={key}>
                <label className="form-label">{label}</label>
                <div className="relative">
                  <Icon className="form-icon" />
                  <input
                    type={toggleShow && showPass ? 'text' : type}
                    required
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="input-field pl-10 pr-11"
                  />
                  {toggleShow && (
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy-800 transition-colors">
                      {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              type="submit" disabled={loading}
              className="w-full bg-navy-900 text-white py-4 font-body font-semibold text-sm tracking-wide hover:bg-gold-500 hover:text-navy-900 transition-all duration-300 disabled:opacity-60"
            >
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>

          <p className="font-body text-sm text-gray-500 mt-6 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-navy-800 font-semibold hover:text-gold-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
