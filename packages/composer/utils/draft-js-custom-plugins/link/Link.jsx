import React from 'react';

import styles from './Link.css';

const Link = (props) => (
  <span className={styles.link}>{props.children}</span>
);

Link.propTypes = {
  children: React.PropTypes.node,
};

export default Link;
