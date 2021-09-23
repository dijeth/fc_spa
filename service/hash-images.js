const path = require('path');
const fs = require('fs');
const { hash } = require('./hash');
const { data } = require('../src/mock-data/data');

const ImageType = {
  MAIN: '',
  THRUMBNAIL: 'thrumbnails',
  ZOOM: 'zoom',
};

const hashing = async (images) => Promise.all(images.map((it) => new Promise((res) => {
  const { path: filename } = it;
  hash(filename).then((imageHash) => {
    res({
      ...it,
      hash: `${imageHash}.jpg`,
    });
  });
})));

const getImages = (imageType) => {
  const imageCollections = data.map((catalog) => {
    const sectionsImages = catalog.sections.map((section) => section.items.map((it) => {
      const sectionLink = catalog.sections.length > 1 ? section.link : '';

      return {
        path: path.resolve(
          process.cwd(),
          'src',
          'img',
          catalog.brandLink,
          catalog.link,
          sectionLink,
          imageType,
          `${it.photo}.jpg`,
        ),
        id: it.id,
      };
    }));

    return [].concat(...sectionsImages);
  });

  return [].concat(...imageCollections);
};

const getHashingImages = async () => Promise.all(Object.values(ImageType).map(async (it) => hashing(getImages(it))));

const saveHashingImages = async (images, imageType) => Promise.all(images.map((it) => fs.promises.copyFile(it.path, path.resolve(process.cwd(), 'public', 'img', imageType, it.hash))));

const saveData = (catalogData, looks, thrumbnails, zoomImages) => {
  const correctedData = catalogData.map((catalog) => ({
    ...catalog,
    sections: catalog.sections.map((section) => ({
      ...section,
      items: section.items.map((it) => ({
        ...it,
        look: looks.find((jt) => jt.id === it.id).hash,
        thrumbnail: thrumbnails.find((jt) => jt.id === it.id).hash,
        zoom: zoomImages.find((jt) => jt.id === it.id).hash,
      })),
    })),
  }));

  const fileData = `export const data = JSON.parse(\`\n${JSON.stringify(correctedData)}\n\`);\n`;

  fs.writeFileSync(path.resolve(process.cwd(), 'src', 'mock-data', `data-${(new Date()).valueOf()}.json`), fileData, { flag: 'w' });
};

(async () => {
  const [mainImages, thrumbnails, zoomImages] = await getHashingImages();
  saveHashingImages(thrumbnails, ImageType.THRUMBNAIL);
  saveHashingImages(zoomImages, ImageType.ZOOM);
  saveHashingImages(mainImages, 'looks');

  saveData(data, mainImages, thrumbnails, zoomImages);
})();
