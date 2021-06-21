<template>
  <!-- :style="'height:' + height + 'px'" -->
  <div class="cd-map">
    <iframe
      width="100%"
      :src="'https://map.wx.shdata.com/CGGisShare/GisShareApp3D.html?t=' + Math.random()"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      style="height: 100%"
      marginwidth="0"
    ></iframe>
    <div class="map-btn plus-btn" @click="zoomIn">
      <span>+</span>
    </div>
    <div class="map-btn reduce-btn" @click="zoomOut">
      <span>-</span>
    </div>
    <div class="center" v-if="isCenter">
      <van-icon name="location" color="#1989fa" size="30"></van-icon>
    </div>
  </div>
</template>
<script>
// GPStoSH
import { SHtoGPS } from '@/utils'
import { Toast } from 'vant'

export default {
  name: 'CdMap',
  props: {
    isCenter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searching: false,
      itemList: [
        { type: '公共设施', name: '上水井盖', layer: '上水井盖' },
        { type: '公共设施', name: '污水井盖', layer: '污水井盖' },
        { type: '公共设施', name: '雨水井盖', layer: '雨水井盖' },
        { type: '公共设施', name: '雨水篦子', layer: '雨水篦子' },
        { type: '公共设施', name: '电力井盖', layer: '电力井盖' },
        { type: '公共设施', name: '路灯井盖', layer: '路灯井盖' },
        { type: '公共设施', name: '电信井盖', layer: '电信井盖' },
        { type: '公共设施', name: '有线电视井盖', layer: '有线电视井盖' },
        { type: '公共设施', name: '网络井盖', layer: '网络井盖' },
        { type: '公共设施', name: '热力井盖', layer: '热力井盖' },
        { type: '公共设施', name: '燃气井盖', layer: '燃气井盖' },
        { type: '公共设施', name: '公安井盖', layer: '公安井盖' },
        { type: '公共设施', name: '消防井盖', layer: '消防井盖' },
        { type: '公共设施', name: '其它井盖', layer: '其它井盖' },
        { type: '公共设施', name: '信息交接箱', layer: '信息交接箱' },
        { type: '公共设施', name: '电力设施（设备）', layer: '电力设施设备' },
        { type: '公共设施', name: '电力杆', layer: '电力杆' },
        { type: '公共设施', name: '路灯', layer: '路灯' },
        { type: '公共设施', name: '消火栓', layer: '消火栓' },
        { type: '公共设施', name: '书报亭', layer: '书报亭' },
        { type: '公共设施', name: '电话亭', layer: '电话亭' },
        { type: '公共设施', name: '邮筒', layer: '邮筒' },
        { type: '公共设施', name: '信息亭', layer: '信息亭' },
        { type: '公共设施', name: '自动售货亭（站）', layer: '自动售货亭站' },
        { type: '公共设施', name: '健身设施', layer: '健身设施' },
        { type: '公共设施', name: '环卫井盖', layer: '环卫井盖' },
        { type: '公共设施', name: '移动井盖', layer: '移动井盖' },
        { type: '公共设施', name: '信息井盖', layer: '信息井盖' },
        { type: '公共设施', name: '联通井盖', layer: '联通井盖' },
        { type: '公共设施', name: '铁通井盖', layer: '铁通井盖' },
        { type: '公共设施', name: '网通井盖', layer: '网通井盖' },
        { type: '公共设施', name: '电信立杆', layer: '电信立杆' },
        { type: '公共设施', name: '市政立杆', layer: '市政立杆' },
        { type: '公共设施', name: '有线电视立杆', layer: '有线电视立杆' },
        { type: '公共设施', name: '其他立杆', layer: '其他立杆' },
        { type: '公共设施', name: '福利彩票亭', layer: '福利彩票亭' },
        { type: '公共设施', name: '体育彩票亭', layer: '体育彩票亭' },
        { type: '公共设施', name: '治安亭', layer: '治安亭' },
        { type: '公共设施', name: '景观灯光设施', layer: '景观灯光设施' },
        { type: '公共设施', name: '防汛墙', layer: '防汛墙' },
        { type: '公共设施', name: '晒衣架', layer: '晒衣架' },
        { type: '公共设施', name: '民用水井', layer: '民用水井' },
        { type: '公共设施', name: '燃气调压站', layer: '燃气调压站' },
        { type: '公共设施', name: '宣传栏（亭）', layer: '宣传栏亭' },
        { type: '公共设施', name: '综合杆', layer: '综合杆' },
        { type: '公共设施', name: '综合井盖', layer: '综合井盖' },
        { type: '道路交通', name: '公共交通站牌', layer: '公共交通站牌' },
        {
          type: '道路交通',
          name: '道路停车场计费表',
          layer: '道路停车场计费表'
        },
        { type: '道路交通', name: '公共交通站亭', layer: '公共交通站亭' },
        { type: '道路交通', name: '出租车扬招牌', layer: '出租车扬招牌' },
        { type: '道路交通', name: '人行天桥', layer: '人行天桥' },
        { type: '道路交通', name: '交通信息亭', layer: '交通信息亭' },
        { type: '道路交通', name: '门牌', layer: '门牌' },
        { type: '道路交通', name: '桥梁', layer: '桥梁' },
        { type: '道路交通', name: '道路指示牌', layer: '道路指示牌' },
        { type: '道路交通', name: '交通控制箱', layer: '交通控制箱' },
        { type: '道路交通', name: '交通立杆', layer: '交通立杆' },
        {
          type: '道路交通',
          name: '非机动车停放点（亭）',
          layer: '非机动车停放点亭'
        },
        { type: '道路交通', name: '路名牌', layer: '路名牌' },
        { type: '道路交通', name: '公交拉杆', layer: '公交拉杆' },
        { type: '道路交通', name: '人行分隔设施', layer: '人行分隔设施' },
        { type: '道路交通', name: '机非分隔设施', layer: '机非分隔设施' },
        { type: '道路交通', name: '路中分隔设施', layer: '路中分隔设施' },
        { type: '道路交通', name: '河道护栏', layer: '河道护栏' },
        { type: '道路交通', name: '绿地护栏', layer: '绿地护栏' },
        { type: '道路交通', name: '交通信号灯', layer: '交通信号灯' },
        { type: '道路交通', name: '无障碍标牌', layer: '无障碍标牌' },
        { type: '道路交通', name: '无障碍设施', layer: '无障碍设施' },
        { type: '道路交通', name: '桥孔道班房', layer: '桥孔道班房' },
        { type: '道路交通', name: '桥孔停车场', layer: '桥孔停车场' },
        {
          type: '道路交通',
          name: '桥孔禁入栅（安全护栏）',
          layer: '桥孔禁入栅安全护栏'
        },
        { type: '道路交通', name: '桥孔检查井', layer: '桥孔检查井' },
        { type: '环卫环保', name: '公共厕所', layer: '公共厕所' },
        { type: '环卫环保', name: '倒粪站（小便池）', layer: '倒粪站小便池' },
        { type: '环卫环保', name: '公厕导向牌', layer: '公厕导向牌' },
        { type: '环卫环保', name: '垃圾箱房', layer: '垃圾箱房' },
        { type: '环卫环保', name: '废物箱（桶）', layer: '废物箱桶' },
        { type: '环卫环保', name: '交通噪声指示牌', layer: '交通噪声指示牌' },
        { type: '园林绿化', name: '行道树', layer: '行道树' },
        { type: '园林绿化', name: '单位绿化', layer: '单位绿化' },
        { type: '园林绿化', name: '花架花钵', layer: '花架花钵' },
        { type: '园林绿化', name: '小区绿化', layer: '小区绿化' },
        { type: '园林绿化', name: '雕塑', layer: '雕塑' },
        { type: '园林绿化', name: '街头座椅', layer: '街头座椅' },
        { type: '园林绿化', name: '公共绿地', layer: '公共绿地' },
        { type: '园林绿化', name: '河道绿化', layer: '河道绿化' },
        { type: '其它设施', name: '重大危险源', layer: '重大危险源' },
        { type: '其它设施', name: '优秀历史建筑', layer: '优秀历史建筑' }
      ]
    }
  },
  methods: {
    // 放大
    zoomIn() {
      window.mapLevelCallback = level => {
        const _l = parseInt(level)
        if (_l >= 13) {
          return false
        }
        window.ZoomIn(_l + 1)
      }
      window.doOnMapLevel()
    },
    // 缩小
    zoomOut() {
      window.mapLevelCallback = level => {
        const _l = parseInt(level)
        if (_l <= 1) {
          return false
        }
        window.ZoomOut(_l - 1)
      }
      window.doOnMapLevel()
    },
    // 放大缩小指定层级
    zoomTo(level) {
      let _l = level
      if (level <= 1) {
        _l = 1
      }
      if (level > 13) {
        _l = 13
      }
      window.ZoomOut(_l)
    },
    // 获得中心（xy）
    getCenter() {
      window.mapCenterCallback = data => {
        const _d = JSON.parse(data)
        this.$emit('get-center', _d)
      }
      window.doOnMapCenter()
    },

    // 查询部件（xy）
    addItemByXY(x, y, layername, isDraw = true) {
      let timer = 100
      if (this.searching) {
        return
      }
      window.queryByGeometryAndLayer = list => {
        if (!this.searching) {
          return
        }
        clearTimeout(timer)
        Toast.clear()
        this.searching = false
        this.toShowUnitList(list || [])
      }
      const radius = 12 // 米
      const xy = SHtoGPS([x, y])
      const _l = this.itemList.find(item => {
        return item.name == layername
      })
      if (!_l) {
        // this.$toast('部件不存在')
        Toast.fail('部件不存在')
        return
      }
      Toast({ message: '搜索部件...', duration: 5000 })
      this.searching = true
      window.doOnQueryByPoint(xy[0], xy[1], _l.layer, radius, isDraw)
      timer = setTimeout(() => {
        this.$toast('未搜索到部件')
        this.searching = false
      }, 5000)
    },
    // 显示搜索部件
    toShowUnitList(list) {
      console.log('search item', list)
      if (list.length == 0) {
        this.unitAddress = '-'
      }
      const sortFunc = (a, b) => {
        const _d1 = Math.sqrt(
          Math.pow(Math.abs(this.tempX - parseFloat(a['坐标X'])), 2) +
            Math.pow(Math.abs(this.tempY - parseFloat(a['坐标Y'])), 2)
        )
        const _d2 = Math.sqrt(
          Math.pow(Math.abs(this.tempX - parseFloat(b['坐标X'])), 2) +
            Math.pow(Math.abs(this.tempY - parseFloat(b['坐标Y'])), 2)
        )
        return _d1 - _d2
      }
      const _l = list.sort(sortFunc)
      this.list = _l.slice(0, 5)
      this.list.push({
        标识码: '0'
      })
      console.log(this.list, 'this.list')
      this.$emit('get-unit-list', this.list)
      // this.toConfirmItem(this.list[0])
    },
    // 获得位置信息（84）
    getAddressByGPS(lng, lat, callback = 'get-address') {
      const _self = this
      window.addressdataCallback = address => {
        /** 因为城地并发情况下经常会返回 南京西路 170号 国际饭店，所以，把非黄浦区的账号，这个地址干掉 */
        const user = JSON.parse(localStorage.getItem('userinfo'))
        console.log(address, '城地返回的地址信息，做南京西路特殊判断')
        if (address && address[0] === '南京西路 170号 国际饭店' && user && user.district && user.district != '黄浦区') {
          address = ''
        }
        _self.$emit(callback, address, lng, lat)
      }
      window.doOnLocationforAddress(lng, lat)
    },
    // 部件图层（区/街道）
    addItemByLayer(layername, type, name, isShow, isFocus) {
      const _l = this.itemList.find(item => {
        return item.name == layername
      })
      if (!_l) {
        Toast('部件不存在1')
        return
      }
      console.log(_l.layer, `${type}`, name, isFocus, isShow)
      window.doOpenFeatureLayerByNameandWhere(_l.layer, `${type}`, name, isFocus, isShow)
    }
  },
  mounted() {
    // 地图加载完成
    window.maploadCallback = () => {
      // 初始化完成
      this.$emit('loaded')
    }
    // 地图大小改变
    window.resizeCallback = () => {
      console.log('resize', this.isResize)
      // 缩放
      if (this.isResize) return
      // 移动
      console.log('map moveend')
      this.getCenter()
      this.isResize = true
    }
    window.mapAnimationInProgressCallback = () => {
      // if(!_self.isResize) {
      //   return
      // }
      // console.log('resize')
      // _self.$emit('resize')
      // _self.isResize = true
    }
    window.mapDragingCallback = () => {
      // console.log('mapDragingCallback')
      this.isResize = false
    }
  }
}
</script>

<style scoped lang="scss">
.cd-map {
  height: 100%;
  position: relative;
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
    &.plus-btn {
      right: 10px;
      top: 160px;
    }
    &.reduce-btn {
      right: 10px;
      top: 210px;
    }
    span {
      font-size: 26px;
    }
  }
  .center {
    position: absolute;
    width: 30px;
    height: 30px;
    line-height: 30px;
    left: 50%;
    top: 50%;
    line-height: 0;
    transform: translate(-50%, -100%);
  }
}
</style>
