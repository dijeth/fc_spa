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
  const [image, setImage] = React.useState();
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const mouseEnterHandler = (evt) => {
      setActive(true);

      getImageSize(src).then(({ width, height }) => {
        const { x, y } = getBackgroundPosition(
          evt.clientX,
          evt.clientY,
          refContainer.current.getBoundingClientRect(),
          width,
          height,
        );

        setImage({
          width,
          height,
          x,
          y,
        });

        setActive(false);
      });
    };

    refContainer.current.addEventListener('mouseenter', mouseEnterHandler);

    return () => {
      refContainer.current.removeEventListener('mouseenter', mouseEnterHandler);
    };
  }, [src]);

  React.useEffect(() => {
    const element = refInner.current;
    if (!element) {
      return;
    }

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
      setActive(!image);
    };

    const mouseLeaveHandler = () => {
      element.removeEventListener('mousemove', mouseMoveHandler);
      element.removeEventListener('mouseleave', mouseLeaveHandler);
      setImage(null);
      setActive(false);
    };

    element.addEventListener('mousemove', mouseMoveHandler);
    element.addEventListener('mouseleave', mouseLeaveHandler);
  }, [image]);

  return (
    <div className={`zoom ${active ? 'zoom--active' : ''}`} ref={refContainer}>
      {
        image
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
