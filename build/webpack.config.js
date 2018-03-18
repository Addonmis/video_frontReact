const path = require("path");
const webpack = require("webpack");
const HtmlWbpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: [
        "babel-polyfill",
        "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",
        path.resolve(__dirname, "../src/index.js")
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    resolve: {
        modules: [path.resolve(__dirname, "../src"), "node_modules"]
    },
    devtool: "inline-source-map",
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, "../dist")], {
            root: path.resolve(__dirname, "..")
        }),
        new HtmlWbpackPlugin({
            template: path.resolve(__dirname, "../bin/index.html"),
            inject: false
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(!process.env.ENV)
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: "babel-loader"
            }
        ]
    }
};