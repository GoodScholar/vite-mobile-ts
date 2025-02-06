import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref<User.UserInfo>({
    userAuth: ''
  })

  const isUserLogin = computed(() => {
    return userInfo.value.userAuth !== null
  })

  function updateUserInfo(val: User.UserInfo) {
    userInfo.value = val
  }

  return { userInfo, isUserLogin, updateUserInfo }
})
