import React from 'react';

import styles from './PrepopulatedHashtag.css';

const PrepopulatedHashtag = (props) => (
  <span className={styles.hashtag} spellCheck={false}>{props.children}</span>
);

PrepopulatedHashtag.propTypes = {
  children: React.PropTypes.node,
};

export default PrepopulatedHashtag;
