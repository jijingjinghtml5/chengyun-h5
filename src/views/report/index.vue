<template>
  <div class="page-container">
    <NavBar title="案件上报"></NavBar>
    <div class="page-warpper">
      <van-cell class="title">案件图片（最多6张图片）</van-cell>
      <UploadImage v-model="photoList" :maxCount="6" ref="uploadImage" :needAI="true" />
      <van-cell class="title">案件分类</van-cell>
      <van-cell-group>
        <van-field placeholder="选择案件分类" :value="caseType" readonly @click="showCategory = true" ref="caseType">
          <van-icon slot="right-icon" size="12" name="arrow-down"></van-icon>
        </van-field>
      </van-cell-group>
      <EventTypes :showCategory="showCategory" @close="showCategory = false" @confirm="selEventTypes"></EventTypes>
      <div>
        <van-button @click="submitReport">提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar/index'
import UploadImage from '@/components/UploadImage/index'
import EventTypes from '@/components/EventTypes/index'
import { mapGetters } from 'vuex'

export default {
  name: 'Report',
  components: {
    NavBar,
    UploadImage,
    EventTypes
  },
  computed: {
    ...mapGetters(['eventTypes'])
  },
  props: {},
  data() {
    return {
      photoList: [],
      caseType: '',
      showCategory: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 提交上报
    submitReport() {
      const actualCount = this.$refs.uploadImage.getActualCount()
      if (actualCount > this.photoList.length) return this.$toast('当前存在上传失败或上传中的图片')
    },
    selEventTypes(list) {
      this.caseType = list.join('-')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding-left: 0;
  padding-right: 0;
}
</style>
