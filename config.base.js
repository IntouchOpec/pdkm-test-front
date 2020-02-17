const webpack = require("webpack");
const path = require("path");
require("@babel/polyfill");

module.exports = {
  entry: ["@babel/polyfill", "./index.js"],
  output: {
      filename: "bundle.js",
      path: path.join(__dirname, "./build"),
      publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/, ///\.(js|jsx)$/
        exclude: [/node_modules/],
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["last 2 versions"]
                },
                modules: false
              }
            ],
            "@babel/preset-react"
          ]
        }
      },
      {
        test: /\.(css)$/,
        // exclude: /node_modules/,
        use: ["style-loader", "css-loader"]
      },
      // {
      //   test: /\.svg$/,
      //   loader: "svg-inline-loader"
      // },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: {
          loader: "url-loader",
          options: {
            mimetype: 'image/png',
          },
        },
      },
      {
        test: /\.html$/,
        use: [ {
          loader: "html-loader",
          options: {
            minimize: true
          }
        }],
      }
    ]
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "./src")]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.ProgressPlugin()
  ]
}