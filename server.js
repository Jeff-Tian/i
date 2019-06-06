const fs = require("fs");

const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const path = require("path");

const app = express();
const config = require("./webpack.dev.js");
const compiler = webpack(config);

app.use(function (req, res, next) {
  console.log('url = ', req.url)

  if (req.url.startsWith('/lib')) {
    return res.sendFile(path.resolve(__dirname, req.url.replace('/lib', 'node_modules')))
  }
  next()
})

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
);

app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static("src/site-pages"));

app.use("*", function (req, res, next) {
  const filename = path.join(compiler.outputPath, `index.html`);

  compiler.outputFileSystem.readFile(filename, function (err, result) {
    if (err) {
      console.log(fs.readdirSync(compiler.outputPath));
      console.error(req.url, filename);
      return next(err);
    }

    res.set("content-type", "text/html");
    res.send(result);
    res.end();
  });
});

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log("app listening on port 3000!\n");
});
