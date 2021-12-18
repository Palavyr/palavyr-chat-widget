'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'demo/index.tsx'),
        vendor: ['react', 'react-dom'],
    },
    target: 'web',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: false,
        port: 3010,
        hot: true,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: ['babel-loader', { loader: 'ts-loader', options: { configFile: 'demo.tsconfig.json' } }],
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: ['postcss-preset-env'],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('node-sass'),
                            sassOptions: {
                                includePaths: [path.resolve(__dirname, 'src/'), path.resolve(__dirname, 'dev/')],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(jpg|png|gif|svg)$/,
                type: 'asset/inline',
            },
        ],
    },
    devtool: 'inline-source-map',
    plugins: [
        new Dotenv({ path: '.env.development' }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            file: 'index.html',
        }),
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new CopyPlugin({
            patterns: [{ from: './assets/*', to: 'build/' }],
        }),
    ],
    performance: {
        hints: false,
    },
};
