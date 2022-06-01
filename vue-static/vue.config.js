const { publicPath, assetsDir, outputDir, lintOnSave, devPort, isSourceMap } = require('./src/config')
const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
	// webpack: output.publicPath
	publicPath: publicPath,
	// webpack: output.path
	outputDir: outputDir,
	// 静态文件目录（相对outputDir）
	assetsDir: assetsDir,
	// 文件名哈希
	filenameHashing: true,
	// eslint-loader 是否在保存的时候检查
	lintOnSave: lintOnSave,
	// 资源地图,方便开发查看语句准确位置
	productionSourceMap: isSourceMap,
	css: {
		// 非*.module.[ext]也可以视为css modules模块
		requireModuleExtension: true,
		// 是否提取css,默认就好
		// extract: false,
		// 是否为 CSS 开启 source map
		sourceMap: false,
		loaderOptions: {
			css: {
				// 这里的选项会传递给 css-loader
				// modules: {
				// 	localIdentName: '[local]_[hash:base64:8]aa'
				// }
			}
		}
	},
	configureWebpack: (config) => {
		config.resolve.alias['@common'] = resolve('/src/common')
		config.resolve.alias['@store'] = resolve('/src/store')
		config.resolve.alias['@electronServe'] = resolve('/src/electronServe')
		config.resolve.alias['@serve'] = resolve('/src/common/serve')
		config.resolve.alias['@tools'] = resolve('/src/common/tools')
		// 	if (process.env.NODE_ENV === 'production') {
		// 		// 为生产环境修改配置...
		// 	} else {
		// 		// 为开发环境修改配置...
		// 	}
	},
	chainWebpack: (config) => {},
	devServer: {
		host: '0.0.0.0',
		port: devPort,
		proxy: {
			'/express': {
				target: 'http://127.0.0.1:3000/',
				changeOrigin: true,
				pathRewrite: {
					'^/express': '/'
				}
			}
		}
	}
}
