import fs, { existsSync, statSync } from 'node:fs';
import path, { resolve } from 'node:path';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

export function readFile(filePath) {
  let data = null;

  if (fs.existsSync(filePath)) {
    try {
      data = fs.readFileSync(filePath, 'utf8');
    } catch (error) {
      console.error(
        `Got an error trying to read the ${filePath}: ${error.message}`
      );
    }
  } else {
    console.warn(`${filePath} file not found`);
  }

  return data;
}

export function getDataByFileName(file, dataPath) {
  const fileName = path.basename(file, path.extname(file));
  const dataFilePath = path.join(dataPath, `${fileName}.json`);
  const fileContent = readFile(dataFilePath);

  return JSON.parse(fileContent);
}

export function mergeJSON() {
  let cache = {};

  return (dir) => {
    const jsonFiles = fs
      .readdirSync(dir)
      .filter((file) => file.endsWith('.json'));

    for (let i = 0, { length } = jsonFiles; i < length; i++) {
      const filePath = path.join(dir, jsonFiles[i]);
      const statsFile = fs.statSync(filePath);
      const key = path.basename(filePath, '.json').replace('-', '_');

      if (!cache[key] || cache[key].modificationTime < statsFile.mtimeMs) {
        cache[key] = {
          data: JSON.parse(readFile(filePath)),
          modificationTime: statsFile.mtimeMs,
        };
      }
    }

    return Object.keys(cache).reduce(
      (acc, key) => ((acc[key] = cache[key].data), acc),
      {}
    );
  };
}

export function handleError(errorTitle) {
  return plumber({
    errorHandler: notify.onError({
      title: errorTitle,
      message: 'Error <%= error.message %>',
    }),
  });
}
