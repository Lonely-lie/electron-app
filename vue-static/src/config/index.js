/**
 * @description 3个子配置，通用配置|网络配置导出
 */
const setting = require('./setting.config')
const network = require('./net.config')
module.exports = Object.assign({}, setting, network)
