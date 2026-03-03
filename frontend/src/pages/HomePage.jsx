import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import TourCard from '../components/TourCard';
import Spinner from '../components/Spinner';
import { FiArrowRight, FiAward, FiShield, FiHeadphones, FiChevronDown } from 'react-icons/fi';
import { MdExplore, MdBeachAccess, MdTerrain, MdLocationCity } from 'react-icons/md';
import { GiMountainCave } from 'react-icons/gi';

const categories = [
  { name: 'Beach',    label: 'Islands & Beaches',    icon: MdBeachAccess, img: 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=600&h=800&fit=crop',  desc: 'Phu Quoc · Nha Trang · Da Nang' },
  { name: 'Mountain', label: 'Mountains & Trekking', icon: MdTerrain,     img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop',  desc: 'Sapa · Ha Giang · Fansipan' },
  { name: 'Cultural', label: 'Heritage & Culture',   icon: GiMountainCave,img: 'https://images.unsplash.com/photo-1555921015-5532091f6026?w=600&h=800&fit=crop',  desc: 'Hoi An · Hue · Hanoi Old Quarter' },
  { name: 'City',     label: 'City Experiences',     icon: MdLocationCity,img: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600&h=800&fit=crop',  desc: 'Hanoi · Ho Chi Minh City · Hue' },
];

const features = [
  { icon: FiAward,       title: 'Local Expert Guides',  desc: 'Born and raised in Vietnam, our guides share stories, secrets and culture that no guidebook can capture.' },
  { icon: FiShield,      title: 'Safe & Trusted',       desc: 'Every itinerary is carefully vetted. We partner only with licensed operators and insured accommodations.' },
  { icon: FiHeadphones,  title: '24/7 Support',         desc: 'From the moment you book to the moment you return home, our team is just one call away.' },
  { icon: MdExplore,     title: 'Authentic Vietnam',    desc: 'We go beyond tourist trails to connect you with real communities, flavours and landscapes.' },
];

const stats = [
  { value: '8K+', label: 'Happy Travellers' },
  { value: '63',  label: 'Provinces of Vietnam' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '10+', label: 'Years of Experience' },
];

const destinations = [
  {
    number: '01',
    name:   'Ha Long Bay',
    native: 'Vịnh Hạ Long',
    badge:  'Cruise & Adventure',
    tagline:'Where limestone meets legend',
    desc:   'Sail through 1,969 emerald islands rising from jade-green waters, explore hidden grottoes lit by stalactites, and watch the sun burn gold over one of the world\'s most dramatic seascapes.',
    img:    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1200&h=900&fit=crop',
    link:   '/tours?search=ha+long',
    dark:   false,
  },
  {
    number: '02',
    name:   'Hội An Ancient Town',
    native: 'Phố Cổ Hội An',
    badge:  'Cultural Heritage',
    tagline:'A city frozen in golden time',
    desc:   'Wander lantern-lit alleyways, taste white rose dumplings from a street cart, and discover 400 years of trading history in Vietnam\'s finest UNESCO-listed riverside town.',
    img:    'https://images.unsplash.com/photo-1555921015-5532091f6026?w=1200&h=900&fit=crop',
    link:   '/tours?search=hoi+an',
    dark:   true,
  },
  {
    number: '03',
    name:   'Sapa Highlands',
    native: 'Sa Pa',
    badge:  'Mountain Trekking',
    tagline:'Trek through living terraced art',
    desc:   'Walk rice terraces carved by Hmong and Dao hands over centuries, spend nights with local families in bamboo stilted houses, and wake to misty mountain panoramas that beggar belief.',
    img:    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop',
    link:   '/tours?search=sapa',
    dark:   false,
  },
];

export default function HomePage() {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/tours/featured')
      .then(({ data }) => setFeaturedTours(data.slice(0, 3)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-enter">

      {/* ═══════════════════════════════════════════ HERO ════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1920&h=1080&fit=crop')" }}
        />
        {/* Gradient: left-heavy dark, right fades */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-900/75 to-navy-900/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-900/20" />

        {/* Ambient orbs */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-3xl pointer-events-none animate-float" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-36 w-full">
          <div className="max-w-2xl lg:max-w-3xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-8 animate-fade-in">
              <div className="h-px w-14 bg-gold-500" />
              <span className="font-body text-gold-500 text-xs font-medium uppercase tracking-[0.35em]">
                Authentic Vietnam Journeys
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-light text-white leading-[0.92] mb-8 animate-slide-up"
              style={{ fontSize: 'clamp(3.5rem, 8vw, 7rem)' }}
            >
              Discover<br />
              <em className="text-gold-400 not-italic">the Soul</em><br />
              of Vietnam
            </h1>

            <p
              className="font-body text-white/65 leading-relaxed mb-12 max-w-xl animate-fade-in text-base lg:text-lg"
              style={{ animationDelay: '0.2s' }}
            >
              From the emerald karsts of Ha Long Bay to the lantern-lit streets of Hoi An —
              let us show you the Vietnam that stays with you forever.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/tours"
                className="group inline-flex items-center gap-3 bg-gold-500 text-navy-900 px-9 py-4 font-body font-semibold text-sm tracking-wide hover:bg-gold-400 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/30"
              >
                Explore Vietnam
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={15} />
              </Link>
              <Link
                to="/tours?featured=true"
                className="inline-flex items-center gap-3 border border-white/25 text-white px-9 py-4 font-body text-sm tracking-wide hover:bg-white/8 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
              >
                Featured Tours
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 animate-bounce-slow pointer-events-none">
          <span className="font-body text-white/30 text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <FiChevronDown className="text-white/30" size={16} />
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-navy-950/85 backdrop-blur-md border-t border-white/8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/8">
              {stats.map((stat) => (
                <div key={stat.label} className="py-5 px-6 text-center">
                  <div className="font-display text-3xl font-semibold text-gold-500 leading-none mb-1">
                    {stat.value}
                  </div>
                  <div className="font-body text-[10px] text-white/40 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════ CATEGORIES ════ */}
      <section className="py-28 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-10 bg-gold-500" />
              <span className="section-eyebrow">Browse By Type</span>
              <div className="h-px w-10 bg-gold-500" />
            </div>
            <h2 className="section-title">
              Explore <em className="text-gold-600 not-italic font-light italic">Vietnam</em>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/tours?category=${cat.name}`}
                className="group relative overflow-hidden block"
              >
                <div className="relative" style={{ paddingBottom: '130%' }}>
                  <img
                    src={cat.img}
                    alt={cat.label}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-900/30 to-transparent" />

                  {/* Icon top-right */}
                  <div className="absolute top-4 right-4 w-9 h-9 bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all duration-300">
                    <cat.icon className="text-white text-base" />
                  </div>

                  {/* Text bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-display text-lg text-white font-semibold leading-snug mb-1">
                      {cat.label}
                    </h3>
                    <p className="font-body text-xs text-white/50 group-hover:text-gold-400 transition-colors duration-300">
                      {cat.desc}
                    </p>
                  </div>

                  {/* Bottom gold accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ FEATURED TOURS ════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-10 bg-gold-500" />
                <span className="section-eyebrow">Handpicked for You</span>
              </div>
              <h2 className="section-title">
                Featured <em className="text-gold-600 not-italic font-light italic">Vietnam Tours</em>
              </h2>
            </div>
            <Link
              to="/tours"
              className="group inline-flex items-center gap-2 font-body text-sm text-navy-800 border-b border-gold-500 pb-0.5 hover:text-gold-600 hover:border-gold-400 transition-colors"
            >
              View All Tours
              <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Spinner center /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {featuredTours.map((tour) => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════ DESTINATION SPOTLIGHTS ════ */}
      <section>
        <div className="text-center py-20 bg-cream-100">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-10 bg-gold-500" />
            <span className="section-eyebrow">Iconic Destinations</span>
            <div className="h-px w-10 bg-gold-500" />
          </div>
          <h2 className="section-title">
            Places That <em className="text-gold-600 not-italic font-light italic">Define Vietnam</em>
          </h2>
        </div>

        {destinations.map((dest, i) => (
          <div
            key={dest.name}
            className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
          >
            {/* Image */}
            <div className="relative w-full lg:w-3/5 overflow-hidden" style={{ minHeight: '55vh' }}>
              <img
                src={dest.img}
                alt={dest.name}
                loading="lazy"
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className={`absolute inset-0 bg-gradient-to-${i % 2 === 0 ? 'r' : 'l'} from-transparent to-navy-950/30`} />
            </div>

            {/* Text */}
            <div className={`flex-1 flex items-center px-8 sm:px-14 py-16 lg:py-20 ${dest.dark ? 'bg-navy-900' : 'bg-cream-100'}`}>
              <div className="max-w-lg">
                {/* Large background number */}
                <span className={`font-display text-[7rem] leading-none font-bold block mb-2 select-none -ml-1 ${dest.dark ? 'text-white/5' : 'text-navy-900/5'}`}>
                  {dest.number}
                </span>

                <span className={`badge mb-4 ${dest.dark ? 'badge-gold' : 'badge-navy'}`}>
                  {dest.badge}
                </span>

                <h3 className={`font-display text-4xl md:text-5xl font-light leading-tight mb-1 ${dest.dark ? 'text-white' : 'text-navy-900'}`}>
                  {dest.name}
                </h3>
                <p className={`font-display text-lg italic mb-5 ${dest.dark ? 'text-gold-400' : 'text-gold-600'}`}>
                  {dest.native}
                </p>

                <div className={`h-px w-12 mb-6 ${dest.dark ? 'bg-gold-500' : 'bg-gold-500'}`} />

                <p className={`font-body leading-relaxed text-base mb-3 ${dest.dark ? 'text-white/60' : 'text-gray-500'}`}>
                  <em className={`font-body not-italic font-semibold block mb-2 ${dest.dark ? 'text-white/90' : 'text-navy-800'}`}>
                    {dest.tagline}
                  </em>
                  {dest.desc}
                </p>

                <Link
                  to={dest.link}
                  className={`group inline-flex items-center gap-2 font-body text-sm font-semibold mt-6 pb-0.5 border-b transition-all duration-200 ${
                    dest.dark
                      ? 'text-gold-400 border-gold-500/40 hover:text-gold-300 hover:border-gold-400'
                      : 'text-navy-800 border-navy-800/30 hover:text-gold-600 hover:border-gold-500'
                  }`}
                >
                  Explore {dest.name.split(' ')[0]} tours
                  <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ═══════════════════════════════ WHY CHOOSE US ════ */}
      <section className="py-28 bg-navy-900 relative overflow-hidden">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle, #e8b800 1px, transparent 1px)', backgroundSize: '36px 36px' }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-px w-10 bg-gold-500" />
              <span className="font-body text-gold-500 text-xs uppercase tracking-[0.3em]">Why Choose Us</span>
              <div className="h-px w-10 bg-gold-500" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light text-white">
              Travel With <em className="text-gold-400 not-italic">Trần Gia</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-8 border border-white/10 hover:border-gold-500/40 transition-all duration-400 overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/5 transition-all duration-500 pointer-events-none" />

                <div className="relative">
                  <div className="w-12 h-12 border border-white/15 group-hover:border-gold-500/60 flex items-center justify-center mb-6 transition-all duration-300">
                    <feature.icon className="text-gold-500 text-xl" />
                  </div>

                  <h3 className="font-display text-xl text-white font-semibold mb-3 leading-snug">
                    {feature.title}
                  </h3>
                  <div className="h-px w-8 bg-gold-500/40 mb-4 group-hover:w-14 group-hover:bg-gold-500 transition-all duration-300" />
                  <p className="font-body text-sm text-white/50 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════ CTA ════ */}
      <section className="relative py-36 overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=1920&h=700&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-navy-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <div className="h-px w-16 bg-gold-500 mx-auto mb-10" />
          <h2 className="font-display text-5xl md:text-6xl font-light text-white leading-tight mb-6">
            Vietnam Is Waiting<br />
            <em className="text-gold-400 not-italic">for You</em>
          </h2>
          <p className="font-body text-white/55 mb-12 text-base leading-relaxed max-w-lg mx-auto">
            Discover our full collection of Vietnam tours — from hidden highland villages
            to pristine island beaches. Your adventure starts here.
          </p>
          <Link
            to="/tours"
            className="group inline-flex items-center gap-3 bg-gold-500 text-navy-900 px-10 py-5 font-body font-semibold text-sm tracking-wide hover:bg-gold-400 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/30"
          >
            See All Vietnam Tours
            <FiArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>

    </div>
  );
}
