<template>
  <van-popup v-model="showCategory" position="bottom" :style="{ height: '500px' }" get-container="body">
    <van-field placeholder="搜索案件分类" left-icon="search" :border="false"> </van-field>
    <van-picker
      show-toolbar
      :columns="eventTypes"
      value-key="name"
      :visible-item-count="8"
      :swipe-duration="500"
      @cancel="$emit('close')"
      @confirm="sureEventTypes"
      cancel-button-text="取消"
      confirm-button-text="确定"
    >
      <template #option="item">
        <p style="text-align: center"><span v-if="item.type == 2">*&nbsp;</span>{{ item.name }}</p>
      </template>
    </van-picker>
  </van-popup>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'EventTypes',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    showCategory: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(['eventTypes'])
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    sureEventTypes(val) {
      this.$emit('close')
      this.$emit('confirm', val)
    }
  }
}
</script>

<style scoped lang="scss"></style>
