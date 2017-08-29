const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget:'commonjs2'
  },
  target:'node',
  // module:{
  //   noParse:[/^[a-z\-0-9]+$/]
  // },
  // externals:/^[a-z\-0-9]+$/,
  plugins:[
    new webpack.ContextReplacementPlugin(/.*$/, /a^/)
  ],
  // resolve:{
  //   modules:[
  //     "node_modules",
  //     path.resolve(__dirname, 'src')
  //   ]
  // }
};