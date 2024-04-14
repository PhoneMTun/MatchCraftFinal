const webpack = require('webpack');

module.exports = {
  // Your existing configuration here...

  plugins: [
    // Other plugins here...
    
    new webpack.DefinePlugin({
      global: 'window', // Defines 'global' as 'window'
    }),
  ],
};
