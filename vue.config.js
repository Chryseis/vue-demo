const path = require('path')
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')

// const env = dotenv.config({ path: path.resolve(__dirname, '.env.prod') })
// dotenvExpand(env)

process.env.CI_ENV = 'QA'

module.exports = {
  devServer: {
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  configureWebpack: config => {
    config.output = {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
      // library: `vue2-[name]`,
      // libraryTarget: 'umd',
      // jsonpFunction: 'webpackJsonp_vue2'
    }
    // 开启分离js
    config.optimization = {
      runtimeChunk: 'single'
      // splitChunks: {
      //   chunks: 'all',
      //   maxInitialRequests: Infinity,
      //   minSize: 20000,
      //   cacheGroups: {
      //     vendor: {
      //       test: /[\\/]node_modules[\\/]/,
      //       name(module) {
      //         // get the name. E.g. node_modules/packageName/not/this/part.js
      //         // or node_modules/packageName
      //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
      //         // npm package names are URL-safe, but some servers don't like @ symbols
      //         return `npm.${packageName.replace('@', '')}`
      //       }
      //     }
      //   }
      // }
    }
  }
}
