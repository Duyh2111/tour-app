import { Link } from 'react-router-dom';
import { MdExplore } from 'react-icons/md';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <MdExplore className="text-gold-500 text-3xl" />
              <span className="font-display text-2xl font-semibold text-white">
                Trần Gia<span className="text-gold-500"> Travel</span>
              </span>
            </Link>
            <p className="font-body text-white/60 text-sm leading-relaxed max-w-sm">
              Your trusted local guide to the wonders of Vietnam. From misty mountain villages
              to glittering emerald bays — we craft journeys that stay with you forever.
            </p>
            <div className="flex gap-4 mt-6">
              {[FiFacebook, FiInstagram, FiTwitter, FiYoutube].map((Icon, i) => (
                <a key={i} href="#" className="text-white/40 hover:text-gold-500 transition-colors duration-200">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-5 border-b border-white/10 pb-3">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/tours', label: 'All Tours' },
                { to: '/tours?category=Beach', label: 'Beach Tours' },
                { to: '/tours?category=Adventure', label: 'Adventure' },
                { to: '/tours?category=Cultural', label: 'Cultural Tours' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="font-body text-sm text-white/60 hover:text-gold-500 transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-5 border-b border-white/10 pb-3">
              Contact
            </h4>
            <ul className="space-y-3 font-body text-sm text-white/60">
              <li>📧 hello@trangia.travel</li>
              <li>📞 +84 (0) 28 1234 5678</li>
              <li>📍 12 Nguyễn Huệ, Quận 1,<br />Hồ Chí Minh City, Vietnam</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40 tracking-wide">
            © 2026 Trần Gia Travel. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
              <a key={item} href="#" className="font-body text-xs text-white/40 hover:text-white/70 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
