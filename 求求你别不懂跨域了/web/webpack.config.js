const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    mode: "production",
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
            },
        ]
    },
    resolveLoader: {
        modules: ["node_modules", "./loader"]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        open: false,
        static: './public',
        historyApiFallback: true,
        hot: true,
        host: 'localhost',
        port: 2010
    },
    plugins: [new HtmlWebpackPlugin({
        template: 'public/index.html'
    }),new CleanWebpackPlugin()],
}