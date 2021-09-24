import React from 'react';
import PropTypes from 'prop-types';
import { getImage } from '../../utils/common-utils';
import PagePreloader from '../pages/page-preloader';
import { PreloaderReason } from '../../const';

const SimpleZoom = ({ src, alt }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getImage(src).then(() => setIsLoading(false));
  }, [src]);

  return (
    <div className="simple-zoom">
      {
        isLoading
          ? <PagePreloader reason={PreloaderReason.IMAGE} />
          : <img className="simple-zoom__image" src={src} alt={alt} />
      }
    </div>
  );
};

SimpleZoom.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

SimpleZoom.defaultProps = {};

export default SimpleZoom;
