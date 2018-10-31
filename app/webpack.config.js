var webpack = require('webpack')
var path = require('path')

// variables
var isProduction = process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production'
var sourcePath = path.join(__dirname, './src')
var outPath = path.join(__dirname, './dist')

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require('mini-css-extract-plugin')
var WebpackCleanupPlugin = require('webpack-cleanup-plugin')

module.exports = {
    context: sourcePath,
    devtool: "inline-source-map",
    entry: {
        app: './main.tsx'
    },
    output: {
        path: outPath,
        filename: 'bundle.js',
        chunkFilename: '[chunkhash].js',
        publicPath: '/'
    },
    target: 'web',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        mainFields: ['module', 'browser', 'main'],
        alias: {
            app: path.resolve(__dirname, 'src/app/')
        }
    },
    module: {
        rules: [
            // .ts, .tsx
            {
                test: /\.tsx?$/,
                use: [
                    isProduction && {
                        loader: 'babel-loader',
                        options: { plugins: ['react-hot-loader/babel'] }
                    },
                    'ts-loader'
                ].filter(Boolean)
            },
            // css
            {
                test: /\.scss$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        query: {
                            namedExport: true,
                            camelCase: true,
                            modules: true,
                            sourceMap: !isProduction,
                            importLoaders: 1,
                            localIdentName: isProduction ? '[hash:base64:5]' : '[local]__[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('postcss-import')({ addDependencyTo: webpack }),
                                require('postcss-url')(),
                                require('postcss-cssnext')(),
                                require('postcss-reporter')(),
                                require('postcss-browser-reporter')({
                                    disabled: isProduction
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            // static assets
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.(png|svg)$/, use: 'url-loader?limit=10000' },
            { test: /\.(jpg|gif)$/, use: 'file-loader' }
        ]
    },
    optimization: {
        splitChunks: {
            name: true,
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    priority: -10
                }
            }
        },
        runtimeChunk: true
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development',
            DEBUG: false
        }),
        new WebpackCleanupPlugin(),
        new MiniCssExtractPlugin({
            filename: '[contenthash].css',
            disable: !isProduction
        }),
        new HtmlWebpackPlugin({
            template: 'assets/index.html'
        })
    ],
    devServer: {
        contentBase: sourcePath,
        hot: true,
        inline: true,
        historyApiFallback: {
            disableDotRule: true
        },
        stats: 'minimal'
    },
    node: {
        fs: 'empty',
        net: 'empty'
    }
}
