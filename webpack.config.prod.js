var path          = require('path');
var autoprefixer  = require('autoprefixer');
var webpack       = require('webpack');
var meta          = { port: 9002 };
var styles        = path.resolve(__dirname, './lib', 'styles');
var bourbonNeat   = require('node-neat').includePaths;
var normalizeScss = require('node-normalize-scss').includePaths;
var stylePaths    = [styles].concat(bourbonNeat, normalizeScss);
var styleQueries  = [];

stylePaths.forEach(function(stylePath) {
  styleQueries.push("includePaths[]=" + stylePath)
});

var styleLoader = [
  'style-loader',
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&' + styleQueries.join("&")
].join("!");

module.exports = {
  meta:     meta,
  devtool:  'eval',
  stats:    { colors: true, modules: true, reasons: true },
  progress: true,
  entry: [
    "font-awesome-sass!./font-awesome-sass.config.js",
    path.join(__dirname, 'lib', 'index.js')
  ],
  plugins:  [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false, mangle: true }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  resolve: {
    extensions: ['', '.js', '.sass', '.scss'],
    modulesDirectories: ['lib', 'node_modules']
  },
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
  output: {
    path:     path.join(__dirname, 'app', 'assets'),
    filename: 'application.js',
  },
  module: {
    loaders: [
      {
        test:    /\.js$/,
        include: [ path.join(__dirname, 'lib') ],
        loaders: [ 'react-hot', 'babel-loader' ],
      },
      {
        test: /\.(scss|sass)$/, loader: styleLoader
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      }
    ]
  }
};
