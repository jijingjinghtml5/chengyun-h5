import preventReClick from './preventReClick'

const install = Vue => {
  Vue.directive('preventReClick', preventReClick)
}

preventReClick.install = install
export default preventReClick
