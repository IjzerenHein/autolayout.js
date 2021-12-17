const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env,{mode})=> {

    process.env.CASSOWARYJS = env ? env.CASSOWARYJS : '';
    const postfix = (env && env.CASSOWARYJS) ? '.cassowary' : '';

    return {
        entry: './src/AutoLayout.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `autolayout${postfix}.js`,
            libraryTarget:'umd',
            library: 'autolayout',
            globalObject: 'this'
        },
        devtool:'source-map',
        module:{
            rules: [{
                test: /\.js$/,
                use: ['webpack-conditional-loader']
            }]
        },
        plugins: [
            new CopyWebpackPlugin([
                {from:'./src/autolayout.d.ts', to:'./'},
            ])]
    }
};
