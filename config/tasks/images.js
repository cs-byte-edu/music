import { src, dest } from "gulp";
import imagemin, { svgo, mozjpeg, optipng, gifsicle } from "gulp-imagemin";
import newer from "gulp-newer";
import _if from "gulp-if";
import { projectPath } from "../settings.js";
import { handleError } from "../utils.js";

export function processImages(isDev, serverInstance) {
  return () =>
    src(projectPath.src.img, { encoding: false })
      .pipe(handleError("Images processing error..."))
      .pipe(newer(projectPath.dist.img))
      .pipe(
        _if(
          !isDev,
          imagemin([
            svgo({ plugins: [{ name: "removeViewBox", active: false }] }),
            mozjpeg({ quality: 70, progressive: true }),
            optipng({ optimizationLevel: 3 }),
            gifsicle({ interlaced: true }),
          ])
        )
      )
      .pipe(dest(projectPath.dist.img))
      .pipe(serverInstance.stream());
}
