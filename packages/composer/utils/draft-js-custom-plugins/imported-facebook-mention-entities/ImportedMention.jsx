import React from 'react';

import styles from './ImportedMention.css';

const ImportedMention = (props) => (
  <span className={styles.mention} spellCheck={false}>{props.children}</span>
);

ImportedMention.propTypes = {
  children: React.PropTypes.node,
};

export default ImportedMention;
