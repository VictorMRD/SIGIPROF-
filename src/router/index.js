import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/stores/app'
import routes from './routes'
import axios from '@/lib/axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(async (to, from, next) => {
  const appStore = useAppStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (to.name == 'login' && appStore.isLoggedIn) {
    next({ name: 'index'})
  } else {
    next()
  }

  if (requiresAuth) {
    try {
      const response = await axios.get('api/v1/user')

      if (response.status === 200) {
        next()
      } else {
        next({ name: 'login' })
      }
    } catch (error) {
      console.error('API call failed:', error)
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
