var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
const config = require('./config.json')
var webpackConfig = require('./webpack.prod.config.js')

var spinner = ora('building for production...')


webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
        API: JSON.stringify(config["sit"])
      }
    })
  )

// 开始 loading 动画
spinner.start()

// 删除打包后的文件夹，重新生成打包后的文件
rm(path.join(__dirname, '../dist'), err => {
  if (err) throw err
  //  开始 webpack 的编译
  webpack(webpackConfig, function (err, stats) {
      // 编译成功的回调函数
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})