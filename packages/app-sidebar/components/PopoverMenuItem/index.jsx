import React from 'react';
import PropTypes from 'prop-types';
import { calculateStyles } from '@bufferapp/components/lib/utils';
import { geyser } from '@bufferapp/components/style/color';
import { PseudoClassComponent } from '@bufferapp/components';

class PopoverMenuItem extends PseudoClassComponent {
  render() {
    const { href, children, subtitle } = this.props;
    const mainLinkStyle = {
      display: 'block',
      color: '#fff',
      fontSize: '0.9rem',
    };
    const subtitleStyle = {
      display: 'block',
      fontSize: '.7rem',
      paddingTop: '.25rem',
    };
    const style = calculateStyles({
      default: {
        display: 'block',
        color: `${geyser}`,
        textDecoration: 'none',
        padding: '.5rem 1rem',
      },
      hovered: {
        color: '#fff',
      },
    }, {
      hovered: this.state.hovered,
    });
    return (
      <li
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
        onFocus={() => this.handleFocus()}
        onBlur={() => this.handleBlur()}
      >
        {subtitle
          ? <a role="menuitem" href={href} style={style}>
            <span style={mainLinkStyle}>{children}</span>
            <span style={subtitleStyle}>{subtitle}</span>
          </a>
          : <a role="menuitem" href={href} style={style}>{children}</a>
        }
      </li>
    );
  }
}

PopoverMenuItem.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
  subtitle: PropTypes.node,
};

export default PopoverMenuItem;
