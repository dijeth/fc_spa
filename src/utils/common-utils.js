export const getUrl = (...path) => `/${path.join('/')}`.replace('//', '/');

export const getImage = async (src) => new Promise((resolve) => {
  const image = new Image();

  image.addEventListener('load', () => {
    resolve(image);
  });

  image.src = src;
});

export const getImageSize = async (src) => getImage(src)
  .then(({ naturalWidth, naturalHeight }) => ({
    width: naturalWidth,
    height: naturalHeight,
  }));
