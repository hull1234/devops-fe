// const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
module.exports = {
    devServer: {
        port: 9999,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:5000',
                pathRewrite: {
                    '^/api': ''
                },
                changeOrigin: true
            }
        }
    },
    // configureWebpack: {
    //     plugins: [
    //         new ParallelUglifyPlugin({
    //             cacheDir: '.cache/',
    //             uglifyJS: false
    //         })
    //     ]
    // },
    chainWebpack: config => { 
        config.optimization.minimize(false)
    }
}