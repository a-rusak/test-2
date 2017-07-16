const path = require("path");
const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const PROD = process.env.NODE_ENV === "production";

const OUTPUT_PATH = PROD
  ? path.resolve(__dirname, "dist")
  : path.resolve(__dirname, "build");

const lessDev = ["style-loader", "css-loader", "postcss-loader", "less-loader"];
const lessProd = ExtractTextPlugin.extract({
  use: [
    {
      loader: "css-loader",
      options: {
        sourceMap: true
      }
    },
    "postcss-loader",
    {
      loader: "less-loader",
      options: {
        sourceMap: true
      }
    }
  ],
  fallback: "style-loader"
});
const lessConfig = PROD ? lessProd : lessDev;

module.exports = {
  entry: "./src/index.ts",

  output: {
    filename: addHash("bundle.js", "chunkhash"),
    path: OUTPUT_PATH,
    publicPath: "/"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { test: /\.js$/, enforce: "pre", loader: "source-map-loader" },
      { test: /\.less$/, loader: lessConfig }
    ]
  },

  devtool: "source-map",

  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    publicPath: "/",
    hot: true,
    compress: false,
    stats: "minimal",
    port: 9120,
    historyApiFallback: true
  },

  plugins: [
    new CleanPlugin(["dist", "build"]),
    new HtmlPlugin({
      filename: "index.html",
      template: "src/index.ejs",
      minify: false
    }),
    new webpack.DefinePlugin({
      PROD: JSON.stringify(PROD)
    })
  ]
};

if (PROD) {
  module.exports.plugins = module.exports.plugins.concat([
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      disable: !PROD,
      filename: addHash("bundle.css", "chunkhash")
    })
  ]);
} else {
  module.exports.plugins = module.exports.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin()
  ]);
}

function addHash(template, hash) {
  return PROD ? template.replace(/\.[^.]+$/, `.[${hash}]$&`) : template;
}
