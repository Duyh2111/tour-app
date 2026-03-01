import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../utils/api';
import TourCard from '../components/TourCard';
import Spinner from '../components/Spinner';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';

const categories = ['All', 'Beach', 'Adventure', 'Cultural', 'Luxury', 'Wildlife', 'City', 'Mountain', 'Other'];
const difficulties = ['All', 'easy', 'medium', 'hard'];
const sortOptions = [
  { value: '-createdAt', label: 'Newest First' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: '-rating', label: 'Highest Rated' },
  { value: 'duration', label: 'Shortest Duration' },
];

export default function ToursPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    difficulty: searchParams.get('difficulty') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || '-createdAt',
    page: parseInt(searchParams.get('page')) || 1,
  });

  const fetchTours = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.category && filters.category !== 'All') params.category = filters.category;
      if (filters.difficulty && filters.difficulty !== 'All') params.difficulty = filters.difficulty;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      params.sort = filters.sort;
      params.page = filters.page;
      params.limit = 9;

      const { data } = await API.get('/tours', { params });
      setTours(data.tours);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', difficulty: '', minPrice: '', maxPrice: '', sort: '-createdAt', page: 1 });
  };

  const activeFiltersCount = [filters.category, filters.difficulty, filters.minPrice, filters.maxPrice]
    .filter(f => f && f !== 'All').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-navy-900 pt-36 pb-16 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-8 bg-gold-500" />
          <span className="font-body text-gold-500 text-xs uppercase tracking-[0.3em]">Explore Vietnam</span>
          <div className="h-px w-8 bg-gold-500" />
        </div>
        <h1 className="font-display text-5xl text-white font-light">
          All <em className="text-gold-400">Vietnam Tours</em>
        </h1>
        <p className="font-body text-white/50 mt-3">{total} extraordinary experiences await</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search + Filter Bar */}
        <div className="bg-white shadow-md p-4 mb-8 flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tours, destinations..."
              value={filters.search}
              onChange={e => updateFilter('search', e.target.value)}
              className="input-field pl-10 py-2.5"
            />
          </div>

          {/* Sort */}
          <select
            value={filters.sort}
            onChange={e => updateFilter('sort', e.target.value)}
            className="input-field w-auto cursor-pointer py-2.5"
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 font-body text-sm border-2 transition-all ${
              showFilters ? 'bg-navy-800 text-white border-navy-800' : 'border-navy-800 text-navy-800'
            }`}
          >
            <FiFilter /> Filters
            {activeFiltersCount > 0 && (
              <span className="bg-gold-500 text-navy-900 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button onClick={clearFilters} className="flex items-center gap-1 font-body text-sm text-gray-500 hover:text-red-500 transition-colors">
              <FiX size={14} /> Clear
            </button>
          )}
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-white shadow-md p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-6 animate-fade-in">
            {/* Category */}
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-3">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => updateFilter('category', cat === 'All' ? '' : cat)}
                    className={`px-3 py-1.5 text-xs font-body font-medium transition-all ${
                      (filters.category === cat) || (cat === 'All' && !filters.category)
                        ? 'bg-navy-800 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-3">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    onClick={() => updateFilter('difficulty', diff === 'All' ? '' : diff)}
                    className={`px-3 py-1.5 text-xs font-body font-medium capitalize transition-all ${
                      (filters.difficulty === diff) || (diff === 'All' && !filters.difficulty)
                        ? 'bg-navy-800 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="md:col-span-2">
              <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-3">Price Range (USD)</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={e => updateFilter('minPrice', e.target.value)}
                  className="input-field w-32 py-2"
                />
                <span className="text-gray-400">—</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={e => updateFilter('maxPrice', e.target.value)}
                  className="input-field w-32 py-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tours Grid */}
        {loading ? (
          <Spinner center />
        ) : tours.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="font-display text-2xl text-navy-900 mb-2">No tours found</h3>
            <p className="font-body text-gray-500 mb-6">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="btn-primary">Clear All Filters</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map(tour => (
                <TourCard key={tour._id} tour={tour} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                <button
                  onClick={() => setFilters(p => ({ ...p, page: p.page - 1 }))}
                  disabled={filters.page <= 1}
                  className="px-4 py-2 border border-navy-800 text-navy-800 font-body text-sm disabled:opacity-30 hover:bg-navy-800 hover:text-white transition-all"
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setFilters(prev => ({ ...prev, page: p }))}
                    className={`w-10 h-10 font-body text-sm transition-all ${
                      p === filters.page
                        ? 'bg-navy-800 text-white'
                        : 'border border-gray-300 text-gray-600 hover:border-navy-800 hover:text-navy-800'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => setFilters(p => ({ ...p, page: p.page + 1 }))}
                  disabled={filters.page >= totalPages}
                  className="px-4 py-2 border border-navy-800 text-navy-800 font-body text-sm disabled:opacity-30 hover:bg-navy-800 hover:text-white transition-all"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
