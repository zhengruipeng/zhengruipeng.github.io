//webpack.base.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: ''
    },
    module: {
        rules: [
            {//配置babel-loader用来编译和解析js
                test: /\.js$/,
                use: {loader: 'babel-loader'}
            },
            { //在webpack.base.js中增加file-loader用来解析文件
                test:/\.(png|jpg|jpeg|gif)$/,
                use:[
                    {loader:'file-loader'}
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',//html原始模版位置
            filename: 'index.html',//生成的html文件名
            //生成的html文件中引用的js依赖模块，这里填写的就是在entry中定义的key
            //也就是说如下配置相当于在index.html中引用了src/index.js
            chunks: ['index']
        }),
        //将它放入plugins中
        new MiniCssExtractPlugin({
            filename: '[name].css'//这里的[name]获取的还是entry中的key
        }),
        new CompressionPlugin({
            algorithm: "gzip",//采用gzip的方式压缩代码
            test: /\.js$|\.html$|\.css$/, //要压缩的文件有js和html还有css类型
            threshold: 10240, //当文件尺寸超过10kb的时候会被压缩代码
            minRatio: 0.8 //压缩比例默认为0.8
        })
    ],

    //resolve是与entry，plugins等平级的属性，是webpack的解析模块
    resolve: {
        //extensions用来定义后缀列表，在这里定义的后缀的文件类型在import引用时就不需要填写后缀
        extensions: ['.js', '.jsx', '.vue', '.less', '.sass', ".css"],
        //alias代表引用路径的别名，如下配置代表import中如果存在@符号的路径
        //@符号就会被解释为从电脑根目录到当前项目的src，所以如果引用models/user-model.js
        //只需要import userModel from '@/models/user-model.js'就相当于从根目录到user-model.js的全路径
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
}