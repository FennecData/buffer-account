import React from 'react';

const TwitterHashtagAutocompleteSuggestionsEntry = (props) => {
  const {
    mention,
    theme: styles,
    searchValue, // eslint-disable-line no-unused-vars, react/prop-types
    ...parentProps
  } = props;

  return (
    <div {...parentProps}>
      <span className={styles.mentionSuggestionsEntryText}>
        <span className={styles.mentionSuggestionsEntryName}>{mention.get('name')}</span>
      </span>
    </div>
  );
};

TwitterHashtagAutocompleteSuggestionsEntry.propTypes = {
  mention: React.PropTypes.object.isRequired,
  theme: React.PropTypes.object.isRequired,
};

export default TwitterHashtagAutocompleteSuggestionsEntry;
