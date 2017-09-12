import React from 'react';

const MentionSuggestionsEntry = (props) => {
  const { mention, theme: styles, ...parentProps } = props;

  return (
    <div {...parentProps}>
      {mention.has('avatar') &&
        <img
          src={mention.get('avatar')}
          className={styles.mentionSuggestionsEntryAvatar}
          role="presentation"
        />}

      <span className={styles.mentionSuggestionsEntryText}>
        <span className={styles.mentionSuggestionsEntryName}>{mention.get('fullName')} </span>
        {mention.get('name')}
      </span>
    </div>
  );
};

MentionSuggestionsEntry.propTypes = {
  mention: React.PropTypes.object.isRequired,
  theme: React.PropTypes.object.isRequired,
};

export default MentionSuggestionsEntry;
