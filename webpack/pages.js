const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");

const sitePages = fs.readdirSync("src/site-pages");
const functionalPages = fs.readdirSync("src/function-pages");
const sitePagesEn = fs.readdirSync("src/site-pages-en");
const sitePagesEnBlotter = fs.readdirSync("src/site-pages-en/blotter");

const entries = {};

sitePages.map(f => {
    if (fs.lstatSync(path.join("src/site-pages", f)).isFile()) {
        entries[path.basename(f, path.extname(f))] = [
            `./src/site-pages/${f}`,
            "webpack-hot-middleware/client"
        ];
    }
});

sitePagesEn.map(f => {
    if (fs.lstatSync(path.join("src/site-pages-en/", f)).isFile()) {
        entries["en/" + path.basename(f, path.extname(f))] = [
            `./src/site-pages-en/${f}`,
            `webpack-hot-middleware/client`
        ];
    }
});

sitePagesEnBlotter.map(f => {
    entries["en/blotter" + path.basename(f, path.extname(f))] = [
        `./src/site-pages-en/blotter/${f}`,
        `webpack-hot-middleware/client`
    ];
});

functionalPages.map(f => {
    entries[path.basename(f, path.extname(f))] = [
        `./src/function-pages/${f}`,
        "webpack-hot-middleware/client"
    ];
});

module.exports = {
    entries,
    plugins: [
        ...sitePages.map(
            p =>
                new HtmlWebpackPlugin({
                    filename: `${path.basename(p, path.extname(p))}.html`,
                    title: "My Order Management System",
                    chunks: [path.basename(p, path.extname(p)), "vendors~index", "index"],
                    template: "src/templates/index.html"
                })
        ),
        ...sitePagesEn.map(
            p =>
                new HtmlWebpackPlugin({
                    filename: `en/${path.basename(p, path.extname(p))}.html`,
                    title: "My Order Management System",
                    chunks: [path.basename(p, path.extname(p)), "vendors~index", "index"],
                    template: "src/templates/index.html"
                })
        ),
        ...sitePagesEnBlotter.map(
            p =>
                new HtmlWebpackPlugin({
                    filename: `en/blotter/${path.basename(p, path.extname(p))}.html`,
                    title: "My Order Management System",
                    chunks: [
                        `en/blotter${path.basename(p, path.extname(p))}`,
                        "en/vendors~index",
                        "index"
                    ],
                    template: "src/templates/index.html"
                })
        ),
        ...functionalPages.map(
            p =>
                new HtmlWebpackPlugin({
                    filename: `${path.basename(p, path.extname(p))}.html`,
                    title: "跳转中……",
                    chunks: [path.basename(p, path.extname(p))]
                })
        ),
    ]
};
