import Vue from 'vue'
import VueRouter from 'vue-router'
import constantRoutes from './routers'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: constantRoutes
})

router.beforeEach((to, from, next) => {
	next()
})

export default router
