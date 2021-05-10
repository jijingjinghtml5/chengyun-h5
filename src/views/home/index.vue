<!-- home -->
<template>
  <div class="page-container gray-bg">
    <NavBar :showBack="false" title="工作台"></NavBar>
    <div class="page-warpper">
      <van-cell class="title">全部应用</van-cell>
      <van-grid :border="false" :column-num="4" class="work-grid">
        <van-grid-item class="work-grid-item" v-for="item in list" :key="item.image" :to="item.to ? item.to : ''">
          <van-image class="work-img" :src="item.image" />
          <span class="work-title">{{ item.title }}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <TabBar :defaultActive="0" />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar/index'
import TabBar from '@/components/TabBar/index'
// 图片
import report from '@/assets/image/report.png'
import selfReport from '@/assets/image/selfReport.png'
import verify from '@/assets/image/verify.png'
import resolve from '@/assets/image/resolve.png'
import check from '@/assets/image/check.png'
import signin from '@/assets/image/signin.png'
import person from '@/assets/image/person.png'

export default {
  components: {
    TabBar,
    NavBar
  },
  data() {
    return {
      list: [
        {
          title: '案件上报',
          image: report,
          to: '/report'
        },
        {
          title: '自发自处',
          image: selfReport
        },
        {
          title: '案件核实',
          image: verify
        },
        {
          title: '案件处置',
          image: resolve
        },
        {
          title: '案件核查',
          image: check
        },
        {
          title: '打卡签到',
          image: signin
        },
        {
          title: '重点人员关爱',
          image: person
        }
      ]
    }
  },
  computed: {},

  mounted() {},

  methods: {}
}
</script>
<style lang="scss" scoped>
.title {
  margin-top: 20px;
}
.work-grid {
  background: #fff;
  .work-grid-item {
    .work-img {
      width: 45px;
      height: 45px;
      border-radius: 10px;
      overflow: hidden;
    }
    .work-title {
      height: 25px;
      font-size: 12px;
      margin-top: 8px;
      text-align: center;
    }
  }
}
</style>
