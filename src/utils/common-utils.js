import { BASE_ROUTE } from '../const';

export const getUrl = (...path) => `/${path.join('/')}`.replace('//', '/');
export const getStaticUrl = (...path) => `${BASE_ROUTE}${path.join('/')}`.replace('//', '/');

export const getImageSize = async (src) => new Promise((resolve) => {
  const image = new Image();

  image.addEventListener('load', () => {
    resolve({
      height: image.naturalHeight,
      width: image.naturalWidth,
    });
  });

  image.addEventListener('load', () => {
    resolve({
      height: image.naturalHeight,
      width: image.naturalWidth,
    });
  });

  image.src = src;
});
