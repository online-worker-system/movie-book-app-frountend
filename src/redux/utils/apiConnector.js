import axios from 'axios';
import { toast } from 'react-toastify';

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL;

// Create an Axios instance with default configuration
const AxiosInstance = axios.create({
  baseURL: REACT_APP_BASE_URL, // Your base URL from the .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        // If unauthorized, clear token and redirect to login
        localStorage.clear();
        window.location.href = '/login';
        toast.error('Unauthorized. Please login again.');
      } else if (status === 402) {
        window.location.href = '/upgrade-plan';
        toast.error('Please purchase a plan to continue.');
      } else {
        toast.error(error.response.data?.message || 'An error occurred');
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
