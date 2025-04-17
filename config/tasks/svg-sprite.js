import { src, dest } from "gulp";
import svgSprite from "gulp-svg-sprite";

const config = {
  mode: {
    symbol: {
      sprite: "sprite.svg",
      //example: true
    },
  },
  shape: {
    id: {
      separator: "",
      generator: "icon-",
    },
    transform: [
      {
        svgo: {
          plugins: [
            { name: "removeTitle", active: true },
            { name: "removeXMLNS", active: true },
            { name: "convertPathData", active: false },
            { name: "removeViewBox", active: false },
            {
              name: "removeAttrs",
              params: { attrs: "(fill|stroke|style)" },
            },
          ],
        },
      },
    ],
  },
  svg: {
    rootAttributes: {
      style: "display: none;",
      "aria-hidden": true,
    },
    xmlDeclaration: false,
  },
};

const pathToIcons = "./src/img/icons/*.svg";
const pathIconDest = "./src/img";

export function svgIcons() {
  return src(pathToIcons).pipe(svgSprite(config)).pipe(dest(pathIconDest));
}
