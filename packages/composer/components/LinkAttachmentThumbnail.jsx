/**
 * Component that displays a thumbnail that fits the width of its container
 */

import React from 'react';
import styles from './css/LinkAttachmentThumbnail.css';

const LinkAttachmentThumbnail = (props) => {
  const thumbnail = props.thumbnail;
  const hasThumbnail = thumbnail !== null;

  return (
    <div>
      {hasThumbnail ?
        <div
          className={styles.thumbnail}
          style={{ backgroundImage: `url(${thumbnail.url})` }}
        /> :
        <div className={styles.thumbnailPlaceholder} />}
    </div>
  );
};

LinkAttachmentThumbnail.propTypes = {
  thumbnail: React.PropTypes.object,
};

export default LinkAttachmentThumbnail;
