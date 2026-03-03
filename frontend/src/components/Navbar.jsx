import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiSearch } from 'react-icons/fi';
import { MdExplore } from 'react-icons/md';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const navigate  = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Close search on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/tours?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery('');
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `font-body text-sm tracking-widest uppercase transition-colors duration-200 ${
      isActive ? 'text-gold-500' : 'text-white/80 hover:text-white'
    }`;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      scrolled || menuOpen ? 'bg-navy-900 shadow-2xl py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group flex-shrink-0" onClick={() => setMenuOpen(false)}>
            <MdExplore className="text-gold-500 text-3xl group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-display text-2xl font-semibold text-white tracking-wide">
              Trần Gia<span className="text-gold-500"> Travel</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 flex-1 justify-end">

            {/* Inline search bar (expands when open) */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1 max-w-sm animate-fade-in">
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search tours, destinations…"
                  className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body text-sm px-4 py-2 focus:outline-none focus:border-gold-500 transition-colors"
                />
                <button type="submit" className="text-gold-500 hover:text-gold-400 transition-colors p-1">
                  <FiSearch size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                  className="text-white/50 hover:text-white transition-colors p-1"
                >
                  <FiX size={18} />
                </button>
              </form>
            ) : (
              <>
                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                <NavLink to="/tours" className={navLinkClass}>Tours</NavLink>

                {/* Search icon */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-white/70 hover:text-gold-500 transition-colors duration-200"
                  aria-label="Search"
                >
                  <FiSearch size={18} />
                </button>

                {/* Auth */}
                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 transition-all duration-200"
                    >
                      <FiUser className="text-gold-500" size={14} />
                      <span className="font-body text-sm">{user.name.split(' ')[0]}</span>
                      {isAdmin && (
                        <span className="bg-gold-500 text-navy-900 text-[10px] px-1.5 py-0.5 font-bold ml-1 tracking-wider">
                          ADMIN
                        </span>
                      )}
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-navy-900 border border-white/10 shadow-2xl py-2 z-50 animate-fade-in">
                        {isAdmin && (
                          <>
                            <Link to="/admin" className="flex items-center gap-2 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/10 font-body text-sm transition-colors" onClick={() => setDropdownOpen(false)}>
                              <FiSettings size={13} /> Dashboard
                            </Link>
                            <Link to="/admin/tours" className="flex items-center gap-2 px-4 py-2.5 text-white/70 hover:text-white hover:bg-white/10 font-body text-sm transition-colors" onClick={() => setDropdownOpen(false)}>
                              <MdExplore size={13} /> Manage Tours
                            </Link>
                            <div className="border-t border-white/10 my-1" />
                          </>
                        )}
                        <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2.5 text-red-400 hover:text-red-300 hover:bg-white/10 font-body text-sm transition-colors">
                          <FiLogOut size={13} /> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link to="/login" className="font-body text-sm tracking-widest uppercase text-white/80 hover:text-white transition-colors">
                      Sign In
                    </Link>
                    <Link to="/register" className="bg-gold-500 text-navy-900 px-5 py-2 font-body text-sm font-semibold tracking-wide hover:bg-gold-400 transition-colors duration-200">
                      Get Started
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile: search + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }} className="text-white/70 hover:text-gold-500 transition-colors">
              {searchOpen ? <FiX size={22} /> : <FiSearch size={20} />}
            </button>
            <button className="text-white p-1" onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="md:hidden mt-3 flex gap-2 animate-fade-in">
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search tours, destinations…"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 font-body text-sm px-4 py-2.5 focus:outline-none focus:border-gold-500 transition-colors"
            />
            <button type="submit" className="bg-gold-500 text-navy-900 px-4 py-2.5 font-body text-sm font-semibold">
              Search
            </button>
          </form>
        )}

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 space-y-1 animate-fade-in">
            {[['/', 'Home'], ['/tours', 'Tours']].map(([to, label]) => (
              <Link key={to} to={to} className="block font-body text-sm uppercase tracking-widest text-white/80 hover:text-white hover:bg-white/5 px-2 py-2.5 transition-colors" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            {user ? (
              <>
                {isAdmin && (
                  <>
                    <Link to="/admin" className="block font-body text-sm uppercase tracking-widest text-gold-500 hover:bg-white/5 px-2 py-2.5 transition-colors" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <Link to="/admin/tours" className="block font-body text-sm uppercase tracking-widest text-gold-500 hover:bg-white/5 px-2 py-2.5 transition-colors" onClick={() => setMenuOpen(false)}>Manage Tours</Link>
                  </>
                )}
                <div className="border-t border-white/10 pt-2 mt-2">
                  <button onClick={handleLogout} className="block w-full text-left font-body text-sm uppercase tracking-widest text-red-400 hover:bg-white/5 px-2 py-2.5 transition-colors">
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-white/10 pt-3 mt-2 flex gap-3">
                <Link to="/login" className="flex-1 text-center border border-white/20 text-white/80 font-body text-sm py-2.5 hover:bg-white/10 transition-colors" onClick={() => setMenuOpen(false)}>Sign In</Link>
                <Link to="/register" className="flex-1 text-center bg-gold-500 text-navy-900 font-body text-sm font-semibold py-2.5 hover:bg-gold-400 transition-colors" onClick={() => setMenuOpen(false)}>Get Started</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
