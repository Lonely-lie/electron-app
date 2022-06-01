const { app, BrowserWindow, session } = require('electron')
const log = require('electron-log');
const path = require("path")
const base = require('./init')
const fs = require('fs');


base.log.logInit(log, app)
log.info('资源目录-----------------', base.resourcePath)
const resourcePath = base.resourcePath
// 创建窗口
const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			preload: null // path.join(__dirname, 'preload.js')
		}
	})
	if (base.config.sys.dev) {
		win.webContents.openDevTools()
		let extensionPath = 'C:/pts/6.1.4_0'
		if (fs.existsSync(extensionPath)) {
			session.defaultSession.loadExtension(
				path.join(extensionPath),
				{ allowFileAccess: true }
			)
		}
	}

	let Face = require('./services/face/index.js')
	require('./listen.js')(base.config)
	let faceObj = new Face(resourcePath, log, base.config)
	faceObj.init()
	win.webContents.openDevTools()
	win.loadURL(base.url)
}

app.whenReady().then(() => {
	createWindow()
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})
