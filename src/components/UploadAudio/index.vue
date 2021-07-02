<template>
  <div class="upload-audio">
    <!-- <van-button @click="startRecord">开始录音</van-button> -->
    <div v-if="value.length > 0" class="audio-area" style="margin-bottom: 15px">
      <audio ref="audio" :src="url + '/' + value[0]" controls style="width: 70%"></audio>
      <div class="del">
        <van-icon name="clear" @click.stop.prevent="deleteAudio"></van-icon>
      </div>
    </div>
    <van-button v-if="value.length == 0" plain type="info" icon="volume" round block @click.stop.prevent="startRecord"
      >点击 开始录音</van-button
    >
    <van-dialog
      v-model="showDialog"
      title="录音中"
      :overlay-style="{ 'border-radius': '2px' }"
      get-container="body"
      :close-on-click-overlay="false"
      confirm-button-text="结束录音"
      @closed="stopRecord"
    >
      <div class="record-time">{{ formatTime }}</div>
    </van-dialog>
  </div>
</template>
<script>
import { uploadFile } from '@/api/common'
import Recorderx, { ENCODE_TYPE } from 'recorderx'
import config from '@/config'

export default {
  name: 'UploadAudio',
  props: {
    value: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      recorder: null,
      showDialog: false,
      recordTimer: null,
      recordTime: 0,
      url: config.asset
    }
  },
  computed: {
    formatTime() {
      const min = Math.floor(this.recordTime / 60)
      const sec = this.recordTime - min * 60
      return `${(min < 10 ? '0' : '') + min}:${sec < 10 ? '0' : ''}${sec}`
    }
  },
  mounted() {},
  created() {},
  methods: {
    startRecord() {
      this.showDialog = true
      this.recordTime = 0
      this.recorder = new Recorderx()
      this.$nextTick(() => {
        this.recorder
          .start()
          .then(res => {
            this.recordTimer = setInterval(() => {
              this.recordTime++
              console.log(this.recordTime)
            }, 1000)
          })
          .catch(error => {
            console.log('Recording failed.', error)
          })
      })
    },
    stopRecord() {
      console.log(this.recordTime)
      this.showDialog = false
      this.recorder.pause()
      clearInterval(this.recordTimer)
      const wav = this.recorder.getRecord({
        encodeTo: ENCODE_TYPE.WAV
      })
      // const wav = this.recorder.getRecord()
      this.upload(wav)
    },
    deleteAudio() {
      this.$emit('input', [])
    },
    // 上传音频
    upload(wav) {
      console.log(wav, 'wav')
      const formData = new window.FormData()
      formData.append('audios', wav)
      uploadFile(formData)
        .then(async res => {
          if (res.code === 200) {
            this.$emit('input', res.data.audios)
          } else {
            this.$toast('上传失败')
          }
        })
        .catch(err => {
          console.log(err, 'err')
        })
    }
  }
}
</script>

<style scoped lang="scss">
.audio-area {
  margin: 10px 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  audio {
    flex-grow: 1;
  }
  > .del {
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 30px;
  }
}
.record-time {
  text-align: center;
}
</style>
