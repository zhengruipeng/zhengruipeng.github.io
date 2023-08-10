const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	entry:{
		main:'./src/main.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].bundle.js',
		publicPath:''
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				use:{loader:'babel-loader'}
			},
			{
				test:/\.(png|jpg|jpeg|gif)$/,
				use:[
					// {loader:'url-loader'},
					{loader:'file-loader'}
				]
			},
			{
				test:/\.vue$/,
				use:{loader:'vue-loader'}
			}
		]
	},
	resolve:{
		//配置免后缀的文件类型
		extensions:['.js','.jsx','.vue','.css','.less','.scss'],
		//为全路径配置缩写@
		alias:{
			'@':path.resolve(__dirname,'src')
		}
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./public/index.html',
			filename:'index.html',
			chunks:['main']

		}),
		new VueLoaderPlugin()
	]
}