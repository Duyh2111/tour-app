import { Link } from 'react-router-dom';
import { FiMapPin, FiClock, FiUsers, FiStar } from 'react-icons/fi';
import { MdTrendingUp } from 'react-icons/md';

const difficultyColors = {
  easy: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  hard: 'bg-red-100 text-red-700',
};

export default function TourCard({ tour }) {
  return (
    <Link to={`/tours/${tour._id}`} className="group block">
      <article className="bg-white overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
        {/* Image */}
        <div className="relative overflow-hidden h-60">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {/* Overlay badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="badge-navy text-xs">{tour.category}</span>
            {tour.featured && (
              <span className="badge-gold text-xs flex items-center gap-1">
                <MdTrendingUp size={12} /> Featured
              </span>
            )}
          </div>
          {/* Price */}
          <div className="absolute bottom-0 right-0 bg-navy-900 text-white px-4 py-2">
            <span className="font-body text-xs text-gold-500 uppercase tracking-widest block">From</span>
            <span className="font-display text-2xl font-semibold">${tour.price.toLocaleString()}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Rating */}
          {tour.rating > 0 && (
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex">
                {[1,2,3,4,5].map(star => (
                  <FiStar
                    key={star}
                    size={13}
                    className={star <= Math.round(tour.rating) ? 'star-filled fill-current' : 'star-empty'}
                  />
                ))}
              </div>
              <span className="font-body text-xs text-gray-500">
                {tour.rating.toFixed(1)} ({tour.ratingsCount} reviews)
              </span>
            </div>
          )}

          <h3 className="font-display text-xl font-semibold text-navy-900 mb-3 leading-snug group-hover:text-primary-600 transition-colors">
            {tour.title}
          </h3>

          <p className="font-body text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
            {tour.description}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-gray-500">
              <FiMapPin size={13} className="text-gold-500" />
              <span className="font-body text-xs">{tour.location}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <FiClock size={13} className="text-gold-500" />
              <span className="font-body text-xs">{tour.duration} days</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-500">
              <FiUsers size={13} className="text-gold-500" />
              <span className="font-body text-xs">Max {tour.maxGroupSize}</span>
            </div>
            <span className={`ml-auto text-xs font-semibold px-2 py-0.5 ${difficultyColors[tour.difficulty]}`}>
              {tour.difficulty}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
