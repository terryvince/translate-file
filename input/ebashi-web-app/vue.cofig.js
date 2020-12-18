const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

let stylePath = path.resolve(__dirname, 'assets/css/utils.less')
module.exports = {
	lintOnSave: process.env.NODE_ENV !== 'production',
	// css: {
	// 		loaderOptions: {
	// 			less: {
	// 				// additionalData: `@import "~@/assets/css/utils.less";`,
	// 				// additionalData: (content, loaderContext) => {
	// 				// 	const { resourcePath, rootContext } = loaderContext;
	// 				// 	const relativePath = path.relative(rootContext, resourcePath);
	// 				// 	console.log('less options1:',content)
	// 				// 	return `@import "~@/assets/css/utils.less";` + content;
	// 				// },
	// 				globalVars:{
	// 					"hack": `true; @import "${stylePath}"`,
	// 					"primary":'blue'
	// 				}
	// 			}
	// 		}
	// },
	// chainWebpack: config =>{
	// 	config.module.rule('less').use('less-loader').loader('less-loader').tap(options=>{
	// 		options.additionalData = `@import "~@/assets/css/utils.less";`
	// 		return options
	// 	})
	// 	return config
	// },
	// pluginOptions: {
	//       'style-resources-loader': {
	//         preProcessor: 'less',
	//         patterns: [path.resolve(__dirname, "assets/css/utils.less")] // 引入全局样式变量
	//       }
	// },
	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([{ 
				from: path.join(__dirname, '/subpackage/static'),
				to: path.join(__dirname + '/unpackage/', 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev',
					process.env.UNI_PLATFORM, '/')
			}])
		],
	}
}
