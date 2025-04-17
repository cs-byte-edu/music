import { projectPath } from "../settings.js";
import { src, dest } from "gulp";
import concat from "gulp-concat";

export const combineCSS = () => {
  console.log("Combining CSS...");

  return src([`${projectPath.dist.css}/**/*.css`])
    .pipe(concat("style.min.css"))
    .pipe(dest(projectPath.dist.css));
};
