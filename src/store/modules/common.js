const state = {
  eventTypes: []
}
const mutations = {
  SET_EVENT_TYPES(state, eventTypes) {
    state.eventTypes = eventTypes
  }
}
const actions = {
  // 设置userinfo
  setEventTypes({ commit }, eventTypes) {
    commit('SET_EVENT_TYPES', eventTypes)
  }
}
export default {
  state,
  mutations,
  actions
}
