var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = { //from here to the bottom is a JS object 
  entry: "./src/index.js", //this is a relative pass
  output: {
    path: path.resolve(__dirname, "dist"), //webpack wants an absolute pack, path is a library
    filename: "main.js",
  },
  module: {
    rules: [ //rules that webpack wants to use
      { test: /\.(js)$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(png|svg|jpg|gif)$/, use: ["file-loader"] },
    ],
  },
  plugins: [ //webpack will take the index.js file and insert stuff into it
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};