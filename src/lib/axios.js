import axios from 'axios'
import router from '@/router'
import { useAppStore } from '@/stores/app'

const instance = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  baseURL: import.meta.env.VITE_API_URL
})

// Add a response interceptor
instance.interceptors.response.use(
  response => response, // Pass through successful responses
  error => {
    if (error.response && error.response.status === 401) {
      // Session expired, redirect to login page and clear user data
      //
      const appStore = useAppStore();
      appStore.clearUser(); // Clear user data from Pinia store

      router.push({ name: 'login' }); // Redirect to login page
    }
    return Promise.reject(error); // Pass through other errors
  }
);

export default instance
