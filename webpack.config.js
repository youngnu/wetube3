const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

module.exports = {
    entry: "./src/client/js/main.js",
    plugins: [new MiniCssExtractPlugin()],
    mode: `development`,
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "assets", "js")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", {targets: "defaults"}]],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
        ],
    },
}