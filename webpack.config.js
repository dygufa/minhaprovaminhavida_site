const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ImageMinPlugin = require("imagemin-webpack-plugin").default;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const shouldBuildForProduction = process.env.NODE_ENV === "production";
const hash = shouldBuildForProduction ? "[chunkhash]" : "[name].[hash]";

const devServerHost = "localhost";
const devServerPort = 6016;

const cssLoader = (modules = false) => ({
	loader: "css-loader",
	options: {
		modules,
		importLoaders: 1,
		localIdentName: "[path].[name].[local]",
	},
});

const postCssLoader = {
	loader: "postcss-loader",
	options: {
		plugins: () => [require("autoprefixer")],
	},
};

const sassLoader = {
	loader: "sass-loader",
	options: {
		includePaths: ["./src/style"],
	},
};

const styleLoader = "style-loader";

module.exports = {
	cache: true,
	entry: "./src/index",
	output: {
		pathinfo: true,
		publicPath: "/",
		filename: "bundle.[hash].js",
		chunkFilename: `chunk.${hash}.js`,
		path: path.join(__dirname, 'dist'),
		sourceMapFilename: "bundle.[hash].js.map",
	},

	devtool: shouldBuildForProduction ? "source-map" : "source-map",

	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
	},

	module: {
		rules: [
			{
				test: /react-icons.*\.js$/,
				loader: "babel-loader",
			},
			{
				test: /\.tsx?$/,
				use: ["babel-loader", "awesome-typescript-loader"],
			},
			{
				test: /\.css/,
				use: ExtractTextPlugin.extract({
					fallback: styleLoader,
					use: [cssLoader(false), postCssLoader],
				}),
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: styleLoader,
					use: [
						cssLoader(true),
						postCssLoader,
						sassLoader,
					],
				}),
			},
			{
				test: /\.woff(2)?(\?v=[0-9].[0-9].[0-9])?$/,
				use: [
					{
						loader: "url-loader",
						options: {
							mimetype: "application/font-woff",
						},
					},
				],
			},
			{
				test: /\.(ttf|otf|eot)(\?v=[0-9].[0-9].[0-9])?$/,
				loader: [
					{
						loader: "file-loader",
						options: {
							name: "[name].[ext]",
						},
					},
				],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							hash: "sha512",
							digest: "hex",
							name: "[name].[ext]",
						},
					},
				],
			},
		],
	},

	plugins: [
		new ExtractTextPlugin({
			filename: "style-[contenthash].css",
			disable: !shouldBuildForProduction,
			allChunks: true,
		}),
		new webpack.ExtendedAPIPlugin(),
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify(
				process.env.NODE_ENV || "development",
			),
		}),
		new HtmlWebpackPlugin({
			title: "MPMV",
			filename: "index.html",
			template: `./src/index.html`,
			inject: "head"
		}),
		...(shouldBuildForProduction
			? [
				// new FaviconsWebpackPlugin(`${dir}assets/favicon-ball.png`),
				new webpack.HashedModuleIdsPlugin(),
				new webpack.optimize.AggressiveMergingPlugin({
					minSize: 1024 * 50,
					maxSize: 1024 * 100,
				}),
				new webpack.optimize.CommonsChunkPlugin({
					children: true,
					minChunks: 2,
					async: true,
				}),
				new webpack.LoaderOptionsPlugin({
					minimize: true,
					debug: false,
				}),
				new webpack.optimize.OccurrenceOrderPlugin(),
				// new webpack.optimize.UglifyJsPlugin({
				// 	sourceMap: false,
				// 	mangle: true,
				// }),
				new ImageMinPlugin({
					gifsicle: {
						interlaced: true,
					},
					optipng: {
						enable: true,
						optimizationLevel: 7,
					},
					pngquant: {
						quality: "65-90",
						speed: 4,
					},
					mozjpeg: {
						progressive: true,
						quality: 65,
					},
				}),
			]
			: [
				// new webpack.NamedModulesPlugin(),
				// new webpack.HotModuleReplacementPlugin()
			]),
	],

	devServer: {
		inline: true,
		port: devServerPort,
		host: devServerHost,
		historyApiFallback: true,
		disableHostCheck: true,
	},

	node: {
		fs: "empty",
	},
};
