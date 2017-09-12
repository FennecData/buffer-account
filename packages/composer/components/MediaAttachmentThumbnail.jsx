import React from 'react';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import AppActionCreators from '../action-creators/AppActionCreators';
import CloseButton from '../components/CloseButton';
import Button from '../components/Button';
import { MediaTypes } from '../AppConstants';
import styles from './css/MediaAttachmentThumbnail.css';
import ModalActionCreators from '../__legacy-buffer-web-shared-components__/modal/actionCreators';

class MediaAttachmentThumbnail extends React.Component {
  static propTypes = {
    draftId: React.PropTypes.string.isRequired,
    className: React.PropTypes.string,
    media: React.PropTypes.object.isRequired,
    showTwitterImageDescription: React.PropTypes.bool.isRequired,
    composerPosition: React.PropTypes.object,
  };

  static defaultProps = {
    composerPosition: null,
  };

  onClick = () => {
    const { media, draftId, showTwitterImageDescription, composerPosition } = this.props;
    ModalActionCreators.openModal('MediaZoomBox', {
      media, draftId, showTwitterImageDescription, composerPosition,
    });
  }

  onCloseButtonClick = () => {
    const { draftId, media } = this.props;

    switch (media.mediaType) {
      case MediaTypes.IMAGE:
        ComposerActionCreators.removeDraftImage(draftId, media);
        AppActionCreators.trackUserAction(['composer', 'media', 'removed', 'photo'], {
          isGif: false,
        });
        break;

      case MediaTypes.VIDEO:
        ComposerActionCreators.removeDraftVideo(draftId);
        AppActionCreators.trackUserAction(['composer', 'media', 'removed', 'video']);
        break;

      case MediaTypes.GIF:
        ComposerActionCreators.removeDraftGif(draftId);
        AppActionCreators.trackUserAction(['composer', 'media', 'removed', 'photo'], {
          isGif: true,
        });
        break;

      default:
        break;
    }
  };

  render() {
    const { media, className, showTwitterImageDescription } = this.props;
    const thumbnailClassName = [styles.thumbnail, className].join(' ');
    const isVideo = media.mediaType === MediaTypes.VIDEO;
    const videoThumbnailClass = [
      'bi bi-video',
      styles.videoThumbnail,
    ].join(' ');
    const thumbnail = isVideo ? media.thumbnail : media.url;

    const isRegularImage = media.mediaType === MediaTypes.IMAGE;
    const tooltipCopy = (isRegularImage && showTwitterImageDescription) ?
      'Click to expand & add description' : 'Click to expand';
    const ariaLabel = (isRegularImage && showTwitterImageDescription) ?
      'Select to expand image and add image description' :
      `Select to expand ${isVideo ? 'video' : 'image'}`;

    return (
      <div className={thumbnailClassName}>
        <Button
          className={styles.imageContainer}
          aria-label={ariaLabel}
          data-tip={tooltipCopy} onClick={this.onClick}
          style={{ backgroundImage: `url(${thumbnail})` }}
        >
          {isVideo &&
            <span className={videoThumbnailClass} aria-label="video attachment" />
          }
        </Button>
        <CloseButton
          className={styles.closeButton} onClick={this.onCloseButtonClick} label="Remove media"
        />
      </div>
    );
  }
}

export default MediaAttachmentThumbnail;
