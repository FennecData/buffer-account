import React from 'react';
import styles from './css/Input.css';

const Input = ({ className, ...restProps }) => (
  <input
    className={`${styles.input} ${className}`}
    {...restProps}
  />
);

Input.propTypes = {
  className: React.PropTypes.string,
};

Input.defaultProps = {
  className: '',
};

export default Input;
