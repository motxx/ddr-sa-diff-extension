import { Configuration } from 'webpack';
import path from 'path'
import CopyPlugin from 'copy-webpack-plugin'

const config: Configuration = {
  mode: 'production',
  entry: {
    content_scripts: path.join(__dirname, 'src', 'content_scripts.ts')
  },
  output: {
    // distディレクトリにcontent_scripts.jsを吐く
    path: path.join(__dirname, 'dist'),
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
    extensions: ['.ts', '.js']
  },
  plugins: [
    // publicディレクトリにあるファイルをdistディレクトリにコピーする
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '.' }
      ]
    })
  ]
};

export default config
