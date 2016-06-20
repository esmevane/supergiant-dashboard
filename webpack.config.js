"use strict"

const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const animation = require('postcss-animation')
const fs = require('fs')
const getConfig = require('hjs-webpack')
const path = require('path')
const precss = require('precss')
const webpack = require('webpack')
const dotenv = require('dotenv')

// Convenience methods which we need from `path`
//
const join = path.join
const resolve = path.resolve

// Convenience variables for path knowledge
//
const root = resolve(__dirname)
const lib = join(root, 'lib')
const app = join(root, 'app')
const modules = join(root, 'node_modules')

// Determine environment and configuration.
//
const Environment = process.env.NODE_ENV || 'development'
const isDev = Environment === 'development'
const configVariables = dotenv.config()
const envVariables = dotenv.config({
  path: join(root, 'config', `${Environment}.env`),
  silent: true
})

const config = Object.assign({}, configVariables, envVariables)
const reducer = (progress, key) => {
  const value = JSON.stringify(config[key])

  return Object.assign({}, progress, { [key.toUpperCase()]: value })
}

const initializer = { NODE_ENV: JSON.stringify(Environment) }
const definitions = Object.keys(config).reduce(reducer, initializer)
const index = fs.readFileSync(join(app, 'index.html'))

// Use HJS webpack to handle webpack setup.
//
let base = getConfig({
  clearBeforeBuild: '!(images|fonts|index.html)',
  in: join(lib, 'index.js'),
  isDev: isDev,
  out: app,
  html: context => ({ 'index.html': index }),
  devServer: {
    proxy: {
      context: '/api',
      options: {
        target: 'http://localhost:8080',
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
})

// PostCSS-loader expects this key to return a list of PostCSS pipeline
// utilities.
//
base.postcss = _config => {
  return [
    animation({}),
    precss({}),
    autoprefixer({ browsers: ['last 2 versions'] }),
    cssnano({})
  ]
}

// Add our environment and config to the generated webpack.
//
base.plugins = [ new webpack.DefinePlugin(definitions) ].concat(base.plugins)

// Now we're going to start customizing the stylesheet pipeline.  First step
// is to generate some convenience functions for manipulating the loaders which
// HJS Webpack has auto-loaded.
//
const first = list => list[0]
const pluck = (testables, match) =>
  testables.filter(testable => testable.test.test(match))

// Next up, we want to have a specific Dev and Production naming pattern.  The
// distinction here is important to debugging, but we don't want to ship the
// same class structure in production.
//
// Also, without the custom CSS-loader line in the middle of this custom loader,
// any style modules we put together will just plain output empty hashes.
// Super frustrating experience but there you go.
//
// This is a pretty complicated stream-of-consciousness effort, so, sorry for
// that.  Here's the main stuff we want to accomplish (and prevent from
// regressing):
//
// * Naming pattern should be debuggable in development
// * CSS loader should be friendly to modules
// * Non-module styles should be loaded into a global sheet.
// * Module styles export class names for reuse.
// * NPM module styles should be available like non-module styles.
//
const namePattern = isDev ? '[path][name]__[local]__' : '[hash:base64:5]'
const importLoader = 'css-loader?modules&importLoaders=1'
const customLoaders = [ 'style-loader', importLoader, 'postcss-loader' ]

let cssLoader = first(pluck(base.module.loaders, '.css'))
let newLoader = Object.assign({}, cssLoader, {
  test: /\.module\.css$/,
  include: [lib],
  loader: cssLoader.loader
})

newLoader.loader = customLoaders.map(loader => {
  const expectation = /css\-loader\?/
  const namedLoader = `${importLoader}&localIdentName=${namePattern}`

  if (expectation.test(loader)) { return namedLoader }

  return loader
}).join('!')

cssLoader.include = [lib]
cssLoader.exclude = /\.module\./
cssLoader.loader = newLoader.loader

base.module.loaders.push(newLoader)
base.module.loaders.push({
  test: /\.css$/,
  include: [modules],
  exclude: [lib],
  loader: 'style-loader!css-loader'
})

// Finally, we want to add our aliases to the webpack configuration.
//
base.resolve.root = [lib, modules]
base.resolve.alias = {
  components: join(lib, 'components'),
  containers: join(lib, 'containers'),
  resources: join(lib, 'resources'),
  routes: join(lib, 'routes'),
  styles: join(lib, 'styles'),
  visuals: join(lib, 'visuals'),
  lib
}

base.externals = {
  'react/lib/ReactContext': true,
  'react/lib/ExecutionEnvironment': true,
  'react/addons': true
}

module.exports = base
