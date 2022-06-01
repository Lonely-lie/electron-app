// import api from '../../view/api'
// data
const state = () => ({
	config: {}
})
// 计算属性
const getters = {
	config: (state) => state.config
}
// methods 同步
const mutations = {
	setConfig(state, config) {
		state.config = config
	}
}
// methods 异步
const actions = {
	async setConfig({ commit, rootState, rootGetters, getters, dispatch }, { data }) {
		// rootGetters['moduleA/product']
		// dispatch('testAction2') // -> 'user/testAction2' 局部
		// 如果要调用别的模块的action，使用{root:true}
		// dispatch('moduleA/testAction2', null, { root: true }) // -> 'testAction2'
		commit('setConfig', data)
		return data
	}
}
export default { state, getters, mutations, actions }
