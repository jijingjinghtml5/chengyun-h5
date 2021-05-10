<template>
  <div class="page-container">
    <!-- <NavBar title="城运"></NavBar> -->
    <div class="page-warpper">
      <div class="login-title">登 录</div>
      <van-cell-group>
        <van-field
          v-model="username"
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          left-icon="contact"
          @click-right-icon="$toast('用户名必须是手机号')"
        />

        <van-field
          v-model="password"
          clearable
          type="password"
          label="密码"
          right-icon="question-o"
          placeholder="请输入密码"
          left-icon="closed-eye"
          @click-right-icon="$toast('密码必须是数字、字母、下划线')"
        />
      </van-cell-group>
      <van-button v-preventReClick type="primary" class="submit-btn" @click="onClickButtonSubmit">登录</van-button>
    </div>
  </div>
</template>

<script>
import { fetchLogin } from '@/api/user'
export default {
  name: 'UserLogin',
  props: {},
  data() {
    return {
      errors: [],
      username: '',
      password: ''
    }
  },
  created() {},
  mounted() {},
  methods: {
    onClickRight() {
      this.$toast('请填写注册信息')
      this.$router.push({ path: '/register' })
    },
    // 表单提交
    async onClickButtonSubmit(e, username, password) {
      // conosle.log(e)
      if (this.username == '') {
        this.$toast('用户名不能为空')
        return false
      }
      if (this.password == '') {
        this.$toast('密码不能为空')
        return false
      } else {
        const res = await fetchLogin({ username: this.username, password: this.password })
        console.log(res)
        if (res.code === 200) {
          localStorage.setItem('access_token', res.data.token)
          this.$router.replace('/home')
        } else {
          this.$toast('登录失败，请重试')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-title {
  font-size: 36px;
  padding: 0 12px;
}
.van-cell-group {
  margin: 50px 0;
}
</style>
