import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import { setToastDefaultOptions, showFailToast, showLoadingToast } from 'vant'
import type { ToastOptions, ToastWrapperInstance } from 'vant/lib/toast/types'

setToastDefaultOptions('loading', {
  duration: 0
})

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_PREFIX,
  // timeout: 10000,
  timeoutErrorMessage: '请求超时'
})

// 全局loading实例
const loadingInstances = new Map<string, ToastWrapperInstance>()
// const noAuthorizationApi: Set<string> = new Set([])

// 不需要loading的api
const noLoadingApi: Set<string> = new Set([])

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.url && !noLoadingApi.has(config.url!)) {
      const instance = showLoadingToast('加载中')
      loadingInstances.set(config.url!, instance)
    }

    return config
  },
  (error: { url: string }) => {
    loadingInstances.get(error.url!)?.close()
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    loadingInstances.get(response.config.url!)?.close()
    return response.data
  },
  (error: {
    config: { url: string }
    response: { data: { message: string | ToastOptions } }
    message: string | ToastOptions
  }) => {
    loadingInstances.get(error.config.url!)?.close()
    if (error.response) {
      showFailToast(error.response.data.message)
    } else {
      showFailToast(error.message)
    }
    return Promise.reject(error)
  }
)

// 封装get请求
function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance({
    method: 'get',
    url,
    ...config
  })
}

// 封装post请求
function post<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return axiosInstance({
    method: 'post',
    url,
    ...config
  })
}

export { get, post }
