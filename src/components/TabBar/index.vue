<template>
  <div>
    <van-tabbar fixed route v-model="active" @change="handleChange">
      <van-tabbar-item v-for="(item, index) in tabbars" :to="item.to" :icon="item.icon" :key="index">
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'TabBar',
  props: {
    defaultActive: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      active: this.defaultActive,
      tabbars: [
        {
          title: '工作台',
          to: {
            name: 'Home'
          },
          icon: 'home-o'
        },
        {
          title: '我',
          to: {
            name: 'My'
          },
          icon: 'user-o'
        }
      ]
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
