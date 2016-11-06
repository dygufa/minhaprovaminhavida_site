var combineLoaders = require("webpack-combine-loaders");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "./dist/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loader: "babel?presets[]=es2015!ts-loader"
            },
            {
                test: /\.scss$/,
                loader: combineLoaders([
                    {
                        loader: "style"
                    },
                    {
                        loader: "css",
                        query: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: "[name]__[local]___[hash:base64:5]"
                        }
                    },
                    {
                        loader: "sass",
                        query: {
                            includePaths: [
                                "./src/styles"
                            ]
                        }
                    }
                ])
            }
        ],

        // preLoaders: [
        //     // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        //     {
        //         test: /\.js$/,
        //         loader: "source-map-loader"
        //     }
        // ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "redux": "Redux",
        "react-router": "ReactRouter",
        "react-redux": "ReactRedux"
    }
};
