const path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    index: './src/index.js',
    create_user: ['./src/index.js', './src/create_user.js', './node_modules/croppie/croppie.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/js')
  },
  plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
  ],
  module: {
    rules: [
      { test: /\.scss$/, loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]}
  ]
},
resolve: {
  alias: {
      // Force all modules to use the same jquery version.
      'jquery': path.join(__dirname, 'node_modules/jquery/src/jquery')
  }
}
};
