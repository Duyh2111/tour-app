import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import { FiPlus, FiEdit, FiTrash2, FiEye, FiSearch, FiAlertTriangle } from 'react-icons/fi';

export default function AdminTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleteModal, setDeleteModal] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTours = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10, sort: '-createdAt' };
      if (search) params.search = search;
      const { data } = await API.get('/tours', { params });
      setTours(data.tours);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (error) {
      toast.error('Failed to load tours');
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timer = setTimeout(fetchTours, 300);
    return () => clearTimeout(timer);
  }, [fetchTours]);

  const handleDelete = async () => {
    if (!deleteModal) return;
    setDeleting(true);
    try {
      await API.delete(`/tours/${deleteModal._id}`);
      toast.success(`"${deleteModal.title}" deleted`);
      setDeleteModal(null);
      fetchTours();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <p className="font-body text-gold-600 text-xs uppercase tracking-widest mb-1">Admin → Tours</p>
            <h1 className="font-display text-4xl text-navy-900 font-light">Manage <em>Tours</em></h1>
            <p className="font-body text-gray-500 text-sm mt-1">{total} total tours</p>
          </div>
          <Link
            to="/admin/tours/create"
            className="inline-flex items-center gap-2 bg-navy-900 text-white px-6 py-3 font-body text-sm font-semibold hover:bg-navy-950 transition-colors"
          >
            <FiPlus /> Create Tour
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white shadow-sm border border-gray-100 p-4 mb-6">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tours..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="input-field pl-10 py-2.5"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-20"><Spinner center /></div>
            ) : tours.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🗺️</div>
                <p className="font-display text-2xl text-navy-900">No tours found</p>
                <Link to="/admin/tours/create" className="inline-block mt-4 btn-primary">Create First Tour</Link>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['#', 'Tour', 'Location', 'Price', 'Duration', 'Category', 'Featured', 'Actions'].map(h => (
                      <th key={h} className="px-5 py-3.5 text-left font-body text-xs uppercase tracking-widest text-gray-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {tours.map((tour, idx) => (
                    <tr key={tour._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 font-body text-xs text-gray-400">
                        {(page - 1) * 10 + idx + 1}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3 min-w-0">
                          <img src={tour.image} alt={tour.title} className="w-12 h-9 object-cover flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="font-body text-sm font-medium text-navy-900 truncate max-w-[200px]">
                              {tour.title}
                            </p>
                            <p className="font-body text-xs text-gray-400 capitalize">{tour.difficulty}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 font-body text-sm text-gray-600 max-w-[130px] truncate">{tour.location}</td>
                      <td className="px-5 py-4 font-body text-sm font-semibold text-navy-900">${tour.price.toLocaleString()}</td>
                      <td className="px-5 py-4 font-body text-sm text-gray-600">{tour.duration}d</td>
                      <td className="px-5 py-4">
                        <span className="badge bg-gray-100 text-gray-600 text-xs">{tour.category}</span>
                      </td>
                      <td className="px-5 py-4">
                        {tour.featured ? (
                          <span className="badge-gold text-xs">Yes</span>
                        ) : (
                          <span className="font-body text-xs text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/tours/${tour._id}`}
                            className="text-gray-400 hover:text-navy-800 transition-colors"
                            title="View"
                          >
                            <FiEye size={16} />
                          </Link>
                          <Link
                            to={`/admin/tours/edit/${tour._id}`}
                            className="text-gray-400 hover:text-blue-600 transition-colors"
                            title="Edit"
                          >
                            <FiEdit size={16} />
                          </Link>
                          <button
                            onClick={() => setDeleteModal(tour)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="border-t border-gray-100 px-5 py-4 flex items-center justify-between">
              <p className="font-body text-xs text-gray-500">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => p - 1)}
                  disabled={page <= 1}
                  className="px-3 py-1.5 border border-gray-200 font-body text-xs disabled:opacity-40 hover:border-navy-800 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= totalPages}
                  className="px-3 py-1.5 border border-gray-200 font-body text-xs disabled:opacity-40 hover:border-navy-800 transition-colors"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white max-w-md w-full shadow-2xl p-8 animate-slide-up">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 bg-red-100 flex items-center justify-center">
                <FiAlertTriangle className="text-red-500 text-xl" />
              </div>
              <div>
                <h3 className="font-display text-xl text-navy-900 font-semibold">Delete Tour</h3>
                <p className="font-body text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>

            <p className="font-body text-sm text-gray-600 bg-gray-50 p-4 mb-6">
              Are you sure you want to delete{' '}
              <strong className="text-navy-900">"{deleteModal.title}"</strong>?
              This will permanently remove the tour and its image.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 border border-gray-200 py-3 font-body text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-600 text-white py-3 font-body text-sm font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {deleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
