const CompressionWebpackPlugin = require("compression-webpack-plugin");
const path = require("path");
// 是否为生产环境
const isProduction = process.env.NODE_ENV !== "development";

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: "/main/",
  outputDir: "dist",
  devServer: {
    port: 9527,
    transportMode: "ws",
    injectClient: false,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-plugin-px2rem")({
            rootValue: 19.2, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
            unitPrecision: 5, //允许REM单位增长到的十进制数字。

            mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
            minPixelValue: 3, //设置要替换的最小像素值(3px会被转rem)。 默认 0
          }),
        ],
      },
      // sass: {
      //   implementation: require("sass"),
      // },
    },
  },
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src"));
  },
  configureWebpack: (config) => {
    // 生产环境相关配置
    if (isProduction) {
      // 代码压缩
      // ..................
      // gzip压缩
      const productionGzipExtensions = ["html", "js", "css"];
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
          threshold: 10240, // 只有大小大于该值的资源会被处理 10240
          minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
          deleteOriginalAssets: false, // 删除原文件
        })
      );
    }

    // 公共代码抽离
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100,
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60,
          },
          styles: {
            name: "styles",
            test: /\.(sa|sc|c)ss$/,
            chunks: "all",
            enforce: true,
          },
          runtimeChunk: {
            name: "manifest",
          },
        },
      },
    };
  },
};
