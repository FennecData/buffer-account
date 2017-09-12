import React from 'react';
import styles from './css/Svg.css';

const Svg = ({ className, ...restProps }) => (
  <svg
    className={`${styles.svg} ${className}`}
    {...restProps}
  />
);

Svg.propTypes = {
  className: React.PropTypes.string,
};

Svg.defaultProps = {
  className: '',
};

export default Svg;
