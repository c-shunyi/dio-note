<template>
  <view class="profile-container">
    <!-- 未登录状态 -->
    <view v-if="!isLoggedIn" class="login-form">
      <view class="form-item">
        <text class="label">用户名</text>
        <input type="text" v-model="formData.username" placeholder="请输入用户名" />
      </view>
      <view class="form-item">
        <text class="label">密码</text>
        <input type="password" v-model="formData.password" placeholder="请输入密码" />
      </view>
      <view class="btn-group">
        <button type="primary" @tap="handleLogin">登录</button>
        <button @tap="handleRegister">注册</button>
      </view>
    </view>

    <!-- 已登录状态 -->
    <view v-else class="user-info">
      <view class="info-card">
        <view class="info-item">
          <text class="label">用户名：</text>
          <text>{{ userInfo.username }}</text>
        </view>
        <view class="info-item">
          <text class="label">邀请码：</text>
          <text>{{ userInfo.inviteCode }}</text>
        </view>
        <view v-if="!userInfo.friendId" class="bind-friend">
          <view class="form-item">
            <text class="label">绑定DIO友</text>
            <input type="text" v-model="friendInviteCode" placeholder="请输入好友邀请码" />
          </view>
          <button type="primary" @tap="handleBindFriend">绑定</button>
        </view>
      </view>
      <button class="logout-btn" @tap="handleLogout">退出登录</button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { login, register, getUserProfile, bindFriend } from '@/api/user'
import { onShow } from '@dcloudio/uni-app'

const isLoggedIn = ref(false)
const userInfo = ref({})
const friendInviteCode = ref('')
const formData = reactive({
  username: '',
  password: ''
})

// 检查登录状态
function checkLoginStatus() {
  const token = uni.getStorageSync('token')
  if (token) {
    isLoggedIn.value = true
    getUserInfo()
  } else {
    isLoggedIn.value = false
  }
}

// 获取用户信息
async function getUserInfo() {
  try {
    const res = await getUserProfile()
    userInfo.value = res.data
  } catch (error) {
    uni.showToast({
      title: '获取用户信息失败',
      icon: 'none'
    })
  }
}

// 处理登录
async function handleLogin() {
  try {
    const res = await login(formData)
    uni.setStorageSync('token', res.data.token)
    userInfo.value = res.data.user
    isLoggedIn.value = true
    uni.showToast({
      title: '登录成功',
      icon: 'success'
    })
  } catch (error) {
    uni.showToast({
      title: error.message || '登录失败',
      icon: 'none'
    })
  }
}

// 处理注册
async function handleRegister() {
  try {
    await register(formData)
    uni.showToast({
      title: '注册成功，请登录',
      icon: 'success'
    })
  } catch (error) {
    uni.showToast({
      title: error.message || '注册失败',
      icon: 'none'
    })
  }
}

// 处理绑定好友
async function handleBindFriend() {
  try {
    await bindFriend({ inviteCode: friendInviteCode.value })
    uni.showToast({
      title: '绑定成功',
      icon: 'success'
    })
    getUserInfo()
  } catch (error) {
    uni.showToast({
      title: error.message || '绑定失败',
      icon: 'none'
    })
  }
}

// 处理退出登录
function handleLogout() {
  uni.removeStorageSync('token')
  isLoggedIn.value = false
  userInfo.value = {}
  uni.showToast({
    title: '已退出登录',
    icon: 'success'
  })
}

// 页面显示时检查登录状态
onShow(() => {
  checkLoginStatus()
})
</script>

<style>
.profile-container {
  padding: 20px;
}

.login-form, .user-info {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

.form-item {
  margin-bottom: 20px;
}

.label {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
}

input {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
}

.btn-group {
  display: flex;
  gap: 15px;
}

.btn-group button {
  flex: 1;
}

.info-card {
  background: #f8f8f8;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
  font-size: 14px;
}

.info-item .label {
  display: inline;
  color: #666;
}

.bind-friend {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.logout-btn {
  margin-top: 20px;
  background: #ff4d4f;
  color: #fff;
}
</style> 