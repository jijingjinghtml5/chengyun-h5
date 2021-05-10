<template>
  <van-nav-bar
    :title="title || pageTitle"
    :fixed="true"
    :left-arrow="showBack"
    @click-left="onClickLeft"
    class="common-header"
  >
    <!-- <template #left>
      <van-icon name="arrow-left" size="22" />
    </template> -->
  </van-nav-bar>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    title: {
      type: String,
      default: ''
    },
    showBack: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  computed: {
    pageTitle() {
      return this.$route.meta.title
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.common-header {
  height: 44px;
  background: $theme-color;
  ::v-deep {
    .van-nav-bar__title {
      color: #ffffff;
      font-size: 16px;
      font-weight: normal;
    }
    .van-icon {
      color: #fff;
    }
  }
}
</style>
