import { src, dest } from 'gulp';
import spritesmith from 'gulp.spritesmith';
import { projectPath } from '../settings.js';

export const sprites = () => {
  const data = src(projectPath.src.icons).pipe(
    spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      imgPath: iconSpritePath,
      cssVarMap: (sprite) => {
        sprite.name = `icon-${sprite.name}`;
      },
    })
  );
  data.img.pipe(dest(projectPath.dist.img));
  data.css.pipe(dest(projectPath.src.scss));

  return data;
};
