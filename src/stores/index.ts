import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate' // 数据持久化

const pinia = createPinia()
pinia.use(
  createPersistedState({
    storage: sessionStorage
  })
)

export default pinia
