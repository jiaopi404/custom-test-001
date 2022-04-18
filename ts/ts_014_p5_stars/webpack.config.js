const path = require('path');

// hot reload
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(somePath) {
  return path.resolve(__dirname, somePath);
}

module.exports = {
  mode: 'development',

  entry: {
    'main': './src/main.ts',
  },

  output: {
    path: resolve('dist'),
    filename: '[name].js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.json', '.js'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ],

  module: {
    rules: [
      // html-loader
      {
        test: /\.(htm|html)$/,
        loader: 'raw-loader',
      },
      // ts-loader,
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      }
    ]
  },
  
  devServer: {
    compress: true,
    port: 9001,
    host: 'localhost',
    open: false,
  }
}
