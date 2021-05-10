<template>
  <div class="upload-image">
    <van-uploader
      v-model="fileList"
      :before-delete="beforeDelete"
      :after-read="afterRead"
      multiple
      :max-count="maxCount"
    />
  </div>
</template>
<script>
import { uploadImage, getImageAiInfo } from '@/api/common'
import config from '@/config'
export default {
  name: 'UploadImage',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    // 最大限制数量
    maxCount: {
      type: Number,
      default: 1
    },
    needAI: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fileList: [],
      aiInfo: {}
    }
  },
  mounted() {
    this.fileList = this.value.map(item => {
      return {
        code: item,
        url: config.asset + '/' + item,
        isImage: true
      }
    })
  },
  methods: {
    // 删除图片
    beforeDelete(file) {
      if (file.code) {
        const list = [...this.value]
        const aiInfo = { ...this.aiInfo }
        delete aiInfo[file.code]
        this.aiInfo = aiInfo
        list.splice(list.indexOf(file.code), 1)
        this.$emit('input', list)
      }
      return true
    },
    // 图片读取完成
    afterRead(file) {
      if (Array.isArray(file)) {
        file.map(item => {
          this.upload(item)
        })
      } else {
        this.upload(file)
      }
    },
    // 上传后端
    upload(file) {
      file.status = 'uploading'
      file.message = '上传中...'
      uploadImage({ image: file.content })
        .then(async res => {
          if (res.code === 200) {
            if (this.needAI) {
              file.message = '智能解析中'
              const info = await this.getImageAI(file)
              this.aiInfo[res.data.code] = info
            }
            file.code = res.data.code
            file.url = config.asset + '/' + res.data.code
            file.status = 'done'
            file.message = '上传成功'
            const list = [...this.value]
            list.push(res.data.code)
            this.$emit('input', list)
          } else {
            file.status = 'failed'
            file.message = '上传失败'
          }
        })
        .catch(err => {
          console.log(err, 'err')
          file.status = 'failed'
          file.message = '上传失败'
        })
    },
    // 获取实际数量，包含失败的
    getActualCount() {
      return this.fileList.length
    },
    // 获取ai分类
    async getImageAI(file) {
      const defaultAiInfo = {
        name: '其他',
        score: 0,
        info_type_name: '',
        info_sc_code: '',
        status: 0
      }
      return new Promise((resolve, reject) => {
        getImageAiInfo({ image: file.content })
          .then(res => {
            if (res.code === 200) {
              resolve(res.data)
            } else {
              resolve(defaultAiInfo)
            }
          })
          .catch(err => {
            console.log(err)
            resolve(defaultAiInfo)
          })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.upload-image {
  margin-top: 12px;
  ::v-deep {
    .van-uploader__preview-image {
      width: 81px;
      height: 81px;
    }
    .van-uploader__upload {
      width: 81px;
      height: 81px;
      margin: 0 0 12px 0;
    }
    .van-uploader__preview {
      margin: 0 12px 12px 0;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
