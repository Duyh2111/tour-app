import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import API from '../../utils/api';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import { FiUpload, FiX, FiPlus, FiArrowLeft } from 'react-icons/fi';

const INITIAL_FORM = {
  title: '',
  description: '',
  price: '',
  duration: '',
  maxGroupSize: '',
  difficulty: 'easy',
  location: '',
  category: 'Beach',
  featured: false,
  highlights: [''],
  included: [''],
  notIncluded: [''],
};

export default function TourForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    const fetchTour = async () => {
      try {
        const { data } = await API.get(`/tours/${id}`);
        setForm({
          title: data.title,
          description: data.description,
          price: data.price,
          duration: data.duration,
          maxGroupSize: data.maxGroupSize,
          difficulty: data.difficulty,
          location: data.location,
          category: data.category,
          featured: data.featured,
          highlights: data.highlights?.length ? data.highlights : [''],
          included: data.included?.length ? data.included : [''],
          notIncluded: data.notIncluded?.length ? data.notIncluded : [''],
        });
        setImagePreview(data.image);
      } catch (error) {
        toast.error('Failed to load tour');
        navigate('/admin/tours');
      } finally {
        setFetchLoading(false);
      }
    };
    fetchTour();
  }, [id, isEdit, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const updateListItem = (field, index, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addListItem = (field) => {
    setForm({ ...form, [field]: [...form[field], ''] });
  };

  const removeListItem = (field, index) => {
    const updated = form[field].filter((_, i) => i !== index);
    setForm({ ...form, [field]: updated.length ? updated : [''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      Object.keys(form).forEach(key => {
        if (['highlights', 'included', 'notIncluded'].includes(key)) {
          const filtered = form[key].filter(item => item.trim());
          formData.append(key, JSON.stringify(filtered));
        } else {
          formData.append(key, form[key]);
        }
      });

      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (isEdit) {
        await API.put(`/tours/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Tour updated successfully!');
      } else {
        await API.post('/tours', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Tour created successfully!');
      }

      navigate('/admin/tours');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <div className="pt-20"><Spinner center /></div>;

  const ListInput = ({ field, label, placeholder }) => (
    <div>
      <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-3">{label}</label>
      <div className="space-y-2">
        {form[field].map((item, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              type="text"
              value={item}
              onChange={e => updateListItem(field, idx, e.target.value)}
              placeholder={`${placeholder} ${idx + 1}`}
              className="input-field flex-1 py-2.5"
            />
            {form[field].length > 1 && (
              <button type="button" onClick={() => removeListItem(field, idx)} className="text-red-400 hover:text-red-600 px-2">
                <FiX />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem(field)}
          className="flex items-center gap-1.5 font-body text-xs text-navy-800 hover:text-gold-600 transition-colors mt-1"
        >
          <FiPlus size={13} /> Add another
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin/tours" className="text-gray-400 hover:text-navy-800 transition-colors">
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <p className="font-body text-gold-600 text-xs uppercase tracking-widest mb-1">
              Admin → Tours → {isEdit ? 'Edit' : 'Create'}
            </p>
            <h1 className="font-display text-4xl text-navy-900 font-light">
              {isEdit ? 'Edit Tour' : 'Create New Tour'}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <div className="bg-white p-6 shadow-sm border border-gray-100 space-y-5">
                <h2 className="font-display text-lg text-navy-900 font-semibold border-b border-gray-100 pb-3">
                  Basic Information
                </h2>

                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Tour Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                    placeholder="e.g. Bali Paradise Escape"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-2">
                    Description *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.description}
                    onChange={e => setForm({ ...form, description: e.target.value })}
                    placeholder="Describe the tour experience in detail..."
                    className="input-field resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-2">Location *</label>
                    <input
                      type="text"
                      required
                      value={form.location}
                      onChange={e => setForm({ ...form, location: e.target.value })}
                      placeholder="e.g. Bali, Indonesia"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-2">Category *</label>
                    <select
                      value={form.category}
                      onChange={e => setForm({ ...form, category: e.target.value })}
                      className="input-field cursor-pointer"
                    >
                      {['Beach', 'Adventure', 'Cultural', 'Luxury', 'Wildlife', 'City', 'Mountain', 'Other'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Pricing & Details */}
              <div className="bg-white p-6 shadow-sm border border-gray-100 space-y-5">
                <h2 className="font-display text-lg text-navy-900 font-semibold border-b border-gray-100 pb-3">
                  Pricing & Details
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-2">Price (USD) *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={form.price}
                      onChange={e => setForm({ ...form, price: e.target.value })}
                      placeholder="1299"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-2">Duration (Days) *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={form.duration}
                      onChange={e => setForm({ ...form, duration: e.target.value })}
                      placeholder="7"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-2">Max Group Size *</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={form.maxGroupSize}
                      onChange={e => setForm({ ...form, maxGroupSize: e.target.value })}
                      placeholder="15"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs uppercase tracking-widest text-gray-500 block mb-2">Difficulty *</label>
                    <select
                      value={form.difficulty}
                      onChange={e => setForm({ ...form, difficulty: e.target.value })}
                      className="input-field cursor-pointer"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Lists */}
              <div className="bg-white p-6 shadow-sm border border-gray-100 space-y-6">
                <h2 className="font-display text-lg text-navy-900 font-semibold border-b border-gray-100 pb-3">
                  Tour Content
                </h2>
                <ListInput field="highlights" label="Highlights" placeholder="Highlight" />
                <ListInput field="included" label="What's Included" placeholder="Included item" />
                <ListInput field="notIncluded" label="Not Included" placeholder="Not included item" />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div className="bg-white p-6 shadow-sm border border-gray-100">
                <h2 className="font-display text-lg text-navy-900 font-semibold border-b border-gray-100 pb-3 mb-4">
                  Tour Image
                </h2>

                {imagePreview ? (
                  <div className="relative">
                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                    <button
                      type="button"
                      onClick={() => { setImageFile(null); setImagePreview(''); }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 hover:bg-red-600 transition-colors"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-200 cursor-pointer hover:border-navy-800 transition-colors">
                    <FiUpload className="text-gray-400 text-2xl mb-2" />
                    <span className="font-body text-sm text-gray-500">Click to upload</span>
                    <span className="font-body text-xs text-gray-400 mt-1">JPG, PNG, WebP · Max 5MB</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}

                {!imageFile && !imagePreview && (
                  <div className="mt-3">
                    <label className="font-body text-xs text-gray-500 block mb-1">Or paste image URL</label>
                    <input
                      type="url"
                      placeholder="https://..."
                      onChange={e => setImagePreview(e.target.value)}
                      className="input-field text-sm py-2"
                    />
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="bg-white p-6 shadow-sm border border-gray-100">
                <h2 className="font-display text-lg text-navy-900 font-semibold border-b border-gray-100 pb-3 mb-4">
                  Settings
                </h2>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setForm({ ...form, featured: !form.featured })}
                    className={`w-11 h-6 rounded-full transition-colors relative ${form.featured ? 'bg-navy-800' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${form.featured ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                  <div>
                    <p className="font-body text-sm font-medium text-navy-900">Featured Tour</p>
                    <p className="font-body text-xs text-gray-400">Show on homepage</p>
                  </div>
                </label>
              </div>

              {/* Submit */}
              <div className="bg-white p-6 shadow-sm border border-gray-100 space-y-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-navy-900 text-white py-4 font-body font-semibold text-sm tracking-wide hover:bg-navy-950 transition-colors disabled:opacity-60"
                >
                  {loading ? 'Saving...' : isEdit ? 'Update Tour' : 'Create Tour'}
                </button>
                <Link
                  to="/admin/tours"
                  className="block w-full text-center border border-gray-200 py-3 font-body text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
