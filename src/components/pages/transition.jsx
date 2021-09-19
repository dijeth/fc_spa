import React from 'react';
import PropTypes from 'prop-types';

const Transition = ({ children }) => {
  const [opacity, setOpacity] = React.useState(0);

  React.useEffect(() => {
    setOpacity(1);
  });

  return (
    <div className="transition" style={{ opacity }}>
      {children}
    </div>
  );
};

Transition.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

Transition.defaultProps = {};

export default Transition;
