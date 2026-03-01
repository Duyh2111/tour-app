import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { MdExplore } from 'react-icons/md';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      scrolled ? 'bg-navy-900 shadow-2xl py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <MdExplore className="text-gold-500 text-3xl group-hover:rotate-12 transition-transform duration-300" />
            <div>
              <span className="font-display text-2xl font-semibold text-white tracking-wide">
                Trần Gia<span className="text-gold-500"> Travel</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-body text-sm tracking-widest uppercase transition-colors duration-200 ${
                  isActive ? 'text-gold-500' : 'text-white/80 hover:text-white'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/tours"
              className={({ isActive }) =>
                `font-body text-sm tracking-widest uppercase transition-colors duration-200 ${
                  isActive ? 'text-gold-500' : 'text-white/80 hover:text-white'
                }`
              }
            >
              Tours
            </NavLink>

            {/* Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 transition-all duration-200"
                >
                  <FiUser className="text-gold-500" />
                  <span className="font-body text-sm">{user.name.split(' ')[0]}</span>
                  {isAdmin && (
                    <span className="bg-gold-500 text-navy-900 text-xs px-1.5 py-0.5 font-semibold ml-1">
                      ADMIN
                    </span>
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-navy-900 border border-white/10 shadow-2xl py-2 z-50">
                    {isAdmin && (
                      <>
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 font-body text-sm transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <FiSettings size={14} /> Dashboard
                        </Link>
                        <Link
                          to="/admin/tours"
                          className="flex items-center gap-2 px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/10 font-body text-sm transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <MdExplore size={14} /> Manage Tours
                        </Link>
                        <div className="border-t border-white/10 my-1" />
                      </>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-white/10 font-body text-sm transition-colors"
                    >
                      <FiLogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="font-body text-sm tracking-widest uppercase text-white/80 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gold-500 text-navy-900 px-5 py-2 font-body text-sm font-semibold tracking-wide hover:bg-gold-400 transition-colors duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-3 animate-fade-in">
            <Link to="/" className="block font-body text-sm uppercase tracking-widest text-white/80 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/tours" className="block font-body text-sm uppercase tracking-widest text-white/80 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Tours</Link>
            {user ? (
              <>
                {isAdmin && (
                  <>
                    <Link to="/admin" className="block font-body text-sm uppercase tracking-widest text-gold-500 py-2" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <Link to="/admin/tours" className="block font-body text-sm uppercase tracking-widest text-gold-500 py-2" onClick={() => setMenuOpen(false)}>Manage Tours</Link>
                  </>
                )}
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="block font-body text-sm uppercase tracking-widest text-red-400 py-2">Sign Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block font-body text-sm uppercase tracking-widest text-white/80 hover:text-white py-2" onClick={() => setMenuOpen(false)}>Sign In</Link>
                <Link to="/register" className="inline-block bg-gold-500 text-navy-900 px-5 py-2 font-body text-sm font-semibold" onClick={() => setMenuOpen(false)}>Get Started</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
