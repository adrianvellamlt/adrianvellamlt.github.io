const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].css' })
    ],
    entry: {
        'app': './src/app.ts'
    },
    mode: "development",
    module: {
        rules: [
            {
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devtool: "inline-source-map", // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    context: __dirname, // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory
    target: "web", // enum,
    resolve: {
        extensions: ['.ts', '.js', '.css']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
    }
};