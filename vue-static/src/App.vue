<template>
	<div id="app">
		<router-view v-if="isRouterAlive" />
	</div>
</template>

<script>
export default {
	name: 'App',
	provide() {
		return {
			reload: this.reload
		}
	},
	data() {
		return {
			isRouterAlive: true
		}
	},
	methods: {
		reload() {
			this.isRouterAlive = false
			this.$nextTick(() => {
				this.isRouterAlive = true
			})
		}
	}
}
</script>
<style>
@import '~@/common/assets/css/global.less';
@import '~@/common/assets/css/reset.less';
html,
body,
#app {
	height: 100%;
	margin: 0;
	padding: 0;
	background: #ebeff5;
}

* {
	padding: 0;
	margin: 0;
}
</style>
