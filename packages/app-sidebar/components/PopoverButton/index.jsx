import React from 'react';
import PropTypes from 'prop-types';
import { PseudoClassComponent, ArrowPopover } from '@bufferapp/components';
import { calculateStyles } from '@bufferapp/components/lib/utils';
import { curiousBlue, curiousBlueLight, sidebarBackgroundBlue } from '@bufferapp/components/style/color';
import { borderRadius } from '@bufferapp/components/style/border';

const KEY_SPACE = 32;
const KEY_ENTER = 13;
const KEY_ESCAPE = 27;
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;
const KEY_TAB = 9;

class PopoverButton extends PseudoClassComponent {
  constructor() {
    super();

    this.onMouseLeaveTimeout = null;
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.updateMenuFocus = this.updateMenuFocus.bind(this);
    this.handleMenuBlur = this.handleMenuBlur.bind(this);
    this.menuItemFocus = {
      current: 0,
      total: 0,
    };

    this.state = {
      ...this.state,
      clicked: false,
    };
  }
  render() {
    const style = calculateStyles({
      default: {
        display: 'inline-block',
        background: 'none',
        border: 0,
        padding: '6px',
        margin: '16px 16px 16px 16px',
        borderRadius,
        cursor: 'pointer',
        position: 'relative',
      },
      focused: {
        outline: 'none',
        boxShadow: `0 0 0 2px ${sidebarBackgroundBlue}, 0 0 2px 3px ${curiousBlueLight}`,
      },
      active: {
        background: curiousBlue,
        color: 'white',
      },
      large: {
        margin: 0,
      },
    }, {
      focused: this.state.focused,
      active: this.props.active,
      large: this.props.large,
    });

    const sizeStyles = this.props.large ? {
      width: '27px',
      height: '27px',
    } : {
      width: '20px',
      height: '20px',
    };

    const hoveredOrActiveOrFocused = this.state.hovered || this.props.active || this.state.focused;
    const hoveredOrClicked = this.state.hovered || this.state.clicked;
    const hoverableIcon = React.cloneElement(
      this.props.icon,
      {
        color: hoveredOrActiveOrFocused ? 'white' : 'sidebarIcon',
        size: sizeStyles,
      },
    );
    const a11y = { 'aria-label': this.props.label };
    if (this.props.children) {
      a11y['aria-haspopup'] = 'true';
      a11y['aria-expanded'] = hoveredOrClicked;
    }

    const popoverOffset = this.props.popoverPosition === 'above'
      ? { top: -4, left: 3 }
      : { top: -3, left: 3 };

    const ContainerElement = this.props.children ? 'div' : 'button';

    return (
      <ContainerElement
        ref={(el) => { this.el = el; }}
        role={this.props.children ? 'submenu' : 'button'}
        tabIndex="0"
        style={style}
        onMouseEnter={() => { clearTimeout(this.onMouseLeaveTimeout); this.handleMouseEnter(); }}
        onMouseLeave={() => {
          this.onMouseLeaveTimeout =
            setTimeout(() => this.doMouseLeave(), this.props.children ? 250 : 0);
        }}
        onClick={(e) => { this.setState({ clicked: !this.state.clicked }); this.handleOnClick(e); }}
        onKeyDown={this.handleKeyDown}
        onFocus={() => this.handleFocus()}
        onBlur={this.handleMenuBlur}
        {...a11y}
      >
        <ArrowPopover
          visible={hoveredOrClicked}
          padded={!this.props.children}
          shadow
          position={this.props.popoverPosition}
          offset={popoverOffset}
        >
          {this.props.children ? this.props.children : this.props.label}
        </ArrowPopover>
        <div style={sizeStyles}>
          {hoverableIcon}
        </div>
      </ContainerElement>
    );
  }
  componentDidMount() {
    if (this.props.children && this.el) {
      const menuItems = this.el.querySelectorAll('[role="menuitem"]');
      this.menuItemFocus = {
        total: menuItems.length,
        current: 0,
      };
    }
  }
  handleOnClick(e) {
    if (this.props.href) {
      e.preventDefault();
      if (this.props.newWindow) {
        window.open(this.props.href, '_blank');
      } else {
        window.location = this.props.href;
      }
    }
  }

  handleKeyDown(e) {
    switch (e.keyCode) {
      case KEY_ENTER:
      case KEY_SPACE:
        this.setState({ clicked: !this.state.clicked }, () => {
          this.updateMenuFocus();
        });
        break;
      case KEY_RIGHT:
        this.setState({ clicked: true }, () => {
          this.updateMenuFocus();
        });
        break;
      case KEY_LEFT:
      case KEY_ESCAPE:
        this.setState({ clicked: false }, () => {
          this.el.focus();
        });
        break;
      case KEY_DOWN:
        this.updateMenuFocus(1);
        break;
      case KEY_UP:
        this.updateMenuFocus(-1);
        break;
      case KEY_TAB:
        this.setState({ clicked: false });
        break;
      default:
        return true;
    }
  }
  handleMenuBlur() {
    this.handleBlur();
  }
  updateMenuFocus(moveFocus) {
    if (this.state.clicked) {
      const menuItems = this.el.querySelectorAll('[role="menuitem"]');
      if (menuItems.length) {
        if (moveFocus) {
          const { current, total } = this.menuItemFocus;
          const nextFocus = current + moveFocus;
          this.menuItemFocus.current = (nextFocus >= total) ? 0 : nextFocus;
        }
        /**
         * Use 'roving tabIndex'
         * https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_roving_tabindex
         */
        menuItems.forEach(item => item.setAttribute('tabIndex', '-1'));
        menuItems[this.menuItemFocus.current].setAttribute('tabIndex', '0');
        menuItems[this.menuItemFocus.current].focus();
      }
    }
  }
  doMouseLeave() {
    this.handleMouseLeave();
    this.setState({ clicked: false });
  }
}


PopoverButton.propTypes = {
  active: PropTypes.bool,
  icon: PropTypes.node.isRequired,
  children: PropTypes.node,
  label: PropTypes.string,
  large: PropTypes.bool,
  popoverPosition: PropTypes.oneOf(['none', 'above', 'below']),
  newWindow: PropTypes.bool,
  href: PropTypes.string,
};

PopoverButton.defaultProps = {
  active: false,
  large: false,
  popoverPosition: 'none',
  newWindow: false,
};

export default PopoverButton;
