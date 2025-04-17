import { series, parallel, task, watch, src, dest } from "gulp";
import browserSync from "browser-sync";
import { clean } from "./config/tasks/clean.js";
import { projectPath } from "./config/settings.js";
import { processPug } from "./config/tasks/view.js";
import { processImages } from "./config/tasks/images.js";
import { processJS } from "./config/tasks/javascript.js";
import { convertTtfToWoff } from "./config/tasks/fonts.js";
import { processSCSS } from "./config/tasks/scss.js";
import { copyFonts } from "./config/tasks/fonts.js";
import { svgIcons } from "./config/tasks/svg-sprite.js";

const isDev = !process.argv.includes("--build");

const server = browserSync.create();

const handlePug = processPug(isDev, server);
const handleImages = processImages(isDev, server);
const handleJS = processJS(isDev, server);
const handleSCSS = processSCSS(isDev, server);
const handleClean = clean();

const handleServer = () => {
  server.init({
    server: {
      baseDir: `${projectPath.distFolder}`,
    },
    logLevel: "info",
    cors: true,
    notify: true,
    open: true,
    reloadOnRestart: true,
    host: "localhost",
    port: 3000,
  });
};

const watcher = () => {
  watch(projectPath.watch.pug, handlePug);
  watch(projectPath.watch.scss, handleSCSS);
  watch(projectPath.src.img, handleImages);
  watch(projectPath.watch.js, handleJS);
};

const mainTask = parallel(
  handlePug,
  // copyFonts,
  handleImages,
  handleSCSS,
  handleJS
);

const buildTask = series(handleClean, mainTask);

const devTask = series(handleClean, mainTask, parallel(watcher, handleServer));

task("default", devTask);

export { processPug, processSCSS, handleImages, svgIcons, convertTtfToWoff };
