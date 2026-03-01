import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center px-4 text-center">
      <div className="animate-float">
        <span className="font-display text-[160px] leading-none text-white/5 select-none font-bold">
          404
        </span>
      </div>
      <div className="-mt-8">
        <h1 className="font-display text-5xl text-white font-light mb-4">
          Page <em className="text-gold-400">Not Found</em>
        </h1>
        <p className="font-body text-white/50 mb-8 max-w-sm">
          Looks like this destination doesn't exist on our map. 
          Let's get you back on track.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 px-6 py-3 font-body font-semibold text-sm hover:bg-gold-400 transition-colors"
          >
            Go Home <FiArrowRight />
          </Link>
          <Link
            to="/tours"
            className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3 font-body text-sm hover:bg-white/10 transition-colors"
          >
            Browse Tours
          </Link>
        </div>
      </div>
    </div>
  );
}
