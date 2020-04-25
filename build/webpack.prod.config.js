const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const env = {
    "env": "dev",
    "baseURL": "mams-rest",
    "biz": "biz-m-rest",
    "stsURL": "sts-service",
    "reportURL": "sts-report",
    "pscURL": "crc-psc-business-rest",
    "browse": "http://myd.crc.com.cn/mams-rest/",
    "key": "h1k2#3s4f5d6%7d8s9@0s1f2"
}

module.exports = merge(webpackBaseConfig, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
                API: JSON.stringify(env)
            }
        })
    ]
});