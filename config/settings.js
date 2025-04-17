const distFolder = "./dist";
const srcFolder = "./src";

export const projectPath = {
  dist: {
    js: `${distFolder}/js`,
    css: `${distFolder}/css`,
    fonts: `${distFolder}/fonts`,
    img: `${distFolder}/img`,
  },
  src: {
    pug: `${srcFolder}/pug/*.pug`,
    js: `${srcFolder}/js/index.js`,
    scss: `${srcFolder}/scss/index.scss`,
    img: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp,svg,mp4}`,
    icons: `${srcFolder}/icons/*.{jpg,jpeg,png,gif,webp}`,
    iconsSVG: `${srcFolder}/svgicons/*.svg`,
    data: `${srcFolder}/data`,
    fonts: `${srcFolder}/fonts/*.*`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    pug: `${srcFolder}/pug/**/*.pug`,
    data: `${srcFolder}/data/**/*.json`,
    img: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
  },
  distFolder,
  srcFolder,
};
