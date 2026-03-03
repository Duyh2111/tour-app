import { useState } from 'react';
import { FiX, FiUser, FiMail, FiPhone, FiCalendar, FiUsers, FiMessageSquare, FiCheck } from 'react-icons/fi';

export default function EnquiryModal({ tour, onClose }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', groupSize: '2', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-950/75 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="bg-navy-900 px-6 py-5 flex items-start justify-between sticky top-0 z-10">
          <div className="pr-4">
            <p className="font-body text-gold-500 text-xs uppercase tracking-[0.25em] mb-1">Enquire About This Tour</p>
            <h3 className="font-display text-xl text-white font-light leading-snug">{tour.title}</h3>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="font-body text-white/50 text-xs">📍 {tour.location}</span>
              <span className="font-body text-white/50 text-xs">🕐 {tour.duration} days</span>
              <span className="font-body text-gold-400 text-xs font-semibold">From ${tour.price.toLocaleString()}/pp</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors flex-shrink-0 p-1 -mr-1"
          >
            <FiX size={20} />
          </button>
        </div>

        {submitted ? (
          /* Success State */
          <div className="px-8 py-14 text-center">
            <div className="w-16 h-16 bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-5">
              <FiCheck className="text-emerald-500 text-2xl" />
            </div>
            <h3 className="font-display text-2xl text-navy-900 font-semibold mb-2">Enquiry Sent!</h3>
            <p className="font-body text-gray-500 text-sm leading-relaxed mb-2">
              Thank you, <strong className="text-navy-900">{form.name.split(' ')[0]}</strong>!
            </p>
            <p className="font-body text-gray-500 text-sm leading-relaxed mb-8">
              Our team will reach you at <strong className="text-navy-900">{form.email}</strong> within 24 hours to discuss your Vietnam adventure.
            </p>
            <button onClick={onClose} className="btn-gold px-10">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Full Name *</label>
                <div className="relative">
                  <FiUser className="form-icon" />
                  <input
                    type="text" required
                    value={form.name} onChange={e => set('name', e.target.value)}
                    placeholder="John Smith"
                    className="input-field pl-9 py-2.5 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Email Address *</label>
                <div className="relative">
                  <FiMail className="form-icon" />
                  <input
                    type="email" required
                    value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="you@example.com"
                    className="input-field pl-9 py-2.5 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Phone + Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="form-label">Phone Number</label>
                <div className="relative">
                  <FiPhone className="form-icon" />
                  <input
                    type="tel"
                    value={form.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="+1 234 567 890"
                    className="input-field pl-9 py-2.5 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Preferred Travel Date</label>
                <div className="relative">
                  <FiCalendar className="form-icon" />
                  <input
                    type="date"
                    value={form.date} onChange={e => set('date', e.target.value)}
                    className="input-field pl-9 py-2.5 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Group Size */}
            <div>
              <label className="form-label">Group Size</label>
              <div className="relative">
                <FiUsers className="form-icon" />
                <select
                  value={form.groupSize} onChange={e => set('groupSize', e.target.value)}
                  className="input-field pl-9 py-2.5 text-sm cursor-pointer"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'person' : 'people'}</option>
                  ))}
                  <option value="11+">11+ people (group)</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="form-label">Special Requests</label>
              <div className="relative">
                <FiMessageSquare className="absolute left-3 top-3 text-gray-400 text-sm" />
                <textarea
                  rows={3}
                  value={form.message} onChange={e => set('message', e.target.value)}
                  placeholder="Dietary requirements, accessibility needs, questions..."
                  className="input-field pl-9 py-2.5 text-sm resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit" disabled={loading}
                className="w-full bg-gold-500 text-navy-900 py-4 font-body font-semibold text-sm tracking-wide hover:bg-gold-400 transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full animate-spin" />
                    Sending Enquiry...
                  </>
                ) : 'Send Enquiry'}
              </button>
              <p className="font-body text-xs text-gray-400 text-center mt-3">
                Free consultation · No commitment · Reply within 24h
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
