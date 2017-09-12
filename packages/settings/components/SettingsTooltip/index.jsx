import React from 'react';
import {
  QuestionIcon,
  Text,
} from '@bufferapp/components';

const textAndTooltipWrapperStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const textWrapperStyle = {
  width: '18%',
};

const SettingsTooltip = () => (
  <div style={textAndTooltipWrapperStyle}>
    <div style={textWrapperStyle}>
      <Text
        color={'black'}
        weight={'thin'}
        size={'small'}
      >
        Posting times
      </Text>
    </div>
    <div>
      <QuestionIcon color={'black'} />
      <div>
        <div>
          <Text
            color={'white'}
            size={'small'}
          >
            {/* eslint-disable max-len */}
            Your posting schedule tells Buffer when to send out posts in your Queue (under the Content tab).
            {/* eslint-enable max-len */}
          </Text>
        </div>
        <Text
          color={'white'}
          size={'small'}
        >
          {/* eslint-disable max-len */}
          For example, the next 10 posts you add to your Queue will go out in the next 10 upcoming time/date slots you decide below. You can change this schedule at any time!
          {/* eslint-enable max-len */}
        </Text>
      </div>
    </div>
  </div>
);

export default SettingsTooltip;
