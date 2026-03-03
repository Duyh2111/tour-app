import axios from 'axios';
import toast from 'react-hot-toast';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 30000,
});

// Cold-start tracker (Render free tier spins down after inactivity)
let pendingRequests = 0;
let warmupTimer = null;

const clearWarmup = () => {
  if (warmupTimer) { clearTimeout(warmupTimer); warmupTimer = null; }
  toast.dismiss('warmup');
};

// Attach JWT + start cold-start timer
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;

  if (pendingRequests === 0) {
    warmupTimer = setTimeout(() => {
      toast.loading('Server is warming up, please wait a moment…', {
        id: 'warmup',
        duration: Infinity,
        style: { background: '#0f1f3d', color: '#fff', fontFamily: "'DM Sans', sans-serif" },
      });
    }, 3500);
  }
  pendingRequests++;
  return config;
});

// Dismiss cold-start toast on success
API.interceptors.response.use(
  (response) => {
    pendingRequests = Math.max(0, pendingRequests - 1);
    if (pendingRequests === 0) clearWarmup();
    return response;
  },
  (error) => {
    pendingRequests = Math.max(0, pendingRequests - 1);
    if (pendingRequests === 0) clearWarmup();
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
