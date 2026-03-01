import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';
import Spinner from '../components/Spinner';
import { FiMapPin, FiClock, FiUsers, FiStar, FiArrowLeft, FiCheck, FiX } from 'react-icons/fi';
import { MdOutlineTrendingUp } from 'react-icons/md';

const difficultyColors = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
};

export default function TourDetailPage() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await API.get(`/tours/${id}`);
        setTour(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Tour not found');
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [id]);

  if (loading) return <div className="pt-20"><Spinner center /></div>;
  if (error) return (
    <div className="pt-24 text-center min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-5xl">😕</div>
      <h2 className="font-display text-3xl text-navy-900">{error}</h2>
      <Link to="/tours" className="btn-primary mt-4">Back to Tours</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-white page-enter">
      {/* Hero Image */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/30 to-transparent" />

        {/* Back button */}
        <div className="absolute top-24 left-6 md:left-12">
          <Link
            to="/tours"
            className="flex items-center gap-2 text-white/80 hover:text-white font-body text-sm bg-navy-900/50 backdrop-blur-sm px-4 py-2 transition-colors"
          >
            <FiArrowLeft /> Back to Tours
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="badge-navy">{tour.category}</span>
              {tour.featured && (
                <span className="badge-gold flex items-center gap-1">
                  <MdOutlineTrendingUp size={12} /> Featured
                </span>
              )}
              <span className={`badge ${difficultyColors[tour.difficulty]}`}>
                {tour.difficulty}
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-light text-white leading-tight mb-4">
              {tour.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <FiMapPin className="text-gold-500" />
                <span className="font-body text-sm">{tour.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-gold-500" />
                <span className="font-body text-sm">{tour.duration} days</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="text-gold-500" />
                <span className="font-body text-sm">Max {tour.maxGroupSize} people</span>
              </div>
              {tour.rating > 0 && (
                <div className="flex items-center gap-1">
                  <FiStar className="text-gold-500 fill-current" />
                  <span className="font-body text-sm font-semibold text-gold-400">{tour.rating.toFixed(1)}</span>
                  <span className="font-body text-sm text-white/60">({tour.ratingsCount} reviews)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <div>
              <h2 className="font-display text-3xl text-navy-900 font-semibold mb-4">About This Tour</h2>
              <p className="font-body text-gray-600 leading-relaxed text-base">{tour.description}</p>
            </div>

            {/* Highlights */}
            {tour.highlights?.length > 0 && (
              <div>
                <h3 className="font-display text-2xl text-navy-900 font-semibold mb-5">Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 p-4">
                      <div className="w-5 h-5 bg-gold-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-navy-900 text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="font-body text-sm text-gray-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Included / Not Included */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {tour.included?.length > 0 && (
                <div>
                  <h3 className="font-display text-2xl text-navy-900 font-semibold mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {tour.included.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FiCheck className="text-emerald-500 flex-shrink-0 mt-1" size={15} />
                        <span className="font-body text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tour.notIncluded?.length > 0 && (
                <div>
                  <h3 className="font-display text-2xl text-navy-900 font-semibold mb-4">Not Included</h3>
                  <ul className="space-y-2">
                    {tour.notIncluded.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <FiX className="text-red-400 flex-shrink-0 mt-1" size={15} />
                        <span className="font-body text-sm text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-200 shadow-xl">
              {/* Price */}
              <div className="bg-navy-900 p-6 text-center">
                <p className="font-body text-gold-500 text-xs uppercase tracking-widest mb-1">Tour Price</p>
                <p className="font-display text-5xl text-white font-light">
                  ${tour.price.toLocaleString()}
                </p>
                <p className="font-body text-white/50 text-sm mt-1">per person</p>
              </div>

              <div className="p-6 space-y-4">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Duration', value: `${tour.duration} days` },
                    { label: 'Group Size', value: `Max ${tour.maxGroupSize}` },
                    { label: 'Difficulty', value: tour.difficulty },
                    { label: 'Category', value: tour.category },
                  ].map(item => (
                    <div key={item.label} className="bg-gray-50 p-3 text-center">
                      <p className="font-body text-xs text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                      <p className="font-display text-base text-navy-900 font-semibold capitalize">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Contact to Book */}
                <div className="border-t pt-5">
                  <a
                    href="mailto:hello@trangia.travel"
                    className="block w-full text-center bg-gold-500 text-navy-900 py-4 font-body font-semibold text-sm tracking-wide hover:bg-gold-400 transition-all duration-300"
                  >
                    Enquire About This Tour
                  </a>
                  <p className="font-body text-xs text-gray-400 text-center mt-3">
                    We respond within 24 hours
                  </p>
                </div>

                {/* Trust signals */}
                <div className="border-t pt-4">
                  <p className="font-body text-xs text-gray-400 text-center">✓ Free cancellation · ✓ Best price guarantee · ✓ 24/7 support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
