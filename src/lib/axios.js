import axios from 'axios'
// import { useRouter } from 'vue-router'

const instance = axios.create({
  withCredentials: true,
  withXSRFToken: true,
  baseURL: import.meta.env.VITE_API_URL
})

// const router = useRouter()

// instance.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response && error.response.status === 419) {
//       // Redirect to login page on 419 error
//       router.push('/login')
//     }
//   }
// )

export default instance
