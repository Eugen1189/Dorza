// API configuration
// Production: Railway backend URL
// Development: Use localhost for local testing
const isDevelopment = process.env.NODE_ENV === 'development';
const RAILWAY_URL = 'https://beneficial-playfulness.up.railway.app';
const LOCAL_URL = 'http://localhost:8000';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL 
  || (isDevelopment ? LOCAL_URL : RAILWAY_URL);

export const API_ENDPOINTS = {
  generate: `${API_BASE_URL}/api/generate`,
  health: `${API_BASE_URL}/health`,
};

// Export for use in components
export default {
  API_BASE_URL,
  API_ENDPOINTS,
};
