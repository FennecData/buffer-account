/**
 * Component that provides a bit of context at the top of each Media Attachment
 */

import React from 'react';
import styles from './css/MediaAttachmentHeader.css';

const MediaAttachmentHeader = (props) => {
  const maxAttachableImagesCount = props.maxAttachableImagesCount;

  const mediaAttachmentHeaderClassName = [
    styles.mediaAttachmentHeader,
    props.className,
  ].join(' ');

  return (
    <div className={mediaAttachmentHeaderClassName}>
      Add up to {maxAttachableImagesCount} image{(maxAttachableImagesCount > 1 ? 's ' : ' ')}
      or 1 video
    </div>
  );
};

MediaAttachmentHeader.propTypes = {
  maxAttachableImagesCount: React.PropTypes.number.isRequired,
  className: React.PropTypes.string,
};

export default MediaAttachmentHeader;
