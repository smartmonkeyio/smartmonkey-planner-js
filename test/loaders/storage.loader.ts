import * as fs from 'fs';

export const files = {
  text1: fs.readFileSync(`test/files/text.txt`),
  imgSmall: fs.readFileSync(`test/files/black.png`),
  imgMedium: fs.readFileSync(`test/files/img1.jpg`),
};
