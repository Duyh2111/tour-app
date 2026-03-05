import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdExplore } from 'react-icons/md';
import { FiFacebook, FiInstagram, FiYoutube, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import site from '../config/site';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer className="bg-navy-950 text-white">

      {/* ─ Newsletter ─ */}
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px w-8 bg-gold-500" />
                <span className="font-body text-gold-500 text-xs uppercase tracking-[0.3em]">Newsletter</span>
              </div>
              <h3 className="font-display text-3xl text-white font-light mb-2">Stay Inspired</h3>
              <p className="font-body text-white/45 text-sm leading-relaxed">
                Vietnam travel stories, hidden gems & exclusive offers — straight to your inbox.
              </p>
            </div>

            <div className="w-full max-w-md">
              {subscribed ? (
                <div className="flex items-center gap-3 bg-white/5 border border-gold-500/40 px-6 py-4">
                  <div className="w-8 h-8 bg-gold-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-navy-900 font-bold text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-body text-white text-sm font-semibold">You're subscribed!</p>
                    <p className="font-body text-white/50 text-xs">We'll send you the best of Vietnam soon.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex">
                  <div className="relative flex-1">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={15} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-white/8 border border-white/15 text-white placeholder:text-white/30 font-body text-sm pl-11 pr-4 py-3.5 focus:outline-none focus:border-gold-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gold-500 text-navy-900 px-7 py-3.5 font-body text-sm font-semibold hover:bg-gold-400 transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─ Main Grid ─ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-5">
              <MdExplore className="text-gold-500 text-3xl" />
              <span className="font-display text-2xl font-semibold text-white">
                {site.name.split(' ').slice(0, -1).join(' ')}
                <span className="text-gold-500"> {site.name.split(' ').at(-1)}</span>
              </span>
            </Link>
            <p className="font-body text-white/50 text-sm leading-relaxed mb-7">
              Your trusted local guide to the wonders of Vietnam. From misty mountain villages
              to glittering emerald bays — we craft journeys that stay with you forever.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: FiFacebook,  href: site.social.facebook  || '#' },
                { Icon: FiInstagram, href: site.social.instagram || '#' },
                { Icon: FiYoutube,   href: site.social.youtube   || '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 hover:border-gold-500 hover:text-gold-500 transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-5 flex items-center gap-3">
              <span>Explore</span>
              <div className="h-px flex-1 bg-white/10" />
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/',                       label: 'Home' },
                { to: '/tours',                  label: 'All Tours' },
                { to: '/tours?category=Beach',   label: 'Beach & Islands' },
                { to: '/tours?category=Mountain',label: 'Mountain Trekking' },
                { to: '/tours?category=Cultural',label: 'Cultural Heritage' },
                { to: '/tours?category=City',    label: 'City Experiences' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-white/50 hover:text-gold-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-gold-500 group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-5 flex items-center gap-3">
              <span>Destinations</span>
              <div className="h-px flex-1 bg-white/10" />
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/tours?search=ha+long', label: 'Ha Long Bay' },
                { to: '/tours?search=hoi+an',  label: 'Hội An' },
                { to: '/tours?search=sapa',     label: 'Sapa Highlands' },
                { to: '/tours?search=hue',      label: 'Imperial Hué' },
                { to: '/tours?search=hanoi',    label: 'Hanoi' },
                { to: '/tours?search=phu+quoc', label: 'Phú Quốc Island' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="font-body text-sm text-white/50 hover:text-gold-500 transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="h-px w-0 bg-gold-500 group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-5 flex items-center gap-3">
              <span>Contact Us</span>
              <div className="h-px flex-1 bg-white/10" />
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMail className="text-gold-500 flex-shrink-0 mt-0.5" size={14} />
                <a href={`mailto:${site.contact.email}`} className="font-body text-sm text-white/50 hover:text-gold-500 transition-colors">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FiPhone className="text-gold-500 flex-shrink-0 mt-0.5" size={14} />
                <span className="font-body text-sm text-white/50">{site.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-gold-500 flex-shrink-0 mt-0.5" size={14} />
                <span className="font-body text-sm text-white/50 leading-relaxed">
                  {site.contact.address}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ─ Bottom Bar ─ */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/30 tracking-wide">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="font-body text-xs text-white/30 hover:text-white/60 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
