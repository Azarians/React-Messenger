const { StylableWebpackPlugin } = require('@stylable/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require("webpack");
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const path = require('path');

const envVariables = {
  "process.env.FB_API_KEY": "AIzaSyCQuiaqECfBKjETFi-I61XXKTbOh6B3aLM",
  "process.env.FB_AUTH_DOMAIN": "messaging-832f1.firebaseapp.com",
  "process.env.FB_PROJECT_ID": "messaging-832f1",
  "process.env.FB_STORAGE_BUCKET": "messaging-832f1.appspot.com",
  "process.env.FB_MESSAGING_SENDER_ID": "168576274004",
  "process.env.FB_APP_ID": "1:168576274004:web:37b3c5cbb0814eea00e7c1",
}

/** @type {import('webpack').Configuration} */
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        https: true,
        disableHostCheck: true,
    },
    output: {
      filename: "index.js",
    },
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            },
            {
                test: /\.scss$/,
                include: [
                    path.join(__dirname, 'node_modules/wix-animations'),
                    path.join(__dirname, 'node_modules/wix-style-react'),
                    path.join(__dirname, 'node_modules/bootstrap-sass'),
                ],
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]',
                                exportLocalsConvention: 'camelCase',
                            },
                        },
                    },
                    {
                        loader: 'resolve-url-loader',
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.css?$/,
                exclude: /\.st.css?$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'React Messenger' }),
        new HtmlWebpackExternalsPlugin({
            externals: [
                {
                    module: 'wix',
                    entry: '//static.parastorage.com/services/js-sdk/1.425.0/js/wix.min.js',
                    global: 'Wix',
                },
                {
                  module: 'Helvetica',
                  entry: {
                    path: '//static.parastorage.com/services/third-party/fonts/Helvetica/fontFace.css',
                    type: 'css',
                  },
                },
            ],
        }),
        new StylableWebpackPlugin({
            outputCSS: false,
            includeCSSInJS: true
        }),
        new Webpack.DefinePlugin(envVariables),
    ],
};
