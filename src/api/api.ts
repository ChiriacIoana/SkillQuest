import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5500',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken'); // assuming you store JWT here
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;