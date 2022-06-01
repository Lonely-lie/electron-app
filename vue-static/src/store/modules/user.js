import api from '../../view/api'
// data
const state = () => ({
	accessToken: '529451fa-c32e-4fc7-90a7-4bc1c5a7c7cf',
	accessUser: ''
})
// 计算属性
const getters = {
	accessToken: (state) => state.accessToken,
	accessUser: (state) => state.accessUser
}
// methods 同步
const mutations = {
	setAccessToken(state, token) {
		state.accessToken = token
	},
	setAccessUser(state, data) {
		state.accessUser = data
	}
}
// methods 异步
const actions = {
	async testAction({ commit, rootState, rootGetters, getters, dispatch }, { data }) {
		// rootGetters['moduleA/product']
		// dispatch('testAction2') // -> 'user/testAction2' 局部
		// 如果要调用别的模块的action，使用{root:true}
		// dispatch('moduleA/testAction2', null, { root: true }) // -> 'testAction2'
		return null
	}
}
export default { state, getters, mutations, actions }
