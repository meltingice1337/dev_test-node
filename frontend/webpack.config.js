const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { ProgressPlugin } = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const dotenv = require('dotenv');

const isDevelopment = process.env.npm_lifecycle_event === 'dev';
const appSourcePath = path.join(__dirname, 'src');

const getEnvOBJ = () => {
	const dotenvConfOutput = dotenv.config();

	if (dotenvConfOutput.error) {
		return;
	}

	if (dotenvConfOutput.parsed) {
		const dotenvObj = dotenvConfOutput.parsed;

		return Object.keys(dotenvObj).reduce((acc, envVar) => {
			acc[`process.env.${envVar}`] = process.env[envVar]
				? JSON.stringify(process.env[envVar])
				: JSON.stringify(dotenvObj[envVar]);
			return acc;
		}, {});
	}

	return {};
};

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
		alias: {
			'@pages': path.join(appSourcePath, 'pages'),
			'@routes': path.join(appSourcePath, 'routes'),
			'@components': path.join(appSourcePath, 'components'),
			'@contexts': path.join(appSourcePath, 'contexts'),
			'@services': path.join(appSourcePath, 'services'),
			'@hooks': path.join(appSourcePath, 'hooks'),
			'@models': path.join(appSourcePath, 'models'),
			'@store': path.join(appSourcePath, 'store'),
			'@utils': path.join(appSourcePath, 'utils'),
		}
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
							postcssOptions: {
								ident: 'postcss',
								plugins: [autoprefixer]
							}
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
		new webpack.DefinePlugin(getEnvOBJ()),
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
				terserOptions: {
					output: {
						comments: false,
					}
				}
			})
		],
		splitChunks: {
			name: true,
			chunks: 'all'
		}
	};
}

module.exports = config;