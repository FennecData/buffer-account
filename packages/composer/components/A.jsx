/* eslint-disable jsx-a11y/anchor-has-content */

import React from 'react';
import styles from './css/A.css';

const A = ({ className, ...restProps }) => (
  <a
    className={`${styles.a} ${className}`}
    {...restProps}
  />
);

A.propTypes = {
  className: React.PropTypes.string,
};

A.defaultProps = {
  className: '',
};

export default A;
