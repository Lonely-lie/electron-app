<template>
	<el-container class="app-container" direction="vertical">
		<appHeader class="app-header"></appHeader>
		<el-container class="main">
			<appAside class="app-aside"></appAside>
			<appMain class="app-main"></appMain>
		</el-container>
	</el-container>
</template>

<script>
import appAside from './components/app_aside'
import appHeader from './components/app_header'
import appMain from './components/app_main'
export default {
	components: { appAside, appHeader, appMain }
}
</script>

<style scoped lang="less">
.app-container {
	height: 100%;
	width: 100%;
	.app-header {
		height: 60px;
		overflow: hidden;
	}
	.main {
		height: calc(100% - 60px);
	}
}
</style>
