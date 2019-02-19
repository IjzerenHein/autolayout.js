const path = require('path');

const config = {
	entry: './src/AutoLayout.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'autolayout.js',
        libraryTarget:'umd',
        library: 'autolayout',
        globalObject: 'this'
	},
    module:{
        rules: [{
            test: /\.js$/,
            use: ['webpack-conditional-loader']
        }]
    }

};

module.exports = config;
