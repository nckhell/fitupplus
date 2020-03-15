const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')

const common = require('./webpack.common.js')

module.exports = merge.smart(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: '.env.development'
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    historyApiFallback: true,
    // host: '0.0.0.0', // server needs to be accessible externally
    port: 3000
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     pathRewrite: { '^/api': '' }
    //   }
    // }
  }
})
