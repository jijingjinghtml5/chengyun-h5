const state = {
  eventTypesNew: [], // 完整的案件分类
  eventTypes: [] // 只有三层的案件分类
}

// 对于多层级的案件分类。只取3层，最后一层作为案件名称
const handleCate = cate => {
  if (!cate || !cate.length) return []
  const newCate = cate.map(child => {
    if (child.level === 2) {
      return { ...child, children: false }
    }
    return { ...child, children: handleCate(child.children) }
  })

  return newCate
}

const mutations = {
  SET_EVENT_TYPES(state, eventTypesNew) {
    state.eventTypesNew = eventTypesNew
    const eventTypes = handleCate(eventTypesNew)
    state.eventTypes = eventTypes
  }
}
const actions = {
  // 设置分类
  setEventTypes({ commit }, eventTypesNew) {
    commit('SET_EVENT_TYPES', eventTypesNew)
  }
}
export default {
  state,
  mutations,
  actions
}
