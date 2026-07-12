import axios from 'axios';

// The base URL for the Spring Boot backend
// In production, this would be retrieved from an environment variable: import.meta.env.VITE_API_BASE_URL
const API_BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth tokens if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vikram_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Form endpoints
export const authApi = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  register: (userData) => apiClient.post('/auth/register', userData),
};

export const formsApi = {
  submitInquiry: (data) => apiClient.post('/inquiry', data),
  submitAdmission: (data) => apiClient.post('/admission', data),
  submitContact: (data) => apiClient.post('/contact', data),
};

export default apiClient;
