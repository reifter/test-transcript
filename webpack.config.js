const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack.config.js
module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    context: path.resolve(__dirname, './src/'),
    entry: '../src/static/js/index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'static/js/app.js',
      publicPath: '/',
    },
    devServer: {
      publicPath: '/',
      overlay: true,
      contentBase: path.join(__dirname, '/src/'),
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader'],
          include: [
            path.resolve(__dirname, './src/'),
          ],
        },
        {
          test: /\.(c|sa|sc)ss$/,
          include: [
            path.resolve(__dirname, './src/'),
          ],
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 3, // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('postcss-preset-env')({
                    browsers: 'defaults',
                  }),
                  require('cssnano')({
                    preset: [
                      'default',
                      {
                        discardComments: {
                          removeAll: true,
                        },
                      },
                    ],
                  }),
                ],
              },
            },
            { loader: 'resolve-url-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true } },
          ],
        },
        {
          test: /\.(png|jpg|svg)$/,
          include: [
            path.resolve(__dirname, './src/'),
          ],
          loader: 'file-loader',
          options: {
            context: path.resolve(__dirname, './src/static/js/'),
            publicPath: (devMode) ? '/static/img/' : '../img/',
            outputPath: 'static/img/',
            name: '[path][name].[ext]',
            emitFile: true,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js','.jsx'],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new CopyWebpackPlugin([
        {
          from: '*.*',
          to: 'static/files/[path][name].[ext]',
          context: path.resolve(__dirname, './src/static/files/')
        },
      ]),
      new MiniCssExtractPlugin({
        filename: devMode ? 'static/css/main.min.css' : 'static/css/main.min.css',
        chunkFilename: devMode ? 'static/css/[id].css' : 'static/css/[id].[hash].css',
      }),
      new HtmlWebpackPlugin({
        hash: true,
        template: path.resolve(__dirname, './src/index.html'),
        filename: path.resolve(__dirname, './dist/index.html'),
      }),
    ],
  };
};
