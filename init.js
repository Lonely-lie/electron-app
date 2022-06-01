const { app, BrowserWindow } = require('electron')
const path = require('path')
const fs = require("fs")

let resource;
let basePath = process.cwd()
let url = null
let config;
// 路径
if (!app.isPackaged) {
	resource = path.join(basePath, `resource`)
	url = `http://localhost:9999`
} else {
	// 为生产环境
	basePath = path.dirname(app.getPath('exe'))
	resource = path.join(basePath, `/resources/resource`)
	url = `file://${__dirname}/vue-build/index.html`
}
initConfig() // 配置文件初始化

// log对象
const log = {
	formatDate(date) {
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? '0' + m : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		return y + '-' + m + '-' + d;
	},
	// 创建日志目录
	logInit(log, app) {
		let appPath = process.cwd()
		if (config.sys.useLog) {
			log.transports.console.level = true; //关闭控制台日志,默认是开启的
			log.transports.file.maxSize = 5 * 1024 * 1024
			// 为开发环境
			if (!app.isPackaged) {
				logPath = path.join(appPath, `/electronLog//${this.formatDate(new Date)}.log`)
			} else {
				// 为生产环境
				logPath = path.join(appPath, `/electronLog//${this.formatDate(new Date)}.log`)
			}
			log.transports.file.file = logPath
			log.info('日志初始化成功----------------------------ok')
		} else {
			log.info('日志初始化失败--------------------------fail')
		}
		log.info('配置清单config-----------------------', config);
	},
}
// 配置文件初始化
function initConfig() {
	config = JSON.parse(fs.readFileSync(path.join(resource, "config.json")))
	let localConfig = {}
	// 判断本地是否存在配置文件,是则覆盖合并
	if (fs.existsSync("C://pts//config.json")) {
		localConfig = JSON.parse(fs.readFileSync("C://pts//config.json"))
		Object.assign(config, localConfig)
	} else {
		if (!fs.existsSync("C://pts")) {
			fs.mkdirSync("C://pts")
		}
	}
}
exports.resourcePath = resource
exports.log = log
exports.url = url
exports.config = config


