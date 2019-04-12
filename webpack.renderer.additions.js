const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
        entry:"./src/renderer/index.ts"
    },
    plugins: [
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: './index.html', //生成的html存放路径，相对于path
            entry:"./src/renderer/index.ts",
            template: "./src/renderer/index.html",
            inject: true, //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
        })
    ]
}
