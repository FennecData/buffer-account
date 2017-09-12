/**
 * Component that displays a character count based on two numbers:
 * the current number of characters, and the max.
 */

import React from 'react';
import styles from './css/CharacterCount.css';

const CharacterCount = (props) => {
  const left = props.maxCount - props.count;
  const isAboveMax = left < 0;

  const className = [
    isAboveMax ? styles.aboveMaxCharacterCount : null,
    props.className,
  ].join(' ');

  return (
    <span className={className}>
      {left}
    </span>
  );
};

CharacterCount.propTypes = {
  count: React.PropTypes.number.isRequired,
  maxCount: React.PropTypes.number.isRequired,
  className: React.PropTypes.string,
};

export default CharacterCount;
