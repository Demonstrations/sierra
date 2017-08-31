const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry:{
        server:'./src/index.js'
    },
    output:{
        path:path.resolve(__dirname, 'dist'),
        filename:'[name].bundle.js',
        // libraryTarget:'commonjs2'
    },
    target:'node',
    // externals:[nodeExternals()],
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                include:path.resolve('./src'),
                options:{
                    presets:[
                        ['env', {
                            'targets':{'node':'current'}
                        }]
                    ]
                }
            }
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.resolve(__dirname, 'node_modules')
                    ) === 0
                )
            }
        }),
    //     new webpack.ContextReplacementPlugin(/^(.*)node_modules.*(\.js)$/, /a^/),
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         },
    //         except: ['$super', '$', 'exports', 'require']
    //     })
    ],
    node:{
        __dirname:true
    }
}