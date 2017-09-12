import React from 'react';
import ProfileGroupItem from '../components/ProfileGroupItem';
import A from '../components/A';
import styles from './css/ProfileGroups.css';

const ProfileGroups = (props) => {
  const { groups, selectedProfilesIds } = props;

  const hasGroups = groups.length > 0;

  const profileGroupsWithAllProfilesSelected = groups.filter((group) =>
    group.profileIds.every((profileId) => selectedProfilesIds.includes(profileId)));

  const selectedProfileGroupsIds = profileGroupsWithAllProfilesSelected.map((group) => group.id);

  const createEditGroupButtonClassName = [
    styles.createEditGroupButton,
    'js-disable-dragging',
  ].join(' ');

  return (
    <div className={styles.profileGroups}>
      {groups.map((group) =>
        <ProfileGroupItem
          group={group}
          selectedProfileGroupsIds={selectedProfileGroupsIds}
          key={group.id}
        />)}

      <A
        href={hasGroups ? '/app/edit_groups' : '/app/create_group'}
        target="_blank" rel="noreferrer noopener"
        className={createEditGroupButtonClassName}
      >
        <span className={styles.createEditGroupButtonCopy}>
          {hasGroups ? 'Edit Groups' : 'Create a Group'}
        </span>
      </A>
    </div>
  );
};

ProfileGroups.propTypes = {
  groups: React.PropTypes.array.isRequired,
  selectedProfilesIds: React.PropTypes.array.isRequired,
};

export default ProfileGroups;
