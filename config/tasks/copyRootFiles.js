import { src, dest } from 'gulp';
import { handleError } from '../utils.js';
import { projectPath } from '../settings.js';

const config = {
  dot: true,
  allowEmpty: true,
};

const files = ['favicon.ico', '.htaccess'];

export const copyRootFiles = () => {
  return src(plugins.concat(projectPath.srcFolder, files), config)
    .pipe(handleError('Copy root files error...'))
    .pipe(dest(projectPaths.distFolder));
};
