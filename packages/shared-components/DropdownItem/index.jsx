import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Text,
} from '@bufferapp/components';

const DropdownItem = ({
  children,
  onClick,
}) => {
  const style = {
    padding: '2px',
  };

  return (
    <li style={style}>
      <Button onClick={onClick} noStyle>
        <Text size={'small'}>{children}</Text>
      </Button>
    </li>
  );
};


DropdownItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

DropdownItem.defaultProps = {
  active: false,
};

export default DropdownItem;
