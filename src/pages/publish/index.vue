<template>
  <view class="publish-container">
    <form @submit="handleSubmit">
      <view class="form-item">
        <text class="label">时长（分钟）</text>
        <input type="number" v-model="formData.duration" placeholder="请输入时长" />
      </view>
      <view class="form-item">
        <text class="label">姿势</text>
        <input type="text" v-model="formData.posture" placeholder="请输入姿势" />
      </view>
      <view class="form-item">
        <text class="label">心情</text>
        <input type="text" v-model="formData.mood" placeholder="请输入心情" />
      </view>
      <view class="form-item">
        <text class="label">备注</text>
        <textarea v-model="formData.remark" placeholder="请输入备注" />
      </view>
      <button type="primary" form-type="submit">发布</button>
    </form>
  </view>
</template>

<script>
import { createDio } from '@/api/dio'

export default {
  data() {
    return {
      formData: {
        duration: '',
        posture: '',
        mood: '',
        remark: ''
      }
    }
  },
  methods: {
    async handleSubmit(e) {
      try {
        const token = uni.getStorageSync('token')
        if (!token) {
          uni.showToast({
            title: '请先登录',
            icon: 'none'
          })
          setTimeout(() => {
            uni.navigateTo({
              url: '/pages/profile/index'
            })
          }, 1500)
          return
        }

        await createDio(this.formData)
        uni.showToast({
          title: '发布成功',
          icon: 'success'
        })
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/index/index'
          })
        }, 1500)
      } catch (error) {
        uni.showToast({
          title: error.message || '发布失败',
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style>
.publish-container {
  padding: 20px;
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

input, textarea {
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px;
  font-size: 14px;
}

textarea {
  height: 100px;
}

button {
  margin-top: 20px;
}
</style> 