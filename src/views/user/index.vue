<!-- home -->
<template>
  <div class="page-container gray-bg">
    <NavBar :showBack="false" title="我"></NavBar>
    <div class="page-warpper">
      <div class="my-mess">
        <div class="flex space-between">
          <span class="government">XXX人民政府</span>
          <van-image class="my-avatar" :src="avatar"></van-image>
        </div>
        <div class="my-name">{{ userInfo.name }}</div>
      </div>
      <van-cell-group>
        <van-cell icon="user-o" title="个人信息" is-link />
        <van-cell icon="setting-o" title="账户管理" is-link />
      </van-cell-group>
    </div>
    <TabBar :defaultActive="1" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar/index'
import TabBar from '@/components/TabBar/index'
import { mapGetters } from 'vuex'
import avatar from '@/assets/image/my.png'
export default {
  data() {
    return {
      wechat: ``,
      avatar: avatar
    }
  },
  components: {
    TabBar,
    NavBar
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.my-mess {
  width: 327px;
  height: 136px;
  background: #fff;
  margin: 12px 0;
  border-radius: 5px;
  padding: 12px;
  .government {
    font-size: 20px;
    font-weight: 600;
    color: #999;
  }
  .my-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid #efefef;
    overflow: hidden;
  }
  .my-name {
    font-size: 20px;
    margin-top: 10px;
  }
}
</style>
