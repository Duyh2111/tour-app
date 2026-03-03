import { Link } from 'react-router-dom';
import { FiClock, FiUsers, FiStar } from 'react-icons/fi';
import { MdTrendingUp, MdLocationOn } from 'react-icons/md';

const difficultyColors = {
  easy:   'bg-emerald-50 text-emerald-700 border border-emerald-200',
  medium: 'bg-amber-50  text-amber-700  border border-amber-200',
  hard:   'bg-red-50    text-red-700    border border-red-200',
};

export default function TourCard({ tour }) {
  return (
    <Link to={`/tours/${tour._id}`} className="group block">
      <article className="bg-white border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5">

        {/* Image */}
        <div className="relative overflow-hidden" style={{ paddingBottom: '62%' }}>
          <img
            src={tour.image}
            alt={tour.title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="badge-navy text-[10px] py-0.5">{tour.category}</span>
            {tour.featured && (
              <span className="badge-gold text-[10px] py-0.5 flex items-center gap-0.5">
                <MdTrendingUp size={10} /> Featured
              </span>
            )}
          </div>

          {/* Bottom: location + price */}
          <div className="absolute bottom-0 left-0 right-0 p-3.5 flex items-end justify-between">
            <div className="flex items-center gap-1 text-white/90">
              <MdLocationOn size={13} className="text-gold-400 flex-shrink-0" />
              <span className="font-body text-xs leading-tight">{tour.location}</span>
            </div>
            <div className="bg-gold-500 text-navy-900 px-3 py-1">
              <span className="font-display text-lg font-semibold">${tour.price.toLocaleString()}</span>
              <span className="font-body text-[10px] opacity-60 ml-0.5">/pp</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Rating */}
          {tour.rating > 0 && (
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <FiStar
                    key={s} size={11}
                    className={s <= Math.round(tour.rating) ? 'star-filled fill-current' : 'star-empty'}
                  />
                ))}
              </div>
              <span className="font-body text-xs text-gray-400">
                {tour.rating.toFixed(1)} ({tour.ratingsCount} reviews)
              </span>
            </div>
          )}

          <h3 className="font-display text-xl font-semibold text-navy-900 mb-2 leading-snug group-hover:text-gold-600 transition-colors duration-200">
            {tour.title}
          </h3>

          <p className="font-body text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
            {tour.description}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-3 pt-3.5 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-gray-500">
              <FiClock size={12} className="text-gold-500" />
              <span className="font-body text-xs">{tour.duration} days</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <FiUsers size={12} className="text-gold-500" />
              <span className="font-body text-xs">Max {tour.maxGroupSize}</span>
            </div>
            <span className={`ml-auto text-[11px] font-body font-semibold px-2.5 py-0.5 capitalize ${difficultyColors[tour.difficulty]}`}>
              {tour.difficulty}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
