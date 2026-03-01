import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import TourCard from '../components/TourCard';
import Spinner from '../components/Spinner';
import { FiArrowRight, FiAward, FiShield, FiHeadphones } from 'react-icons/fi';
import { MdExplore, MdBeachAccess, MdTerrain, MdLocationCity } from 'react-icons/md';
import { GiMountainCave } from 'react-icons/gi';

const categories = [
  { name: 'Beach',     label: 'Islands & Beaches',     icon: MdBeachAccess,    img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&h=300&fit=crop',  desc: 'Phu Quoc · Nha Trang · Da Nang' },
  { name: 'Mountain',  label: 'Mountains & Trekking',  icon: MdTerrain,        img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',  desc: 'Sapa · Ha Giang · Fansipan' },
  { name: 'Cultural',  label: 'Heritage & Culture',    icon: GiMountainCave,   img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=400&h=300&fit=crop',  desc: 'Hoi An · Hue · Hanoi Old Quarter' },
  { name: 'City',      label: 'City Experiences',      icon: MdLocationCity,   img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop',  desc: 'Hanoi · Ho Chi Minh City · Hue' },
];

const features = [
  { icon: FiAward, title: 'Local Expert Guides', desc: 'Born and raised in Vietnam, our guides share stories, secrets and culture that no guidebook can capture.' },
  { icon: FiShield, title: 'Safe & Trusted', desc: 'Every itinerary is carefully vetted. We partner only with licensed operators and insured accommodations.' },
  { icon: FiHeadphones, title: '24/7 Support', desc: 'From the moment you book to the moment you return home, our team is just one call away.' },
  { icon: MdExplore, title: 'Authentic Vietnam', desc: 'We go beyond tourist trails to connect you with real communities, flavours and landscapes.' },
];

const stats = [
  { value: '8K+',  label: 'Happy Travellers' },
  { value: '63',   label: 'Provinces of Vietnam' },
  { value: '98%',  label: 'Satisfaction Rate' },
  { value: '10+',  label: 'Years Experience' },
];

export default function HomePage() {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await API.get('/tours/featured');
        setFeaturedTours(data.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="page-enter">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-900/70 to-transparent" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <div className="h-px w-12 bg-gold-500" />
              <span className="font-body text-gold-500 text-sm font-medium uppercase tracking-[0.3em]">
                Authentic Vietnam Journeys
              </span>
            </div>

            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl font-light text-white leading-none mb-6 animate-slide-up">
              Discover
              <br />
              <em className="text-gold-400 not-italic">the Soul</em>
              <br />
              of Vietnam
            </h1>

            <p className="font-body text-lg text-white/70 leading-relaxed mb-10 max-w-lg animate-fade-in" style={{animationDelay: '0.2s'}}>
              From the emerald karsts of Ha Long Bay to the lantern-lit streets of Hoi An —
              let us show you the Vietnam that stays with you forever.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <Link to="/tours" className="inline-flex items-center gap-3 bg-gold-500 text-navy-900 px-8 py-4 font-body font-semibold text-sm tracking-wide hover:bg-gold-400 transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/25">
                Explore Vietnam
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/tours?featured=true" className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 font-body text-sm tracking-wide hover:bg-white/10 transition-all duration-300">
                Featured Tours
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-navy-900/80 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {stats.map((stat) => (
                <div key={stat.label} className="py-5 px-6 text-center">
                  <div className="font-display text-3xl font-semibold text-gold-500">{stat.value}</div>
                  <div className="font-body text-xs text-white/50 uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500" />
              <span className="font-body text-gold-600 text-xs uppercase tracking-[0.3em]">Browse By</span>
              <div className="h-px w-8 bg-gold-500" />
            </div>
            <h2 className="section-title">Explore <em>Vietnam</em></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/tours?category=${cat.name}`}
                className="group relative overflow-hidden aspect-[4/3]"
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy-900/55 group-hover:bg-navy-900/35 transition-colors duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
                  <cat.icon className="text-white text-4xl mb-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-display text-white text-xl font-semibold leading-tight">{cat.label}</span>
                  <span className="font-body text-white/60 text-xs mt-1 group-hover:text-gold-400 transition-colors">{cat.desc}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED TOURS ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-gold-500" />
                <span className="font-body text-gold-600 text-xs uppercase tracking-[0.3em]">Handpicked for You</span>
              </div>
              <h2 className="section-title">Featured <em>Vietnam Tours</em></h2>
            </div>
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 font-body text-sm text-navy-800 border-b-2 border-gold-500 pb-1 hover:text-gold-600 transition-colors group"
            >
              View All Tours
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <Spinner center />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-24 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, #e8b800 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold-500" />
              <span className="font-body text-gold-500 text-xs uppercase tracking-[0.3em]">Why Choose Us</span>
              <div className="h-px w-8 bg-gold-500" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white">
              Why Travel With <em className="text-gold-400">Trần Gia</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center group">
                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-5 group-hover:border-gold-500 group-hover:bg-gold-500/10 transition-all duration-300">
                  <feature.icon className="text-gold-500 text-2xl" />
                </div>
                <h3 className="font-display text-xl text-white font-semibold mb-3">{feature.title}</h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-gold-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-light text-navy-900 mb-4">
            Vietnam Is Waiting for You
          </h2>
          <p className="font-body text-navy-800/70 mb-8">
            Discover our full collection of Vietnam tours — from hidden highland villages
            to pristine island beaches. Your adventure starts here.
          </p>
          <Link
            to="/tours"
            className="inline-flex items-center gap-3 bg-navy-900 text-white px-8 py-4 font-body font-semibold text-sm tracking-wide hover:bg-navy-950 transition-all duration-300"
          >
            See All Vietnam Tours <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
}
