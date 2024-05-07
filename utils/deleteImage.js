import fs from 'fs';

import path from 'path';

export const deleteImage = (image, imagePath) => {
  const __dirname = path.resolve(path.dirname(''));
  const pathToImage = path.resolve(__dirname, './src/static/' + imagePath + '/' + image);

  fs.unlink(pathToImage, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
