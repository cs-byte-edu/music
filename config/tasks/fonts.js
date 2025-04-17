import { src, dest, series } from 'gulp';
import fonter from 'gulp-fonter-fix';
import ttf2woff2 from 'gulp-ttf2woff2';
import rename from 'gulp-rename';
import { projectPath } from '../settings.js';
import { handleError } from '../utils.js';
import path from 'node:path';

export const convertOtfToTtf = () => {
  return src(`${projectPath.srcFolder}/fonts/*.otf`, {})
    .pipe(handleError('Error convert oft to ttf...'))
    .pipe(
      fonter({
        formats: ['ttf'],
      })
    )
    .pipe(dest(`${projectPath.srcFolder}/fonts/`));
};

export const ttfToWoff = (done) => {
  return src(`${projectPath.srcFolder}/fonts/**/*.ttf`, { encoding: false })
    .pipe(handleError('Error convert ttf to woff...'))
    .pipe(
      fonter({
        formats: ['woff'],
      })
    )
    .pipe(dest(`${projectPath.srcFolder}/fonts/converted`))
    .pipe(src(`${projectPath.srcFolder}/fonts/**/*.ttf`, { encoding: false }))
    .pipe(ttf2woff2())
    .pipe(dest(`${projectPath.srcFolder}/fonts/converted`));
};

export function copyWoffAndWoff2() {
  return src('./src/fonts/converted/*.{woff, woff2}')
    .pipe(
      rename((filePath) => {
        const folderName = path.basename(
          filePath.basename,
          path.extname(filePath.basename)
        );
        filePath.dirname = folderName;
      })
    )
    .pipe(dest(`${projectPath.srcFolder}/fonts/converted`));
}

export const convertTtfToWoff = series(ttfToWoff, copyWoffAndWoff2);

export function copyFonts() {
  return src(`${projectPath.srcFolder}/fonts/**/*.{ttf,woff,woff2,svg,eot}`)
    .pipe(handleError('Copy fonts error..'))
    .pipe(dest(projectPath.dist.fonts));
}
