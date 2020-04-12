import { ConfigurationFactory } from 'webpack'
import path = require('path')
import CopyWebpackPlugin = require('copy-webpack-plugin')
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const config: ConfigurationFactory = () => {
  return {
    // モードの設定、v4系以降はmodeを指定しないと、webpack実行時に警告が出る
    mode: "development",
    entry: {
      vnuma: path.join(__dirname, 'src', 'vnuma.ts')
    },
    output: {
      // distディレクトリにcontent_scripts.jsを吐く
      path: path.join(__dirname, 'dist/src'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          use: 'ts-loader',
          exclude: '/node_modules/'
        }
      ]
    },
    resolve: {
      extensions: ['ts', 'js']
    },
    plugins: [
      new CleanWebpackPlugin(),
      // publicディレクトリにあるファイルをdistディレクトリにコピーする
      new CopyWebpackPlugin([
        { from: path.join(__dirname, 'src/*.js'), to: '..'},
        { from: path.join(__dirname, 'src/*.css'), to: '..'},
        { from: path.join(__dirname, '*.png'), to: '..'},
        { from: path.join(__dirname, 'manifest.json'), to: '..'}
      ]),
    ]
  }
}

export default config