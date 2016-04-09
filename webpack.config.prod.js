var path              = require('path');
var autoprefixer      = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack           = require('webpack');
var meta              = { port: 9002 };
var styles            = path.resolve(__dirname, './lib', 'styles');
var bourbonNeat       = require('node-neat').includePaths;
var normalizeScss     = require('node-normalize-scss').includePaths;
var stylePaths        = [styles].concat(bourbonNeat, normalizeScss);
var styleQueries      = [];

stylePaths.forEach(function(stylePath) {
  styleQueries.push("includePaths[]=" + stylePath)
});

var sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&' + styleQueries.join("&")
];

var extractLoader = ExtractTextPlugin.extract(
  'style-loader',
  sassLoaders.join('!')
);

module.exports = {
  meta:     meta,
  devtool:  'eval',
  stats:    { colors: true, modules: true, reasons: true },
  progress: true,
  entry:    [ path.join(__dirname, 'lib', 'index.js') ],
  plugins:  [
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false, mangle: true }),
    new ExtractTextPlugin('application.css'),
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
      { test: /\.(scss|sass)$/, loader: extractLoader }
    ]
  }
};
