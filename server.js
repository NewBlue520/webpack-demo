const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}));

app.listen(9527, function () {
    console.log('port 9527');
})


/*
*
* Path variables are used to substitute absolute paths in WebStorm project files and allow project file sharing in version control systems. Some of the files describing the current project settings contain unknown path variables and WebStorm cannot restore those paths.
* */