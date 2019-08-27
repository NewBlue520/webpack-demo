// 该文件不再使用，已被拆分

const path = require('path');
const rm = require('rimraf');
// 打包静态资源文件插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清除打包不需要的文件 重新打包文件
const CleanWebpackPlugin = require('clean-webpack-plugin');

const resolve = (dir) => {
    return path.join(__dirname, dir);
};
module.exports = {
    mode: 'production',
    entry: {
        app: './src/main.js', // 入口文件编译项目需求文件
        views: './src/views.js'
    },
    output: {
        path: resolve('dist'),
        filename: '[name].bundle.js',
        publicPath: './'
    },
    //启动错误查询源码
    devtool: 'inline-source-map',

    // webpack-dev-server
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        host: "localhost", // 希望外部服务器访问 设置为0.0.0.0 CLI 设置 webpack-dev-server --host 0.0.0.0
        hot: true, // 是否启用热启动
        port: 9527
    },
    plugins: [
        new CleanWebpackPlugin({
            // Simulate the removal of files
            //
            // default: false
            dry: true,

            // Write Logs to Console
            // (Always enabled when dry is true)
            //
            // default: false
            verbose: true,

            // Automatically remove all unused webpack assets on rebuild
            //
            // default: true
            cleanStaleWebpackAssets: false,

            // Do not allow removal of current webpack assets
            //
            // default: true
            protectWebpackAssets: false,

            // **WARNING**
            //
            // Notes for the below options:
            //
            // They are unsafe...so test initially with dry: true.
            //
            // Relative to webpack's output.path directory.
            // If outside of webpack's output.path directory,
            //    use full path. path.join(process.cwd(), 'build/**/*')
            //
            // These options extend del's pattern matching API.
            // See https://github.com/sindresorhus/del#patterns
            //    for pattern matching documentation

            // Removes files once prior to Webpack compilation
            //   Not included in rebuilds (watch mode)
            //
            // Use !negative patterns to exclude files
            //
            // default: ['**/*']
            // cleanOnceBeforeBuildPatterns: ['**/*', '!static-files*'],
            cleanOnceBeforeBuildPatterns: [], // disables cleanOnceBeforeBuildPatterns

            // Removes files after every build (including watch mode) that match this pattern.
            // Used for files that are not created directly by Webpack.
            //
            // Use !negative patterns to exclude files
            //
            // default: []
            cleanAfterEveryBuildPatterns: ['static*.*', '!static1.js'],

            // Allow clean patterns outside of process.cwd()
            //
            // requires dry option to be explicitly set
            //
            // default: false
            dangerouslyAllowCleanPatternsOutsideProject: true,
        }), //webpack教程中传入了数组，更新新版本后不要传入，否则会报错
        new HtmlWebpackPlugin({
            template: resolve('index.html'),//根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对应的 loader， 否则webpack不能正确解析
            filename: resolve('dist/index.html'),// 默认情况下生成的 html 文件叫 index.html
            minify: {
                collapseWhitespace: true, //把生成的 index.html 文件的内容的没用空格去掉，减少空间
            },
            hash: true, //为了更好的 cache，可以在文件名后加个 hash。
            favicon: resolve('favicon.ico'),

        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.html'],
        alias: {
            '@': resolve('src')
        }
    },
    module: {
        rules: [
            // js
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                include: [
                    resolve('src'),
                    resolve('test'),
                    resolve('node_modules/webpack-dev-server/client')
                ],
                use: {
                    loader: 'babel-loader'
                }
            },
            // css
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            // image
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'img/[name].[ext]'
                    }
                }
            },
            // font
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        limit: 10000,
                        name: 'font/[name].[ext]'
                    }
                }
            },
            // csv
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            // xml
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            // html
            {
                test: /\.(html)$/,
                include: [
                    resolve('src')
                ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath(url, resourcePath, context){
                                console.log(url, resourcePath, context);
                            },
                        },
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: [':data-src']
                        }
                    }
                ]
            }
        ]
    }
};
