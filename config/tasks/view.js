import { src, dest } from "gulp";
import pug from "gulp-pug";
import _replace from "gulp-replace";
import { mergeJSON } from "../utils.js";
import { handleError } from "../utils.js";
import { projectPath } from "../settings.js";

export function processPug(isDev, serverInstance) {
  const locals = mergeJSON()(projectPath.src.data);
  const cssPath = isDev ? "css/index.css" : "css/index.min.css";
  return () =>
    src("./src/pug/*.pug")
      .pipe(handleError("Pug processing error..."))
      .pipe(
        pug({
          locals,
        })
      )
      .pipe(_replace(/@img\//g, "img/"))
      .pipe(_replace(/@css\/index\.css/g, cssPath))
      .pipe(dest(projectPath.distFolder))
      .pipe(serverInstance.stream());
}
