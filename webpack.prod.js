const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const ASSET_PATH = process.env.ASSET_PATH || "/";
const webpack = require("webpack");
const pages = require("./webpack/pages");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const stocks = require("./src/cache/market-all.json");
const exec = require("child_process").exec;

module.exports = {
  mode: "production",
  entry: pages.entries,
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    ...pages.plugins,
    {
      apply: compiler => {
        compiler.hooks.afterEmit.tap("AfterEmitPlugin", compilation => {
          stocks.map(stock => {
            exec(
              `cp dist/en/blotter/1234.html dist/en/blotter/${stock.code}.html`,
              (err, stdout, stderr) => {
                if (stdout) process.stdout.write(stdout);
                if (stderr) process.stderr.write(stderr);
              }
            );
          });
        });
      }
    },
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    }),
    new webpack.DefinePlugin({
      "process.env.ASSET_PATH": JSON.stringify(ASSET_PATH)
    }),
    require("./webpack/favicon"),
    new CopyPlugin([
      { from: "src/site-pages/images", to: "images", toType: "dir" },
      { from: "src/static", to: "", toType: "dir" },
      { from: "node_modules/react", to: "lib/react", toType: "dir" },
      { from: "node_modules/react-dom", to: "lib/react-dom", toType: "dir" },
      {
        from: "node_modules/react-router",
        to: "lib/react-router",
        toType: "dir"
      },
      {
        from: "node_modules/react-router-dom",
        to: "lib/react-router-dom",
        toType: "dir"
      },
      {
        from: "node_modules/ag-grid-community",
        to: "lib/ag-grid-community",
        toType: "dir"
      },
      {
        from: "node_modules/ag-grid-react",
        to: "lib/ag-grid-react",
        toType: "dir"
      }
    ])
  ],
  output: {
    filename: chunkData => {
      console.log("chunkData = ", chunkData.chunk.name);
      // if(chunkData.chunk.name )
      return "[name].[hash].js";
    },
    path: path.resolve(__dirname, "dist"),
    publicPath: ASSET_PATH
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  module: require("./webpack/module.js"),
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
    AgGridReact: "AgGridReact"
  }
};
