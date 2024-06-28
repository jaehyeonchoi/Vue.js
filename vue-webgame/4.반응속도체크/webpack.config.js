const path = require('path');
const {VueLoaderPlugin} = require("vue-loader");
//경로 설정을 도와주는 모듈

module.exports = {
    mode: 'development',
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.vue'],
    },
    devServer: {
        devMiddleware: {
            publicPath:'/dist'
        },
        static: {
            directory: path.resolve(__dirname)
        },
        hot:true
    },
    entry: {
        //app: './main.js', // app, main 등의 이름은 정하기 나름
        app: path.join(__dirname, 'main.js'),//현재 디렉토리에서 'main.js'의 이름을 갖는 요소 경로
    },
    module: { //js가 아닌 파일들을 js 파일로 통합시켜주는 역할 (webpack의 가장 주요한 기능)
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader', //use 대신 loader라는 키워드도 사용 가능 (loader 지원 안하는 경우 많으므로 그냥 use 사용하도록 하자)
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                'css-loader',
            ]
        }],
    },
    plugins: [ //output이 나오기 전에 추가적으로 전처리를 해주는 역할 (부가적인 역할)
        new VueLoaderPlugin()
    ],
    output: {
        filename: 'app.js', //[name].js로 적으면 알아서 app.js로 처리해줌
        //path: './dist' // dist 등의 이름은 정하기 나름
        path: path.join(__dirname, 'dist'),//현재 디렉토리에서 'dist'의 이름을 갖는 요소 경로
        publicPath:'/dist'
    },
};