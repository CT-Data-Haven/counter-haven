import DotenvWebpackPlugin from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import {dirname} from 'path'
import {fileURLToPath} from 'url'
import {createRequire} from 'module'

const require = createRequire(import.meta.url)

const __dirname = dirname(fileURLToPath(import.meta.url))
export default {
  entry: __dirname + '/src/index.js',
  devServer: {
    contentBase: __dirname + '/dist',
    hot: true,
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new DotenvWebpackPlugin(),
    new HtmlWebpackPlugin({template: 'src/index.html'}),
    new ESLintPlugin({fix: true}),
    new CopyPlugin({
      patterns: [
        {from: 'src/assets', to: 'assets'},
      ]},
    ),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            ['@babel/preset-env', {targets: 'defaults'}],
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.csv$/,
        loader: 'csv-loader',
        exclude: /node_modules/,
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true,
        },
      },
    ],
  },
  resolve: {
    fallback: {
      fs: require.resolve('fs'),
    },
  },
}
