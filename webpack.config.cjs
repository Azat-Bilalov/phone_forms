const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsCheckerPlugin = require('fork-ts-checker-webpack-plugin');

const buildPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
    return [
        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
        !withModules
            ? 'css-loader'
            : {
                  loader: 'css-loader',
                  options: {
                      modules: {
                          localIdentName: !isProd ? '[local]__[hash:base64:5]' : '[hash:base64]',
                      },
                  },
              },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer'],
                },
            },
        },
        'sass-loader',
    ];
};

module.exports = {
    target: !isProd ? 'web' : 'browserslist',
    entry: path.join(srcPath, 'index.tsx'),
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true),
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles(),
            },
            {
                test: /\.[tj]sx?$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.c.svg$/,

            //     use: [
            //         {
            //             loader: '@svgr/webpack',
            //             options: {
            //                 svgoConfig: {
            //                     plugins: [{ removeViewBox: false }],
            //                 },
            //             },
            //         },
            //     ],
            //     type: 'javascript/auto',
            // },
            {
                test: /\.(png|svg|jpg)$/,
                exclude: /\.c.svg$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024,
                    },
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', './index.html'),
            publicPath: isProd ? '/phone_forms/' : '/',
            favicon: path.resolve(__dirname, 'public', './favicon.ico'),
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css',
        }),
        new TsCheckerPlugin(),
    ].filter(Boolean),
    devServer: {
        host: 'localhost',
        port: 3000,
        hot: true,
        historyApiFallback: true,
        static: path.resolve(__dirname, 'public'),
    },
    resolve: {
        extensions: ['.tsx', '.jsx', '.js', '.ts'],
        alias: {
            '@': srcPath,
            '@/shared': path.resolve(srcPath, 'shared'),
            '@/app': path.resolve(srcPath, 'app'),
            '@/utils': path.resolve(srcPath, 'utils'),
            '@/configs': path.resolve(srcPath, 'configs'),
            '@/stores': path.resolve(srcPath, 'stores'),
            '@/assets': path.resolve(srcPath, 'assets'),
        },
    },
};
