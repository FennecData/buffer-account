import React from 'react';
import styles from './css/PinterestSelectedBoards.css';

class PinterestSelectedBoards extends React.Component {
  static propTypes = {
    profiles: React.PropTypes.array,
  };

  getSelectedBoard = () => {
    const selectedPinterestProfiles = this.props.profiles.filter((profile) => (
     profile.isSelected &&
     profile.service.name === 'pinterest'
    ));

    const selectedSubprofiles =
      selectedPinterestProfiles.reduce((reducedSelectedSubprofiles, profile) => {
        const doesProfileHaveSelectedSubprofile = profile.selectedSubprofileId !== null;
        if (!doesProfileHaveSelectedSubprofile) return reducedSelectedSubprofiles;

        const selectedSubprofileForProfile =
        profile.subprofiles.find((subprofile) => subprofile.id === profile.selectedSubprofileId);

        return reducedSelectedSubprofiles.concat(selectedSubprofileForProfile);
      }, []);

    return selectedSubprofiles;
  };

  render() {
    const selectedBoards = this.getSelectedBoard();
    const firstBoard = selectedBoards[0];

    const hasMultipleBoardsSelected = selectedBoards.length > 1;

    const defaultAvatarToOverride = 'https://static.bufferapp.com/images/app/pin_2x.png';
    const defaultAvatar = '/images/app/img_pin@2x.png';
    const firstBoardAvatar =
      firstBoard ? ((firstBoard.avatar !== defaultAvatarToOverride) ? firstBoard.avatar : defaultAvatar) : null;

    return (
      <div className={styles.selectedBoardsContainer}>
        <div className={styles.selectedBoardsLabel}>Pinning to:</div>
        <img
          className={styles.selectedBoardThumbnail}
          src={firstBoardAvatar}
          role="presentation"
        />
        {firstBoard && <div className={styles.selectedBoardName}>{firstBoard.name}</div>}

        {hasMultipleBoardsSelected &&
          <div className={styles.additionalBoard}>+ {selectedBoards.length - 1} more</div>}
      </div>
    );
  }
}

export default PinterestSelectedBoards;
