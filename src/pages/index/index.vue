<template>
  <view class="container">
    <view v-if="!isLoggedIn" class="not-logged-in">
      <text>请先登录后查看DIO记录</text>
      <button type="primary" @tap="goToLogin">去登录</button>
    </view>
    
    <view v-else>
      <view v-if="dioList.length === 0" class="empty-state">
        <text>暂无DIO记录</text>
        <button type="primary" @tap="goToPublish">去发布</button>
      </view>
      
      <view v-else class="dio-list">
        <view v-for="(item, index) in dioList" :key="item.id" class="dio-item">
          <view class="dio-header">
            <text class="time">{{ formatDate(item.createdAt) }}</text>
            <text class="duration">{{ item.duration }}分钟</text>
          </view>
          <view class="dio-content">
            <view class="content-item">
              <text class="label">姿势：</text>
              <text>{{ item.posture }}</text>
            </view>
            <view class="content-item">
              <text class="label">心情：</text>
              <text>{{ item.mood }}</text>
            </view>
            <view v-if="item.remark" class="content-item">
              <text class="label">备注：</text>
              <text>{{ item.remark }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getDioList } from '@/api/dio'

export default {
  data() {
    return {
      isLoggedIn: false,
      dioList: []
    }
  },
  onShow() {
    this.checkLoginStatus()
  },
  methods: {
    checkLoginStatus() {
      const token = uni.getStorageSync('token')
      if (token) {
        this.isLoggedIn = true
        this.getDioList()
      } else {
        this.isLoggedIn = false
      }
    },
    async getDioList() {
      try {
        const res = await getDioList()
        this.dioList = res.data
      } catch (error) {
        uni.showToast({
          title: '获取记录失败',
          icon: 'none'
        })
      }
    },
    formatDate(dateStr) {
      const date = new Date(dateStr)
      return (`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`)
    },
    goToLogin() {
      uni.switchTab({
        url: '/pages/profile/index'
      })
    },
    goToPublish() {
      uni.switchTab({
        url: '/pages/publish/index'
      })
    }
  }
}
</script>

<style>
.container {
  padding: 20px;
}

.not-logged-in, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
}

.not-logged-in text, .empty-state text {
  margin-bottom: 20px;
  color: #999;
  font-size: 16px;
}

.dio-list {
  padding-bottom: 20px;
}

.dio-item {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dio-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.time {
  color: #666;
  font-size: 14px;
}

.duration {
  color: #3cc51f;
  font-weight: bold;
}

.dio-content {
  font-size: 14px;
}

.content-item {
  margin-bottom: 8px;
}

.content-item .label {
  color: #666;
}
</style>
