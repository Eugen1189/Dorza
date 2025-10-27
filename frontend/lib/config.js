// Конфігурація для API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const API_ENDPOINTS = {
  generate: `${API_BASE_URL}/api/generate`,
  health: `${API_BASE_URL}/health`,
};

// Експортуємо для використання в компонентах
export default {
  API_BASE_URL,
  API_ENDPOINTS,
};
