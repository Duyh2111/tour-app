import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../utils/api';
import Spinner from '../components/Spinner';
import EnquiryModal from '../components/EnquiryModal';
import site from '../config/site';
import { FiMapPin, FiClock, FiUsers, FiStar, FiArrowLeft, FiCheck, FiX, FiMail, FiShield, FiRefreshCw } from 'react-icons/fi';
import { MdOutlineTrendingUp } from 'react-icons/md';

const difficultyColors = {
  easy:   'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100  text-amber-700',
  hard:   'bg-red-100    text-red-700',
};

export default function TourDetailPage() {
  const { id }      = useParams();
  const [tour, setTour]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState('');
  const [enquiryOpen, setEnquiryOpen] = useState(false);

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
  if (error)   return (
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
        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/30 to-transparent" />

        {/* Back */}
        <div className="absolute top-24 left-6 md:left-12">
          <Link to="/tours" className="flex items-center gap-2 text-white/80 hover:text-white font-body text-sm bg-navy-900/50 backdrop-blur-sm px-4 py-2 transition-colors hover:bg-navy-900/80">
            <FiArrowLeft size={14} /> Back to Tours
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
              <span className={`badge ${difficultyColors[tour.difficulty]}`}>{tour.difficulty}</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-light text-white leading-tight mb-4">
              {tour.title}
            </h1>
            <div className="flex flex-wrap gap-5 text-white/80">
              <div className="flex items-center gap-2">
                <FiMapPin className="text-gold-500" size={14} />
                <span className="font-body text-sm">{tour.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-gold-500" size={14} />
                <span className="font-body text-sm">{tour.duration} days</span>
              </div>
              <div className="flex items-center gap-2">
                <FiUsers className="text-gold-500" size={14} />
                <span className="font-body text-sm">Max {tour.maxGroupSize} people</span>
              </div>
              {tour.rating > 0 && (
                <div className="flex items-center gap-1.5">
                  <FiStar className="text-gold-500 fill-current" size={14} />
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

          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-6 bg-gold-500" />
                <span className="font-body text-gold-600 text-xs uppercase tracking-widest">About This Tour</span>
              </div>
              <h2 className="font-display text-3xl text-navy-900 font-semibold mb-4">{tour.title}</h2>
              <p className="font-body text-gray-600 leading-relaxed text-base">{tour.description}</p>
            </div>

            {/* Highlights */}
            {tour.highlights?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-6 bg-gold-500" />
                  <span className="font-body text-gold-600 text-xs uppercase tracking-widest">Tour Highlights</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tour.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 bg-gray-50 border border-gray-100 p-4 hover:border-gold-300 transition-colors">
                      <div className="w-6 h-6 bg-gold-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-navy-900 text-xs font-bold">{i + 1}</span>
                      </div>
                      <span className="font-body text-sm text-gray-700 leading-relaxed">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Included / Not Included */}
            {(tour.included?.length > 0 || tour.notIncluded?.length > 0) && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-6 bg-gold-500" />
                  <span className="font-body text-gold-600 text-xs uppercase tracking-widest">What's Included</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {tour.included?.length > 0 && (
                    <div>
                      <h4 className="font-body text-xs uppercase tracking-widest text-emerald-600 mb-3 flex items-center gap-2">
                        <FiCheck size={13} /> Included
                      </h4>
                      <ul className="space-y-2.5">
                        {tour.included.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <FiCheck className="text-emerald-500 flex-shrink-0 mt-0.5" size={14} />
                            <span className="font-body text-sm text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {tour.notIncluded?.length > 0 && (
                    <div>
                      <h4 className="font-body text-xs uppercase tracking-widest text-red-500 mb-3 flex items-center gap-2">
                        <FiX size={13} /> Not Included
                      </h4>
                      <ul className="space-y-2.5">
                        {tour.notIncluded.map((item, i) => (
                          <li key={i} className="flex items-start gap-2.5">
                            <FiX className="text-red-400 flex-shrink-0 mt-0.5" size={14} />
                            <span className="font-body text-sm text-gray-600">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Booking Card */}
              <div className="bg-white border border-gray-200 shadow-xl overflow-hidden">
                {/* Price header */}
                <div className="bg-navy-900 px-6 py-8 text-center relative">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-500" />
                  <p className="font-body text-gold-500 text-xs uppercase tracking-[0.25em] mb-2">Tour Price</p>
                  <p className="font-display text-5xl text-white font-light">
                    ${tour.price.toLocaleString()}
                  </p>
                  <p className="font-body text-white/40 text-sm mt-1">per person</p>
                </div>

                <div className="p-6 space-y-5">
                  {/* Quick stats grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: 'Duration',    value: `${tour.duration} days` },
                      { label: 'Group Size',  value: `Max ${tour.maxGroupSize}` },
                      { label: 'Difficulty',  value: tour.difficulty },
                      { label: 'Category',    value: tour.category },
                    ].map(item => (
                      <div key={item.label} className="bg-gray-50 border border-gray-100 p-3 text-center">
                        <p className="font-body text-[10px] text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                        <p className="font-body text-sm text-navy-900 font-semibold capitalize">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => setEnquiryOpen(true)}
                    className="w-full bg-gold-500 text-navy-900 py-4 font-body font-semibold text-sm tracking-wide hover:bg-gold-400 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <FiMail size={15} className="group-hover:scale-110 transition-transform" />
                    Enquire About This Tour
                  </button>

                  {/* Trust signals */}
                  <div className="border-t border-gray-100 pt-4 space-y-2.5">
                    {[
                      { icon: FiRefreshCw, text: 'Free cancellation available' },
                      { icon: FiShield,    text: 'Best price guarantee' },
                      { icon: FiMail,      text: 'Reply within 24 hours' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2.5 text-gray-500">
                        <Icon size={13} className="text-gold-500 flex-shrink-0" />
                        <span className="font-body text-xs">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Need help box */}
              <div className="mt-4 bg-navy-900 px-6 py-5 text-center">
                <p className="font-body text-white/60 text-xs mb-1">Need help choosing?</p>
                <p className="font-display text-white text-lg font-light">Talk to our Vietnam experts</p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="inline-block mt-3 font-body text-xs text-gold-400 hover:text-gold-300 transition-colors tracking-wide"
                >
                  {site.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Modal */}
      {enquiryOpen && (
        <EnquiryModal tour={tour} onClose={() => setEnquiryOpen(false)} />
      )}
    </div>
  );
}
