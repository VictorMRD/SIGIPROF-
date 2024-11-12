import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { UserInfo } from '@/types/UserInfo'

export const useAppStore = defineStore('app', () => {
  const user = ref<UserInfo | null>(null)

  // Load user data from storeage if available
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }

  // Function to set user data and save to local storage
  function setUser(newUser: UserInfo) {
    user.value = newUser
    localStorage.setItem('user', JSON.stringify(newUser))
  }

  // Function to clear user data
  function clearUser() {
    user.value = null
    localStorage.removeItem('user')
  }

  // Computed property to check if the user is logged in
  const isLoggedIn = computed(() => user.value !== null)

  return { user, setUser, clearUser, isLoggedIn }
})
