const path = require('node:path');

module.exports = {
  mode: 'development',
  entry: './src/slackClone/public/slack.ts',
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '.dist'),
    publicPath: '/dist/',
  },
};

//   {
//     output: {
//       filename: './client/bundle.js',
//     },
//     name: 'client',
//     entry: './src/slack.ts',
//     mode: 'development',
//   },
//   {
//     output: {
//       filename: './server/server.js',
//       entry: '.src/namespace.ts',
//       mode: 'development',
//     },
//   },
// };
