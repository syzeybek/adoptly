import axios from 'axios';

const api = axios.create({
  // Buraya senin Adoptly REST API adresin gelecek
  baseURL: 'https://api.adoptly.com/v1', 
  timeout: 10000,
});

// Request Interceptor: Her isteğe otomatik Token ekler (Giriş yaptıysa)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adoptly_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;