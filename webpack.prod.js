const path = require('path');
const webpack = require("webpack") ;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry:'./src/client/index.js',
  mode:'production',
  output: {
    libraryTarget:'var',
    library:'Client',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean:true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader,"css-loader","sass-loader",
        ],
      },
    ]
  },
  optimization:{
    minimizer:[
       new TerserPlugin(),new CssMinimizerPlugin()
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    template:"./src/client/views/index.html",
    filename:"./index.html",
  }),
            new CleanWebpackPlugin({
              // Simulate the removal of files
              dry: true,
              // Write Logs to Console
              verbose: true,
              // Automatically remove all unused webpack assets on rebuild
              cleanStaleWebpackAssets: true,
              protectWebpackAssets: false
          }),
            new MiniCssExtractPlugin(),
            new WorkboxPlugin.GenerateSW({
              // these options encourage the ServiceWorkers to get in there fast
              // and not allow any straggling "old" SWs to hang around
              clientsClaim: true,
              skipWaiting: true,
            }),
  
  
]
};