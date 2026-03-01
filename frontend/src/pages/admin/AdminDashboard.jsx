import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { FiPlus, FiEye, FiTrash2, FiEdit, FiUsers, FiGrid } from 'react-icons/fi';
import { MdExplore, MdTrendingUp } from 'react-icons/md';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ tours: 0, users: 0, featured: 0 });
  const [recentTours, setRecentTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toursRes, usersRes] = await Promise.all([
          API.get('/tours?limit=5&sort=-createdAt'),
          API.get('/users'),
        ]);
        setRecentTours(toursRes.data.tours);
        const featuredCount = toursRes.data.tours.filter(t => t.featured).length;
        setStats({
          tours: toursRes.data.total,
          users: usersRes.data.length,
          featured: featuredCount,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { icon: MdExplore, label: 'Total Tours', value: stats.tours, color: 'bg-blue-50 text-blue-600', link: '/admin/tours' },
    { icon: FiUsers, label: 'Total Users', value: stats.users, color: 'bg-green-50 text-green-600', link: '#' },
    { icon: MdTrendingUp, label: 'Featured Tours', value: stats.featured, color: 'bg-amber-50 text-amber-600', link: '/admin/tours' },
    { icon: FiGrid, label: 'Categories', value: 8, color: 'bg-purple-50 text-purple-600', link: '/tours' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
          <div>
            <p className="font-body text-gold-600 text-xs uppercase tracking-widest mb-1">Admin Panel</p>
            <h1 className="font-display text-4xl text-navy-900 font-light">
              Welcome back, <em>{user?.name}</em>
            </h1>
          </div>
          <Link
            to="/admin/tours/create"
            className="inline-flex items-center gap-2 bg-navy-900 text-white px-6 py-3 font-body text-sm font-semibold hover:bg-navy-950 transition-colors"
          >
            <FiPlus /> New Tour
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {statCards.map((card) => (
            <Link key={card.label} to={card.link} className="bg-white p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center mb-3`}>
                <card.icon size={20} />
              </div>
              <p className="font-display text-3xl font-semibold text-navy-900">
                {loading ? '—' : card.value}
              </p>
              <p className="font-body text-xs text-gray-500 uppercase tracking-wide mt-1">{card.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-navy-900 p-8 text-white relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />
            <div className="absolute -bottom-8 right-8 w-24 h-24 bg-gold-500/10 rounded-full" />
            <MdExplore className="text-gold-500 text-4xl mb-4" />
            <h3 className="font-display text-2xl font-light mb-2">Manage Tours</h3>
            <p className="font-body text-white/50 text-sm mb-6">Create, edit, and delete tour packages</p>
            <Link to="/admin/tours" className="inline-flex items-center gap-2 bg-gold-500 text-navy-900 px-5 py-2.5 font-body text-sm font-semibold hover:bg-gold-400 transition-colors">
              Go to Tours <FiEye size={14} />
            </Link>
          </div>

          <div className="bg-white border border-gray-200 p-8">
            <FiPlus className="text-navy-800 text-4xl mb-4 bg-gray-100 p-2 w-12 h-12 rounded-full" />
            <h3 className="font-display text-2xl text-navy-900 font-light mb-2">Add New Tour</h3>
            <p className="font-body text-gray-500 text-sm mb-6">Create a new tour package for customers</p>
            <Link to="/admin/tours/create" className="inline-flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 font-body text-sm font-semibold hover:bg-navy-950 transition-colors">
              Create Tour <FiPlus size={14} />
            </Link>
          </div>
        </div>

        {/* Recent Tours */}
        <div className="bg-white shadow-sm border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="font-display text-xl text-navy-900 font-semibold">Recent Tours</h2>
            <Link to="/admin/tours" className="font-body text-sm text-navy-800 hover:text-gold-600 transition-colors">
              View All →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  {['Tour', 'Location', 'Price', 'Duration', 'Status', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-3 text-left font-body text-xs uppercase tracking-widest text-gray-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentTours.map(tour => (
                  <tr key={tour._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={tour.image} alt={tour.title} className="w-10 h-10 object-cover" />
                        <div>
                          <p className="font-body text-sm font-medium text-navy-900">{tour.title}</p>
                          <p className="font-body text-xs text-gray-400">{tour.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body text-sm text-gray-600">{tour.location}</td>
                    <td className="px-6 py-4 font-body text-sm font-semibold text-navy-900">${tour.price.toLocaleString()}</td>
                    <td className="px-6 py-4 font-body text-sm text-gray-600">{tour.duration} days</td>
                    <td className="px-6 py-4">
                      {tour.featured ? (
                        <span className="badge-gold text-xs">Featured</span>
                      ) : (
                        <span className="badge bg-gray-100 text-gray-500 text-xs">Standard</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link to={`/tours/${tour._id}`} className="text-gray-400 hover:text-navy-800 transition-colors" title="View">
                          <FiEye size={16} />
                        </Link>
                        <Link to={`/admin/tours/edit/${tour._id}`} className="text-gray-400 hover:text-blue-600 transition-colors" title="Edit">
                          <FiEdit size={16} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
