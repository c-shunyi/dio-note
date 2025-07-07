const BASE_URL = 'http://localhost:8810'
const TIMEOUT = 10000

// 处理请求url
function handleUrl(url) {
  if (url.startsWith('http')) {
    return url
  }
  return `${BASE_URL}${url}`
}

// 处理请求配置
function handleConfig(config) {
  const token = uni.getStorageSync('token')
  if (token) {
    config.header = {
      ...config.header,
      'Authorization': `Bearer ${token}`
    }
  }
  return config
}

// 处理响应数据
function handleResponse(response) {
  if (response.statusCode !== 200) {
    const error = new Error(response.data.error || '请求失败')
    error.statusCode = response.statusCode
    throw error
  }
  return response.data
}

// 封装请求方法
function request(options) {
  const config = handleConfig({
    timeout: TIMEOUT,
    ...options,
    url: handleUrl(options.url)
  })

  return new Promise((resolve, reject) => {
    uni.request({
      ...config,
      success: (response) => {
        try {
          const result = handleResponse(response)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      },
      fail: (error) => {
        reject(new Error(error.errMsg || '网络请求失败'))
      }
    })
  })
}

// 封装 GET 请求
export function get(url, params) {
  return request({
    url,
    method: 'GET',
    data: params
  })
}

// 封装 POST 请求
export function post(url, data) {
  return request({
    url,
    method: 'POST',
    data
  })
}

// 封装 PUT 请求
export function put(url, data) {
  return request({
    url,
    method: 'PUT',
    data
  })
}

// 封装 DELETE 请求
export function del(url, params) {
  return request({
    url,
    method: 'DELETE',
    data: params
  })
}

export default {
  get,
  post,
  put,
  del
} 