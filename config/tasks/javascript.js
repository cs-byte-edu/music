import { src, dest } from "gulp";
import webpack from "webpack-stream";
import { projectPath } from "../settings.js";
import { handleError } from "../utils.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function processJS(isDev, serverInstance) {
  return () =>
    src(projectPath.src.js, { sourcemaps: isDev })
      .pipe(handleError("Error processing js..."))
      .pipe(
        webpack({
          mode: isDev ? "development" : "production",
          module: {
            rules: [
              {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
              },
            ],
          },
          plugins: [
            new MiniCssExtractPlugin({
              filename: "../css/vendor.css",
            }),
          ],
          resolve: {
            modules: ["node_modules"],
          },
          output: {
            filename: "index.min.js",
          },
        })
      )
      .pipe(dest(projectPath.dist.js))
      .pipe(serverInstance.stream());
}
