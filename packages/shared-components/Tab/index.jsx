import React from 'react';
import PropTypes from 'prop-types';
import {
  Link,
} from '@bufferapp/components';
import {
  curiousBlue,
} from '@bufferapp/components/style/color';
import {
  calculateStyles,
} from '@bufferapp/components/lib/utils';

import HoverableText from '../HoverableText';

const Tab = ({
  children,
  selected,
  tabId,
  onClick,
}) =>
  <div
    style={calculateStyles({
      default: {
        transform: 'translate(0, 1px)',
        margin: '0 42px 0 0',
        display: 'inline-block',
        minWidth: '60px',
        textAlign: 'center',
      },
      selected: {
        borderBottom: `2px solid ${curiousBlue}`,
      },
    }, {
      selected,
    })}
  >
    <Link
      padding="18px 13px 17px 13px"
      block
      href={'#'}
      onClick={(e) => {
        e.preventDefault();
        onClick(tabId);
      }}
      unstyled
    >
      <HoverableText
        color={selected ? 'black' : 'shuttleGray'}
        hoverColor="black"
        size="mini"
      >
        {children}
      </HoverableText>
    </Link>
  </div>;

Tab.propTypes = {
  children: PropTypes.node,
  selected: PropTypes.bool,
  onClick: PropTypes.func,
  tabId: PropTypes.string,
};

Tab.defaultProps = {
  selected: false,
};

export default Tab;
