import React from 'react';
import PropTypes from 'prop-types';
import { getImage } from '../../utils/common-utils';

const SimpleZoom = ({ src, alt }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getImage(src).then(() => setIsLoading(false));
  }, [src]);

  return (
    <div className="simple-zoom">
      {
        isLoading
          ? <div className="preloader" />
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
