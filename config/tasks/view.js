import { src, dest } from 'gulp';
import pug from 'gulp-pug';
import _replace from 'gulp-replace';
import _if from 'gulp-if';
import { mergeJSON } from '../utils.js';
import { handleError } from '../utils.js';
import { projectPath } from '../settings.js';

export function processPug(isDev, serverInstance) {
  const locals = mergeJSON()(projectPath.src.data);

  return () =>
    src('./src/pug/*.pug')
      .pipe(handleError('Pug processing error...'))
      .pipe(
        pug({
          locals,
          pretty: true,
        })
      )
      .pipe(_replace(/@img\//g, 'img/'))
      .pipe(
        _if(
          isDev,
          _replace(/@css\//g, 'css/index.css'),
          _replace(/@css\//g, 'css/index.min.css')
        )
      )
      .pipe(dest(projectPath.distFolder))
      .pipe(serverInstance.stream());
}
