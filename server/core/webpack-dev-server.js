var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var cwd = process.cwd();

var portWebpack = process.env.PORT_WEBPACK || 5040;

var config = require(cwd + '/config/webpack.dev.js');
config.entry.main.unshift('webpack-dev-server/client?http://localhost:' + portWebpack + '/');
var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    noInfo: true,
    colors: true
});
server.listen(portWebpack, function (err) {
    if (err) {
        console.error(err)
    } else {
        console.log('Webpack Server is ready at : ' + portWebpack)
    }
});