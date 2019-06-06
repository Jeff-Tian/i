const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

module.exports = new FaviconsWebpackPlugin({
  logo: "./src/static/images/logo.jpg",
  title: "My Order Management System",
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: true,
    opengraph: true,
    twitter: true,
    yandex: false,
    windows: true
  }
});
