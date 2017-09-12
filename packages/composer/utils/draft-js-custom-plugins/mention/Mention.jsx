import React from 'react';

import styles from './Mention.css';

const Mention = (props) => (
  <span className={styles.mention}>{props.children}</span>
);

Mention.propTypes = {
  children: React.PropTypes.node,
};

export default Mention;
