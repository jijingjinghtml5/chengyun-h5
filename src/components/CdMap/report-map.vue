<template>
  <!-- :style="'height:' + height + 'px'" -->
  <div class="report-map" v-show="visible">
    <!-- 案件地址搜索 -->
    <van-search
      class="search-input"
      background="#0044c6"
      v-model="searchAddress"
      show-action
      placeholder="请输入搜索关键词"
    >
      <div slot="action" @click="searchByKeyWord" style="color: #fff">搜索</div>
    </van-search>
    <!-- 右上角返回按钮 -->
    <div class="map-btn back-map" @click="toClose">
      <van-icon name="arrow"></van-icon>
    </div>
    <!-- 如果是部件需要展示区/街道 -->
    <div class="street-select" v-if="currentCaseType[0] == '部件'">
      {{ street.name }}
    </div>
    <!-- 地图组件 -->
    <CdMap
      ref="cdMap"
      :is-center="true"
      @loaded="mapLoad"
      @get-address="getAddress"
      @get-center="toSearchUnitOrAddress"
      @get-unit-list="getUnitList"
    ></CdMap>
    <div class="bottom-info">
      <!-- 事件类的地址 -->
      <ul class="list list2" v-if="chooseAddress && currentCaseType[0] == '事件'">
        <li class="select" @click.stop="showAddress(chooseAddress)">
          <van-icon name="success" color="#0044c6" style="margin-right: 5px"></van-icon>
          <span style="line-height: 1">{{ chooseAddress.address }}</span>
          <van-icon
            name="arrow-up"
            class="icon-arrow"
            v-if="!detailLoading && chooseAddress.address"
            @click.stop="showAddressDetail(chooseAddress)"
            color="#0044c6"
          ></van-icon>
          <van-loading class="icon-arrow" color="#0044c6" v-if="detailLoading" />
        </li>
      </ul>
      <!-- 部件类的地址 -->
      <div class="address-info" v-if="currentCaseType[0] == '部件'">
        <div class="van-ellipsis" :title="chooseAddress.address">
          {{ chooseAddress.address }}
          <van-icon
            name="arrow-up"
            class="icon-arrow icon-arrow-unit"
            v-if="!detailLoading"
            color="#0044c6"
            @click.stop="showAddressDetail({ ...chooseAddress, ...unit })"
          ></van-icon>
          <van-loading class="icon-arrow icon-arrow-unit" color="#0044c6" style="top: 0px" v-if="detailLoading" />
        </div>
      </div>
      <!-- 部件列表 -->
      <ul class="list list2" v-if="list.length && currentCaseType[0] == '部件'">
        <li
          :class="unit && item['标识码'] == unit.id ? 'select' : ''"
          v-for="(item, index) in list"
          :key="index"
          @click.stop="chooseUnit(item)"
        >
          <van-icon name="success" color="#0044c6" style="margin-right: 5px"></van-icon>
          <span style="line-height: 1">
            {{ currentCaseType[2] }}-{{ item['标识码'] == '0' ? '地图未显示' : item['标识码'] }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import CdMap from '@/components/CdMap/index'
// GPStoSH,
import { SHtoGPS } from '@/utils'

export default {
  name: 'ReportMap',
  props: {
    currentCaseType: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CdMap
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.init()
      }
    }
  },
  data() {
    return {
      street: '', // 当前区
      unit: null, // 选择部件
      itemType: 1,
      searchAddress: '',
      list: [],
      detailLoading: false,
      chooseAddress: {}
    }
  },
  methods: {
    // 地图初始化完成
    mapLoad() {
      this.$emit('loaded')
      this.init()
    },
    // 通过关键字搜索位置
    searchByKeyWord() {},
    // 获取地址
    getAddress(address, lng, lat) {
      if (!address) {
        this.$toast('未获得地址')
      }
      this.chooseAddress = {
        address: (address && address[0] && address[0].trim()) || '',
        lng,
        lat
      }
    },
    // 返回搜索部件列表
    getUnitList(list) {
      this.list = list
    },
    // 选择案件地址
    showAddress(chooseAddress) {
      this.$emit('close', chooseAddress)
    },
    // 右上角关闭地图
    toClose() {
      this.$emit('close', this.chooseAddress)
    },
    // 展示地址的具体信息
    showAddressDetail() {
      console.log('展示位置信息')
    },
    // 搜索部件（中心点）
    toSearchUnitOrAddress(center) {
      // 获得周边部件
      if (this.currentCaseType[0] == '部件') {
        this.$refs.cdMap.addItemByXY(center.x, center.y, this.currentCaseType[2], false)
      }
      // 获得中心地址
      const xy = SHtoGPS([center.x, center.y])
      this.$refs.cdMap.getAddressByGPS(xy[0], xy[1])
    },
    // 初始化
    init() {
      if (this.currentCaseType[0] == '部件') {
        this.$refs.cdMap.addItemByLayer(this.currentCaseType[2], this.itemType, this.street.name, true, false)
        this.layer = {
          layer: this.currentCaseType[2],
          type: this.itemType,
          name: this.street.name
        }
      }
      this.$refs.cdMap.zoomTo(7)
    },
    // 当前街道初始化
    async streetInit() {
      // Grid
      // TODO 分上报员 街道管理员 区管理员
      const user = JSON.parse(localStorage.getItem('userInfo'))
      if (user.level == 2 || user.level == 4) {
        // 街道
        this.itemType = 1
        this.street = { name: user.street_name, code: user.street }
      }
      if (user.level == 1 || user.level == 3) {
        // 区
        this.itemType = 2
        this.street = { name: user.district, code: user.district_id }
      }
      if (user.level == 0 || user.level == 6) {
        // 市
        // const result = await DictApi.getPositionInfo({
        //   lng: this.location.lng,
        //   lat: this.location.lat
        // })
        // if (result.data) {
        //   this.itemType = 2
        //   this.street = {
        //     name: result.data['区县名称'],
        //     code: result.data['区代码']
        //   }
        // }
      }
    },
    // 选择部件
    chooseUnit(item) {
      this.unit = {
        id: item['标识码']
      }
    }
  },
  mounted() {
    this.streetInit()
  }
}
</script>

