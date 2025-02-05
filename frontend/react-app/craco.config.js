// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Tambahkan rule untuk source-map-loader yang mengecualikan modul @paypal/react-paypal-js
        webpackConfig.module.rules.push({
          test: /\.js$/,
          enforce: 'pre',
          use: ['source-map-loader'],
          exclude: /node_modules[\\/]@paypal[\\/]react-paypal-js/,
        });
        return webpackConfig;
      },
    },
  };
  