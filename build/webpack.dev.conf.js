'use strict'
const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const resolve = (dir) => {
    return path.join(__dirname, '..', dir);
};
const devWebpackConfig = merge(baseWebpackConfig, {
    // webpack-dev-server
    devServer: {
        contentBase: resolve( 'dist'),
        compress: true,
        host: "localhost", // 希望外部服务器访问 设置为0.0.0.0 CLI 设置 webpack-dev-server --host 0.0.0.0
        hot: true, // 是否启用热启动
        port: 9527
    },
});
