import React from 'react';
import styles from './css/BaseButton.css';

const Button = ({ className, ...restProps }) => (
  <button
    className={`${styles.button} ${className}`}
    {...restProps}
  />
);

Button.propTypes = {
  className: React.PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;
