<template>
  <div class="page-container">
    <NavBar title="案件上报"></NavBar>
    <div class="page-warpper">
      <!-- 案件图片 -->
      <van-cell class="title">案件图片（最多6张图片）</van-cell>
      <UploadImage v-model="photoList" :maxCount="6" ref="uploadImage" :needAI="true" />
      <!-- 案件分类 -->
      <van-cell class="title">案件分类</van-cell>
      <van-cell-group>
        <van-field
          placeholder="选择案件分类"
          :value="caseType.join('-')"
          readonly
          @click="showCategory = true"
          ref="caseType"
        >
          <van-icon slot="right-icon" size="12" name="arrow-down"></van-icon>
        </van-field>
      </van-cell-group>
      <EventTypes :showCategory="showCategory" @close="showCategory = false" @confirm="selEventTypes"></EventTypes>

      <!-- 案件名称 -->
      <van-cell class="title">案件名称</van-cell>
      <van-collapse v-model="showCaseName">
        <van-collapse-item :title="caseName">
          <van-radio-group v-model="caseName">
            <van-cell v-for="item in caseNameList" :key="item.code" :title="item.name" clickable>
              <template #right-icon>
                <van-radio :name="item.name" />
              </template>
            </van-cell>
          </van-radio-group>
        </van-collapse-item>
      </van-collapse>

      <van-button class="submit-btn" @click="submitReport">提交</van-button>
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
    ...mapGetters(['eventTypes', 'eventTypesNew'])
  },
  props: {},
  data() {
    return {
      photoList: [],
      showCategory: false,
      caseType: [],
      // caseTypeIndex: [1, 0, 0],
      caseNameList: [], // 案件名称列表
      caseName: '',
      showCaseName: []
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
    // 接受分类参数
    selEventTypes(name, indexs) {
      this.caseType = name
      // this.caseTypeIndex = indexs
      if (indexs && indexs.length === 3) {
        this.caseNameList = this.eventTypesNew[indexs[0]].children[indexs[1]].children[indexs[2]].children
        this.caseName = this.caseNameList.length && this.caseNameList[0].name
        this.showCaseName = [this.caseName]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding-left: 0;
  padding-right: 0;
}
.submit-btn {
  margin-top: 30px;
}
</style>
