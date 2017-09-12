import React from 'react';
import PropTypes from 'prop-types';
import { borderWidth } from '@bufferapp/components/style/border';
import { mystic } from '@bufferapp/components/style/color';
import { Text } from '@bufferapp/components';

const headerStyle = {
  paddingTop: '1rem',
  paddingBottom: '1rem',
  borderBottom: `${borderWidth} solid ${mystic}`,
  cursor: 'default',
  outline: 'none',
};

const ScheduleTableHeader = ({
  dayName,
}) => (
  <div style={headerStyle} tabIndex="0">
    <Text
      color={'outerSpace'}
      size={'small'}
    >
      {dayName}
    </Text>
  </div>
);

ScheduleTableHeader.propTypes = {
  dayName: PropTypes.string.isRequired,
};

export default ScheduleTableHeader;
