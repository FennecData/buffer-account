import React from 'react';
import styles from './css/Select.css';

const Select = ({ className, ...restProps }) => (
  <select
    className={`${styles.select} ${className}`}
    {...restProps}
  />
);

Select.propTypes = {
  className: React.PropTypes.string,
};

Select.defaultProps = {
  className: '',
};

export default Select;
