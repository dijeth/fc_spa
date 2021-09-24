import React from 'react';
import PropTypes from 'prop-types';
import { PreloaderReason } from '../../const';

const PagePreloader = ({ reason }) => <div className={`preloader preloader--${reason}`} />;

PagePreloader.propTypes = {
  reason: PropTypes.string,
};

PagePreloader.defaultProps = {
  reason: PreloaderReason.DATA,
};

export default PagePreloader;
