<template>
  <div class="upload-audio">
    <van-button @click="startRecord">开始录音</van-button>
    <van-button @click="stopRecord">暂停录音</van-button>
  </div>
</template>
<script>
import Recorderx, { ENCODE_TYPE } from 'recorderx'

export default {
  name: 'UploadAudio',
  props: {},
  data() {
    return {
      recorder: null
    }
  },
  mounted() {},
  created() {},
  methods: {
    startRecord() {
      const that = this
      that.recorder = new Recorderx()
      that.$nextTick(() => {
        that.recorder
          .start()
          .then(() => {
            console.log('start recording')
          })
          .catch(error => {
            console.log('Recording failed.', error)
          })
      })
    },
    stopRecord() {
      this.recorder.pause()
      const wav = this.recorder.getRecord({
        encodeTo: ENCODE_TYPE.WAV
      })
      this.uplode(wav)
    },
    // 上传音频
    uplode(wav) {
      console.log(wav, 'wav')
      // const formData = new window.FormData()
      // const name = `${this.getMath() + this.getMath() + this.getMath()}.wav`
      // formData.append('file', wav, name) // 'file' 这个名字要和后台获取文件的名字一样;
      // formData.append('user_key', this.returnUserKey())
      // console.log(wav)
      // console.log(formData)
      // const options = {
      //   // 设置axios的参数
      //   url: `${this.returnAPI()}Api/V1/Index/uploadFile`,
      //   data: formData,
      //   method: 'post',
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }
      // this.$axios(options).then(res => {
      //   if (res.data.status == '1') {
      //     this.$Toast({
      //       message: res.data.msg,
      //       duration: 2000
      //     })
      //   } else {
      //     this.$Toast({
      //       message: res.data.msg,
      //       duration: 2000
      //     })
      //   }
      // })
    }
  }
}
</script>

<style scoped lang="scss"></style>
