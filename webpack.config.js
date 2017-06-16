const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package');

const plugins = [
  new webpack.BannerPlugin(
`Preload Hover v${packageJson.version}
Copyright (c) 2017 Ritter Insurance Marketing`),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  })
];

if (process.env.INCLUDE_WEBPACK_HTML) {
  plugins.push(
    new HtmlWebpackPlugin({
      template: __dirname + '/demo/index.html',
      filename: 'index.html',
      inject: 'head'
    })
  );
}

module.exports = {
  entry: [
    './src/preload-hover.js'
  ],
  output: {
    path: __dirname + '/lib',
    filename: 'preload-hover.min.js',
    library: 'PreloadHover',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  devtool: 'source-map',
  plugins: plugins
};
