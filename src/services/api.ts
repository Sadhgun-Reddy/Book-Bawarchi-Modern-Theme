import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { Dish } from '../types';

// Create an Axios instance with a base URL
// Note: Do not hard-code Content-Type to allow FormData uploads (multipart)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  // Headers are left to be inferred per-request by Axios/Browser
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle global errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: any) => {
    // Handle standard unauthorized errors globally
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized access. Redirecting to login...');
      // Redirect to login page for a better UX in SPA
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    } else if (error.response && error.response.status === 403) {
      console.error('Forbidden access.');
    } else if (error.response && error.response.status === 500) {
      console.error('Server error.');
    }

    return Promise.reject(error);
  }
);

export default api;
