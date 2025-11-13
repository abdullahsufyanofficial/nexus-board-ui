import axios from 'axios';
import toast from 'react-hot-toast';
import { createClient } from '@supabase/supabase-js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
const MOCK_MODE = import.meta.env.VITE_MOCK_MODE !== 'false';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (MOCK_MODE) {
      config.headers['X-Mock-Mode'] = 'true';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';

    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      window.location.href = '/auth/login';
      return Promise.reject(error);
    }

    if (error.response?.status !== 404) {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

// Create a single supabase client with safe fallbacks (anon key is publishable)
const FALLBACK_URL = 'https://plvhelgpatpjwlnanvva.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsdmhlbGdwYXRwandsbmFudnZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MjY4MTksImV4cCI6MjA3NTQwMjgxOX0.9VEv9mnnYlBY0owvDY_seyTiQfprNCrxBxdiJOXVTNo';
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default apiClient;