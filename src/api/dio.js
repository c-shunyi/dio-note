import { post, get } from '@/utils/request'

// 获取 DIO 记录列表
export function getDioList() {
  return get('/api/dio-note/')
}

// 创建新的 DIO 记录
export function createDio(data) {
  return post('/api/dio-note/', data)
} 