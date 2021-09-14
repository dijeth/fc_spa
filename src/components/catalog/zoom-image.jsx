import React from 'react';
import PropTypes from 'prop-types';
import { ZOOM_WIDTH } from '../../const';

const getImageSize = async (src) => new Promise((resolve) => {
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

const getBackgroundPosition = (clientX, clientY, containerRect, imageW, imageH) => {
  const kContainer = containerRect.width / containerRect.height;
  const kImage = imageW / imageH;

  const zoomedImageW = ZOOM_WIDTH;
  const zoomedImageH = ZOOM_WIDTH / kImage;

  const [lookW, lookH] = kImage < kContainer
    ? [kImage * containerRect.height, containerRect.height]
    : [containerRect.width, containerRect.width / kImage];

  const dX = clientX - containerRect.left - (containerRect.width - lookW) / 2;
  const dY = clientY - containerRect.top - (containerRect.height - lookH) / 2;

  const DX = (dX * zoomedImageW) / lookW;
  const DY = (dY * zoomedImageH) / lookH;

  return {
    x: clientX - containerRect.left - DX,
    y: clientY - containerRect.top - DY,
  };
};

const ZoomImage = ({ src, children }) => {
  const refContainer = React.useRef();
  const refInner = React.useRef();
  const [image, setImage] = React.useState();

  React.useEffect(() => {
    refContainer.current.addEventListener('mouseenter', () => {
      getImageSize(src).then(({ width, height }) => {
        setImage({ width, height });
      });
    });
  }, []);

  React.useEffect(() => {
    if (refInner.current) {
      const element = refInner.current;
      const rect = element.getBoundingClientRect();

      const mouseMoveHandler = (evt) => {
        const { x, y } = getBackgroundPosition(
          evt.clientX,
          evt.clientY,
          rect,
          image.width,
          image.height,
        );

        element.style.backgroundColor = '#fff';
        element.style.backgroundPositionX = `${x}px`;
        element.style.backgroundPositionY = `${y}px`;
        // element.style.backgroundSize = `${ZOOM_WIDTH}px ${ZOOM_WIDTH / (image.width / image.height)}px`;
      };

      const mouseLeaveHandler = () => {
        element.removeEventListener('mouseleave', mouseMoveHandler);
        element.removeEventListener('mouseleave', mouseLeaveHandler);
        setImage(null);
      };

      element.addEventListener('mousemove', mouseMoveHandler);
      element.addEventListener('mouseleave', mouseLeaveHandler);
    }
  }, [image]);

  return (
    <div className="zoom" ref={refContainer}>
      {
        image
          ? <div className="zoom__inner" style={{ backgroundImage: `url(${src})`, backgroundSize: `${ZOOM_WIDTH}px ${ZOOM_WIDTH / (image.width / image.height)}px` }} ref={refInner} />
          : ''
      }
      {children}
    </div>
  );
};

ZoomImage.propTypes = {
  src: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

ZoomImage.defaultProps = {};

export default ZoomImage;
