const state = {
  userInfo: {}
}
const mutations = {
  SET_USER_INFO(state, info) {
    state.userInfo = info
  }
}
const actions = {
  // 设置userinfo
  setUserInfo({ commit }, info) {
    localStorage.setItem('userInfo', JSON.stringify(info))
    commit('SET_USER_INFO', info)
  }
}
export default {
  state,
  mutations,
  actions
}
