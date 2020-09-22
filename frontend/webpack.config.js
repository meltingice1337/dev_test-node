const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { ProgressPlugin } = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const isDevelopment = process.env.npm_lifecycle_event === 'dev';
const appSourcePath = path.join(__dirname, 'src');

const config = {
	entry: './src/index.tsx',
	devtool: isDevelopment ? 'source-map' : '',
	devServer: {
		historyApiFallback: true,
		contentBase: appSourcePath,
		compress: true,
		overlay: true
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.scss', '.css'],
	},
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'js/[name].[hash].js',
		chunkFilename: 'js/[name].[chunkhash].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				exclude: /node_modules/,
				include: appSourcePath,
				test: /\.(js|jsx|mjs|ts|tsx)$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheCompression: true,
							cacheDirectory: true,
							compact: true
						}
					}
				]
			},
			{
				test: /\.(scss|css)$/i,
				use: [
					isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [autoprefixer]
						}
					},
					'sass-loader'
				],
			},
		]
	},
	plugins: [
		new ProgressPlugin(),
		new FriendlyErrorsWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
	]
};

if (!isDevelopment) {
	config.plugins.push(
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash:8].css',
			chunkFilename: 'css/[id].[hash:8].css'
		})
	);

	config.optimization = {
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: false,
				extractComments: false,
				terserOptions: {
					compress: {
						arrows: true,
						booleans: true,
						collapse_vars: true,
						comparisons: true,
						conditionals: true,
						dead_code: true,
						evaluate: true,
						hoist_funs: true,
						hoist_props: true,
						hoist_vars: true,
						if_return: true,
						inline: true,
						loops: true,
						negate_iife: true,
						properties: true,
						reduce_funcs: true,
						reduce_vars: true,
						sequences: true,
						switches: true,
						toplevel: true,
						typeofs: true,
						unused: true
					},
					mangle: {
						safari10: true
					},
					output: {
						ascii_only: true,
						comments: false,
						ecma: 6
					},
					parse: {
						ecma: 8
					}
				},
				test: /\.js(\?.*)?$/i,
				warningsFilter: () => true
			})
		],
		splitChunks: {
			name: true,
			chunks: 'all'
		}
	};
}

module.exports = config;