<style scoped lang="scss">
.report-map {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: #fff;
  .search-input {
    width: 100%;
    height: 44px;
  }
  .map-btn {
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    background-color: #fff;
    // color: #1989fa;
    color: #ccc;
    border-radius: 2px;
    box-shadow: 0 0 8px -2px rgba(0, 0, 0, 0.5);
    &.back-map {
      z-index: 999;
      right: 10px;
      top: 50px;
      font-size: 16px;
    }
    span {
      font-size: 26px;
    }
  }
  .street-select {
    position: absolute;
    top: 50px;
    left: 10px;
    z-index: 999;
    background-color: #fff;
    padding: 10px 20px;
    font-size: 14px;
  }
  .bottom-info {
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 999;
    .address-info {
      height: 44px;
      line-height: 44px;
      margin: 0 5px;
      background-color: #fff;
      font-size: 14px;
      border-radius: 50px;
      margin-bottom: 5px;
      padding: 0 10px;
      box-shadow: 0 0 8px -2px rgba(0, 0, 0, 0.5);
      .van-ellipsis {
        position: relative;
        .icon-arrow {
          margin-left: auto;
          font-size: 20px;
          // padding:10px;
          &.icon-arrow-unit {
            width: 40px;
            height: 44px;
            line-height: 44px;
            position: absolute;
            right: 10px;
            text-align: right;
          }
        }
      }
    }
    .list {
      padding: 0 15px;
      // width: 100%;
      font-size: 14px;
      background-color: #fff;
      box-sizing: border-box;
      min-height: 40px;
      &:before {
        position: absolute;
        box-sizing: border-box;
        content: ' ';
        pointer-events: none;
        left: 0;
        right: 0;
        top: 0;
        border-bottom: 1px solid #ebedf0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
      li {
        padding: 15px 0;
        position: relative;
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        &:not(:last-child) {
          &:after {
            position: absolute;
            box-sizing: border-box;
            content: ' ';
            pointer-events: none;
            left: 0;
            right: 0;
            bottom: 0;
            border-bottom: 1px solid #ebedf0;
            -webkit-transform: scaleY(0.5);
            transform: scaleY(0.5);
          }
        }
        i {
          opacity: 0;
        }
        &.select {
          color: #0044c6;
          i {
            opacity: 1;
          }
        }
        .icon-arrow {
          margin-left: auto;
          font-size: 20px;
          position: absolute;
          right: -15px;
          width: 50px;
          height: 100%;
          text-align: center;
          z-index: 999;
          // padding:10px;
          &::before {
            position: absolute;
            top: 50%;
            margin-top: -10px;
            left: 50%;
            margin-left: -10px;
          }
        }
      }
      &.list2 {
        li {
          padding-right: 35px;
        }
      }
    }
  }
}
</style>
