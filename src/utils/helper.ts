import { customRef } from 'vue'

// 防抖ref
export const debounceRef = (value: any, duration: number = 500) => {
  return customRef((track, trigger) => {
    let timeout: any
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        // 延迟派发更新
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, duration)
      }
    }
  })
}
