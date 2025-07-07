import { post, get } from '@/utils/request'

// 用户登录
export function login(data) {
  return post('/api/user/login', data)
}

// 用户注册
export function register(data) {
  return post('/api/user/register', data)
}

// 获取用户信息
export function getUserProfile() {
  return get('/api/user/profile')
}

// 绑定好友
export function bindFriend(data) {
  return post('/api/friend/bind', data)
} 