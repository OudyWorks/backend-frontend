const webpack = require('webpack'),
    path = require('path'),
    merge = require('webpack-merge'),
    VueLoaderPlugin = require('vue-loader').VueLoaderPlugin,
    VueSSRClientPlugin = require('vue-server-renderer/client-plugin'),
    VueSSRServerPlugin = require('vue-server-renderer/server-plugin'),
    nodeExternals = require('webpack-node-externals'),
    base = {
        output: {
            path: path.resolve('.', 'dist')
        },
        resolve: {
            alias: {
                components: path.resolve('./components'),
                modules: path.resolve('./modules'),
                libraries: path.resolve('./libraries'),
                LAYOUT: path.resolve(__dirname, 'layouts/html')
            }
        },
        mode: 'development',
        // mode: 'production',
        devtool: 'source-map',
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
                                    '@babel/preset-env'
                                ],
                                plugins: [
                                    '@babel/plugin-syntax-jsx',
                                    'babel-plugin-transform-vue-jsx'
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
    },
    compiler = webpack([
        merge(base, {
            entry: path.join(__dirname, './client.js'),
            output: {
                filename: 'app.js',
            },
            plugins: [
                new VueSSRClientPlugin()
            ]
        }),
        merge(base, {
            entry: path.join(__dirname, './bundle.js'),
            output: {
                filename: 'app.bundle.js',
            },
            plugins: [
                new VueSSRServerPlugin()
            ],
            target: 'node',
            node: {
                __filename: true,
                __dirname: true
            },
            output: {
                libraryTarget: 'commonjs2'
            },
            optimization: {
                splitChunks: {
                    name: 'manifest',
                    minChunks: Infinity
                }
            },
            externals: nodeExternals({
                whitelist: /\.css$/
            })
        })
    ])
compiler.run((err, stats) => {
    console.log(err || stats.hash)
})
// console.log(compiler)
console.log(path.resolve('.'))
console.log(path.join(__dirname, './components.js'))