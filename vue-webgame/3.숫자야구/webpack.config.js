const path = require('path');
const {VueLoaderPlugin} = require("vue-loader");
//경로 설정을 도와주는 모듈

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.vue'],
    },
    entry: {
        //app: './main.js', // app, main 등의 이름은 정하기 나름
        app: path.join(__dirname, 'main.js'),//현재 디렉토리에서 'main.js'의 이름을 갖는 요소 경로
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
        }],
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    output: {
        filename: 'app.js', //[name].js로 적으면 알아서 app.js로 처리해줌
        //path: './dist' // dist 등의 이름은 정하기 나름
        path: path.join(__dirname, 'dist'),//현재 디렉토리에서 'dist'의 이름을 갖는 요소 경로
    },
};