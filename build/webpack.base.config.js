const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

// 这个配置文件，其实就是一个js文件，通过node中的模块操作，向外暴露了一个配置对象

module.exports = {
    // 在配置文件中，需要手动指定入口和出口
    entry: path.join(__dirname,'../src/main.js'),
    output: {
        path: path.join(__dirname,'../dist'),
        filename: 'bundle.js'
    },
    // 这是配置webpack-dev-server命令参数的第二种形式
    devServer: {
        open: true, //自动打开浏览器
        port:8081, //设置启动时的端口号
        inline:true,
        // hot:"0.0.0.0",
        contentBase:'./',  //指定托管的根目录,打开localhost3000会直接进入src下
        hot:true  //启用热更新
    },
    // 用于配置所有的插件信息
    plugins:[
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'../index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name][hash].css',
            chunkFilename: '[id].css'
        }),
        // 必须要加上的vue插件，官方修改的新语法
        new VueLoaderPlugin(),
        // webpack打包的时候，完全将该目录下的文件拷贝，这样路径引用的时候可以直接使用这里面的路径
        new CopyWebpackPlugin([{
            from: path.join(__dirname, '../static'),
            to: 'static',
            ignore: ['.*']
        }])
    ],
    // 用于配置所有的第三方模块加载器
    module: {
        rules: [
            {
                test: /\.vue$/,
                use:'vue-loader'
            },
            {
                test: /\.css$/,
                // 配置.css文件的第三方loader规则
                use: ['style-loader','css-loader']
            },
            // 安装babel-loader来解析超出一些es6语言，webpack默认只支持一部分的es6语法
            {
                test: /\.js$/,
                use: 'babel-loader',
                // 只包括src目录下的js文件
                // include: [path.join(__dirname, '/src')],
                // 不包括依赖包文件里的js文件
                exclude: /(node_modules)/,
            },
            {
                test: /\.less$/,
                // 配置.less文件的第三方loader规则
                use: ['style-loader','css-loader','less-loader']
            },
            // 处理图片路径的loader
            // limit给定的值，是图片的大小，单位是字节。如果我们引用的图片大小没有超过了这个limit值，则在浏览器中显示
            // 为base64格式的字符串，反之则为hash加密的文件名
            {
                test: /\.(gif|jpg|png|bmp|woff|woff2|svg|eot|ttf)\??.*$/,
                use: 'url-loader?limit=1024'
                // 如果后面加上&name=[name].[ext]，则会实现浏览器的图片名称与项目中的文件名称一致,
                // 但这样写会出现重名文件显示错误问题，所以我们加上hash值
                // use: 'url-loader?limit=1024&name=[hash:8]-[name].[ext]'  
            },
            // {
            //     test: /\.jpg|\.png|\.jpeg|\.svg|\.ttf|\.woff$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             outputPath: './img',
            //             publicPath: '/img'
            //         }
            //     }]
            // }
        ]
    },
    resolve: {
        alias: {
            // 配置，当找到vue的时候，相当于去找vue/dist/vue.js这个文件
            'vue': 'vue/dist/vue.js',
            '@': path.join(__dirname,'../src'),
            '@static':path.join(__dirname,'../static')
        }
    }
}