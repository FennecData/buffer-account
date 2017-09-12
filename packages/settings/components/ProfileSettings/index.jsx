import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  Text,
  QuestionIcon,
  IconArrowPopover,
  LoadingAnimation,
} from '@bufferapp/components';

import {
  ScheduleTable,
} from '@bufferapp/publish-shared-components';

import PostingTimeForm from '../PostingTimeForm';
import TimezoneInputForm from '../TimezoneInputForm';

const headerStyle = {
  marginBottom: '0.5rem',
  width: '100%',
};

const timezoneStyle = {
  marginTop: '1rem',
  marginBottom: '1.5rem',
  width: '100%',
};

const sectionStyle = {
  marginTop: '1.5rem',
  marginBottom: '1.5rem',
  width: '100%',
};

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

/* eslint no-console: 0 */
const ProfileSettings = ({
  days,
  items,
  loading,
  settingsHeader,
  hasTwentyFourHourTimeFormat,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <LoadingAnimation />
      </div>
    );
  }
  return (
    <div>
      <div style={headerStyle}>
        <Text color="black">{settingsHeader}</Text>
      </div>
      <Divider />
      <div style={timezoneStyle}>
        <TimezoneInputForm
          handleSubmit={() => { console.log('timezone submit'); }}
          items={items}
          onChange={() => { console.log('on change'); }}
          onSelect={() => { console.log('on select action'); }}
        />
      </div>
      <Divider />
      <div style={sectionStyle}>
        <PostingTimeForm
          handleSubmit={() => { console.log('posting time submit'); }}
          twentyfourHourTime={hasTwentyFourHourTimeFormat}
        />
      </div>
      <Divider />
      <div style={sectionStyle}>
        <Text
          color="black"
          weight="thin"
          size="small"
        >
          Posting times
          {/* Need to move the tooltip a bit for visual accuracy! */}
          <div style={{ display: 'inline-block', position: 'relative', top: '4px', left: '5px' }}>
            <IconArrowPopover icon={<QuestionIcon />} position="below" shadow oneLine={false} width="320px" label="Posting Times">
              <div style={{ padding: '.5rem .25rem' }}>
                {/* eslint-disable max-len */}
                Your posting schedule tells Buffer when to send out posts in your Queue. <br /><br />
                For example, the next 10 posts you add to your Queue will go out in the next 10 upcoming time/date slots you
                decide below. You can change this schedule at any time!
              </div>
            </IconArrowPopover>
          </div>
        </Text>
        <Divider color="white" />
        <ScheduleTable
          days={days}
          select24Hours={hasTwentyFourHourTimeFormat}
        />
      </div>
    </div>
  );
};

// TODO: onChange and onRemoveTimeClick required when app is not read-only
ProfileSettings.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      dayName: PropTypes.string,
      postingTimesTotal: PropTypes.number,
      times: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([
            PropTypes.shape({
              hours: PropTypes.number.isRequired,
              minutes: PropTypes.number.isRequired,
            }),
            PropTypes.string,
          ]),
          onChange: PropTypes.func,
          onRemoveTimeClick: PropTypes.func,
        }).isRequired,
      ).isRequired,
    }),
  ).isRequired,
  hasTwentyFourHourTimeFormat: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  settingsHeader: PropTypes.string.isRequired,
};

ProfileSettings.defaultProps = {
  loading: false,
};

export default ProfileSettings;
