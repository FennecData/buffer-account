import React from 'react';

import styles from './Hashtag.css';

const Hashtag = (props) => (
  <span className={styles.hashtag}>{props.children}</span>
);

Hashtag.propTypes = {
  children: React.PropTypes.node,
};

export default Hashtag;
