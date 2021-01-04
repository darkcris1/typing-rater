const path = require("path");
const HtmlLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PrettierPlugin = require("prettier-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isDev = process.env.NODE_ENV === "development";
const plugin = [
		new HtmlLWebpackPlugin({
			template: "./src/index.html",
		}),
		isDev ? null : new MiniCssExtractPlugin({
			filename:"styles/[name].[contentHash].css",
		}),
		isDev ? null : new PrettierPlugin(),
		isDev ? null : new CleanWebpackPlugin(),
	].filter(val=> val !== null);
	
module.exports = {
	entry: "./src/index.js",
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "index_bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				}
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					!isDev ? MiniCssExtractPlugin.loader : "style-loader",
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(mp[34]|jpe?g|png|svg|gif)$/i,
				loader: "file-loader?name=/images/[name]-[hash].[ext]"
			}
		]
	},
	devServer: {
		port: Math.floor(Math.random() * (8500-1000)) + 1000,
	},
	plugins: plugin,
};