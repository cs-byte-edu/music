import { src, dest } from "gulp";
import _if from "gulp-if";
import _replace from "gulp-replace";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import postcss from "gulp-postcss";
import cssnano from "cssnano";
import sourcemaps from "gulp-sourcemaps";
import autoprefixer from "autoprefixer";
import postcssGroupMedia from "postcss-sort-media-queries";
import rename from "gulp-rename";
import { projectPath } from "../settings.js";
import { handleError } from "../utils.js";

const sass = gulpSass(dartSass);

export const processSCSS = (isDev, serverInstance) => {
  return () =>
    src(projectPath.src.scss)
      .pipe(handleError("SCSS processing error..."))
      .pipe(_if(isDev, sourcemaps.init()))
      .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
      .pipe(_replace(/@img\//g, "../img/"))
      .pipe(
        _if(
          isDev,
          postcss([autoprefixer(), postcssGroupMedia()]),
          postcss([autoprefixer(), postcssGroupMedia(), cssnano()])
        )
      )
      .pipe(_if(!isDev, rename({ extname: ".min.css" })))
      .pipe(_if(isDev, sourcemaps.write("./")))
      .pipe(dest(projectPath.dist.css))
      .pipe(serverInstance.stream());
};
