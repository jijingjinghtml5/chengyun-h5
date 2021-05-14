<template>
  <div class="app-container">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { getCaseType } from '@/api/common'
import { mapActions } from 'vuex'

export default {
  name: 'AppLayout',
  data() {
    return {}
  },
  methods: {
    ...mapActions(['setUserInfo', 'setEventTypes'])
  },
  async created() {
    if (!localStorage.getItem('access_token')) {
      this.$toast('尚未登录！')
      this.$router.push('/login')
      return
    }
    const res = await getUserInfo()
    this.setUserInfo(res.data)
    getCaseType().then(res => {
      this.setEventTypes(res.data)
    })
  }
}
</script>
