import React from 'react';
import PropTypes from 'prop-types';
import { ZOOM_WIDTH } from '../../const';
import { getImageSize } from '../../utils/common-utils';

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
  const [image, setImage] = React.useState(null);
  const [enter, setEnter] = React.useState(false);

  React.useEffect(() => {
    const zoomElement = refContainer.current;

    const mouseLeaveHandler = () => {
      setImage(null);
      setEnter(false);

      zoomElement.removeEventListener('mouseleave', mouseLeaveHandler);
    };

    const mouseEnterHandler = (evt) => {
      zoomElement.addEventListener('mouseleave', mouseLeaveHandler);

      setEnter(true);

      getImageSize(src).then(({ width, height }) => {
        const { x, y } = getBackgroundPosition(
          evt.clientX,
          evt.clientY,
          zoomElement.getBoundingClientRect(),
          width,
          height,
        );

        setImage({
          width,
          height,
          x,
          y,
        });
      });
    };

    zoomElement.addEventListener('mouseenter', mouseEnterHandler);

    return () => {
      zoomElement.removeEventListener('mouseenter', mouseEnterHandler);
    };
  }, [src]);

  React.useEffect(() => {
    const zoomInnerElement = refInner.current;

    if (!zoomInnerElement) {
      return () => null;
    }

    const mouseMoveHandler = (evt) => {
      const { x, y } = getBackgroundPosition(
        evt.clientX,
        evt.clientY,
        zoomInnerElement.getBoundingClientRect(),
        image.width,
        image.height,
      );

      zoomInnerElement.style.backgroundColor = '#fff';
      zoomInnerElement.style.backgroundPositionX = `${x}px`;
      zoomInnerElement.style.backgroundPositionY = `${y}px`;
    };

    zoomInnerElement.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      zoomInnerElement.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, [image]);

  return (
    <div className={`zoom ${(enter && !image) ? 'zoom--enter' : ''}`} ref={refContainer}>
      {
        (image && enter)
          ? (
            <div
              className="zoom__inner"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: `${ZOOM_WIDTH}px ${ZOOM_WIDTH / (image.width / image.height)}px`,
                backgroundPositionX: `${image.x}px`,
                backgroundPositionY: `${image.y}px`,
              }}
              ref={refInner}
            />
          )
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
