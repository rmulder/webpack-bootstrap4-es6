// Webpack files and plugins
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Dev plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Production plugins
const WebpackChunkHash = require('webpack-chunk-hash');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin3');

// Paths for source and build files
var paths = {
	src: path.join(__dirname, './src'),
	dist: path.join(__dirname, './dist')
};

let exportConfig = {
  
  context: paths.src,

  // Output path
  output: {
    path: paths.dist,
    filename: './js/[name].js'
  },

  // Local dev server
  devtool: 'cheap-module-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: paths.dist,
    port: 8000
  },

  // Entries
  entry: {
    main: './js/main.js',
    vendor: './js/vendor.js'
  },

  // Modules for Scss, babel, images, fonts
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(css)$/,
        loader: ExtractTextPlugin.extract(['css-loader'])
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader?limit=5000&name=/images/[name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            publicPath: './',
            outputPath: 'fonts/',
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },

  // Plugins
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    new CopyWebpackPlugin([
      { from: 'images', to: 'images' },
      { from: 'fonts', to: 'fonts' },
      { from: 'favicon.ico', to: 'favicon.ico' }
    ]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: paths.src + '/index.html',
      chunks: ['vendor', 'main'],
    }),
    new CleanWebpackPlugin([
      paths.dist
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'Util': 'util',
      'Popper': 'popper.js'
    }),
    new webpack.DefinePlugin({
      'process.env': {
    	  'APP_ENV': JSON.stringify(process.env.APP_ENV)
      }
    })
  ],

  // ALIAS
  resolve: {
    extensions: ['.js', '.scss'],
    modules: [
      paths.src,
      './node_modules'
    ]
  }
};

if(process.env.APP_ENV === 'development') {
  exportConfig.plugins = exportConfig.plugins.concat(
    new ExtractTextPlugin({
      filename: './css/[name].css',
      allChunks: true
    }),
    new BundleAnalyzerPlugin()
  );
}

if(process.env.APP_ENV === 'production') {
  exportConfig.output = {
    path: paths.dist,
    filename: './js/[name].[chunkhash].min.js'
  }

  exportConfig.plugins = exportConfig.plugins.concat(
    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),
    new ExtractTextPlugin({
      filename: './css/[name].[chunkhash].min.css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new UglifyJSPlugin()
  );
}

module.exports = exportConfig;