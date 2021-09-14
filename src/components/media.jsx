import React from 'react';
import PropTypes from 'prop-types';

const Media = ({ query, children }) => {
  const [coincidence, setCoincidence] = React.useState(window.matchMedia(query).matches);

  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setCoincidence(window.matchMedia(query).matches);
    });
  }, []);

  return coincidence ? children : '';
};

Media.propTypes = {
  query: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

Media.defaultProps = {};

export default Media;
