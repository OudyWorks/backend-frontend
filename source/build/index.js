const webpack = require('webpack'),
    path = require('path'),
    VueLoaderPlugin = require('vue-loader').VueLoaderPlugin,
    compiler = webpack({
        entry: path.join(__dirname, './app.js'),
        output: {
            path: path.resolve('.', 'dist'),
            filename: 'app.js'
        },
        resolve: {
            alias: {
                components: path.resolve('./components'),
                modules: path.resolve('./modules'),
                libraries: path.resolve('./libraries'),
            }
        },
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    require('@babel/preset-env')
                                ],
                                plugins: [
                                    require('@babel/plugin-syntax-jsx'),
                                    require('babel-plugin-transform-vue-jsx')
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
            ]
        },
        plugins:[
            new VueLoaderPlugin()
        ]
    })
compiler.run((err, stats) => {
    console.log(err || stats.hash)
})
// console.log(compiler)
console.log(path.resolve('.'))
console.log(path.join(__dirname, './components.js'))