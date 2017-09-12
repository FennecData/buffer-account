import React from 'react';

import styles from './Highlighter.css';

const Highlighter = (props) => (
  <span className={styles.highlighted}>{props.children}</span>
);

Highlighter.propTypes = {
  children: React.PropTypes.node.isRequired,
};

export default Highlighter;
