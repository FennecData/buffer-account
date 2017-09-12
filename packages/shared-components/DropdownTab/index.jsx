import React from 'react';
import PropTypes from 'prop-types';
import {
  geyser,
} from '@bufferapp/components/style/color';
import {
  calculateStyles,
} from '@bufferapp/components/lib/utils';
import { Button } from '@bufferapp/components';


const DropdownTab = ({
  children,
  title,
  isDropdownShown,
}) => {
  const style = calculateStyles({
    default: {
      display: 'none',
    },
    isDropdownShown: {
      display: 'table',
      border: `1px solid ${geyser}`,
      padding: '4px',
      listStyle: 'none',
      borderRadius: '2px',
      position: 'absolute',
      background: 'white',
      marginTop: '-4px',
    },
  }, {
    isDropdownShown,
  });

  const containerStyle = {
    display: 'inline-block',
  };

  return (
    <div style={containerStyle}>
      <Button>{title}</Button>
      <ul style={style}>
        {children}
      </ul>
    </div>
  );
};

DropdownTab.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  isDropdownShown: PropTypes.bool.isRequired,
};

DropdownTab.defaultProps = {
  active: false,
  title: '',
  isDropdownShown: false,
};

export default DropdownTab;
