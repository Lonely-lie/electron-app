
const { ipcMain } = require('electron')
function listen(config) {
	// 读取配置文件
	ipcMain.on('read-config', (event, arg) => {
		event.reply('get-config', config)
	})
}
module.exports = listen;
