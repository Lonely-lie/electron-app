/**
 * @description 导出默认通用配置
 */
const setting = {
	// 开发以及部署时的URL
	publicPath: '',
	// 生产环境构建文件的目录名
	outputDir: '../vue-build',
	// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	assetsDir: 'public',
	// true/warning,lint错误->编译警告;error/default,lint警告/lint错误->编译错误
	lintOnSave: true,
	// 进行编译的依赖
	transpileDependencies: [],
	//标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
	title: '监控平台',
	homeName: 'monitor',
	//是否开启登录拦截
	loginInterception: true,
	//开发环境端口号
	devPort: '9999',
	//是否显示顶部进度条
	progressBar: true,
	//缓存路由的最大数量
	keepAliveMaxNum: 10,
	// 是否开启资源地图
	isSourceMap: true
}
module.exports = setting
