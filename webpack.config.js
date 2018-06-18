// webpack config

// import common node modules
const path = require('path');

// import webpack modules
const webpack = require('webpack');
const merge = require('webpack-merge');

// import webpack Plug-ins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const WebpackNodeExternals = require('webpack-node-externals')();

// show stack trace when deprecated feature is used
process.traceDeprecation = true;


// parameters we might change
const buildParameters = {
  // path to public folder on server
  publicPath: "",

  // source folder
  sourceFolderName: "src",
  sourceFolderPath: path.join(__dirname, "src"),

  // static asset folder
  staticFolderName: "static",
  staticSourceFolderPath: path.join(__dirname, "static"),

  // output folder
  outputFolderName: "dist",
  outputFolderPath: path.join(__dirname, "dist"),
};

// config common to production and development
const commonConfig = {
  entry: {
    "main": "./src/index.js"
  },

  module: {
    rules: [
      {
        // run lint on JavaScript and .vue files before compiling
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [ buildParameters.sourceFolderPath ],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        // run babel on JavaScript files
        test: /\.js$/,
        loader: 'babel-loader',
        include: [ buildParameters.sourceFolderPath ]
      }
      // {
      //   // image files
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10240,
      //     name: path.join(buildParameters.staticSourceFolderName, 'images/[name].[hash:7].[ext]')
      //   }
      // },
      // {
      //   // font files
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10240,
      //     name: path.join(buildParameters.staticSourceFolderName, 'fonts/[name].[hash:7].[ext]')
      //   }
      // },
      // // add html if "pure" html files are needed, e.g. Angular
      // {
      //   // copy image files
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader",
      //       options: { minimize: true }
      //     }
      //   ]
      // },
    ]
  },

  plugins: [
    new VueLoaderPlugin()
  ],

  // avoid size warnings
  performance: {
    hints: false
  }
};

// webpack config for running "dev" server
const developmentConfig = {
  mode: "development",

  output: {
    pathinfo: true
  },

  module: {
    "rules": [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      }, {
        test: /\.css$/,
        use: [
          { loader: "vue-style-loader", options: { sourceMap: true } },
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "postcss-loader", options: { sourceMap: true } }
        ]
      }, {
        test: /\.scss$/,
        use: [
          { loader: "vue-style-loader", options: { sourceMap: true } },
          { loader: "css-loader", options: { sourceMap: true } },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } }
        ]
      }
    ]
  },

  // cheap-module-eval-source-map is faster for development
  devtool: "source-map",

  devServer: {
    stats: "errors-only",
    // open a browswer window
    open: true,
    // overlay captures compile warnings and errors in HTML display
    overlay: true
  },

  plugins: [
    // enable HMR for quicker development
    new webpack.HotModuleReplacementPlugin(),

    // use html-webpack-pluginhtml-webpack-plugin to inject bundles into page
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),

    new FriendlyErrorsPlugin()
  ]
};

// webpack config for building a production release
const productionConfig = {
  mode: "production",

  output: {
    path: buildParameters.outputFolderPath,
    filename: "js/[name].[chunkhash].js",
    chunkFilename: "js/[name].[chunkhash].js"
  },

  module: {
    "rules": [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: false } },
          { loader: "postcss-loader", options: { sourceMap: false } }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: false } },
          { loader: "postcss-loader", options: { sourceMap: false } },
          { loader: "sass-loader", options: { sourceMap: false } }
        ]
      }
    ]
  },

  devtool: "source-map",

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'dependencies',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      // OptimizeCssAssetsPlugin will compress CSS and remove duplicated CSS.
      // We will need to remove if we want to create CSS source maps.
      new OptimizeCssAssetsPlugin(),

      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  },

  plugins: [
    // generate dist index.html with correct asset hash for caching.
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
      // add minify for a "real" project but this is overkill for a demo
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeAttributeQuotes: true
      // }
    }),

    new CleanWebpackPlugin(buildParameters.outputFolderPath, {allowExternal: true}),

    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash].css",
      chunkFilename: "[css/[name].[chunkhash].css"
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: buildParameters.staticSourceFolderPath,
        to: buildParameters.staticFolderName,
        ignore: ['.*']
      }
    ])
  ],

  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }
};

function getWebpackConfig(env) {
  console.log(`getWebpackConfig(${env})`);
  if (env == "test-mocha") {
    let temp = merge(commonConfig, developmentConfig);
    temp.externals = [WebpackNodeExternals];
    temp.devtool = 'eval';
    return temp;
  } else if (env === "development") {
    return merge(commonConfig, developmentConfig);
  }
  return merge(commonConfig, productionConfig);
}

module.exports = getWebpackConfig;

// test specific setups
// if (process.env.NODE_ENV === 'test') {
//   module.exports.externals = [require('webpack-node-externals')()]
//   module.exports.devtool = 'eval'
// }
