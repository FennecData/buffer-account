import React from 'react';

import styles from './PrepopulatedMention.css';

const PrepopulatedMention = (props) => (
  <span className={styles.mention} spellCheck={false}>{props.children}</span>
);

PrepopulatedMention.propTypes = {
  children: React.PropTypes.node,
};

export default PrepopulatedMention;
