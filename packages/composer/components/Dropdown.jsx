/**
 * Small abstraction wrapping 'react-simple-dropdown', using locally scoped
 * styles to handle showing/hiding the dropdown's contents.
 *
 * See UpdateSaver component for example usage.
 */

import React from 'react';
import SimpleDropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import styles from './css/Dropdown.css';

const getDropdownState = ({ isDropdownExpanded }) => ({
  isDropdownExpanded,
});

class Dropdown extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string,
    isDropdownExpanded: React.PropTypes.bool,
    onHide: React.PropTypes.func,
    onShow: React.PropTypes.func,
    title: React.PropTypes.string,
  };

  static defaultProps = {
    isDropdownExpanded: false,
    onHide: () => {},
    onShow: () => {},
  };

  state = getDropdownState(this.props);

  componentWillReceiveProps = (nextProps) => {
    if (this.props.isDropdownExpanded !== nextProps.isDropdownExpanded) {
      this.setState({
        isDropdownExpanded: nextProps.isDropdownExpanded,
      });
    }
  };

  onShow = () => {
    if (this.props.disabled) return;

    this.expandDropdown();
    this.props.onShow();
  };

  onHide = () => {
    if (this.props.disabled) return;

    this.collapseDropdown();
    this.props.onHide();
  };

  expandDropdown = () => this.setState({ isDropdownExpanded: true });
  collapseDropdown = () => this.setState({ isDropdownExpanded: false });

  render() {
    const isDropdownContentVisible = this.state.isDropdownExpanded && !this.props.disabled;

    const dropdownClassName = [
      styles.dropdown,
      this.props.className,
    ].join(' ');

    // Attach some default styles to DropdownTrigger and DropdownContent
    const children = React.Children.map(this.props.children, (child) => {
      if (child.type !== DropdownTrigger && child.type !== DropdownContent) return child;

      let defaultClassName;

      if (child.type === DropdownTrigger) {
        defaultClassName = styles.dropdownTrigger;
      } else {
        defaultClassName = isDropdownContentVisible ?
          styles.visibleDropdownContent : styles.dropdownContent;
      }

      const childClassName = [
        defaultClassName,
        child.props.className,
      ].join(' ');

      return React.cloneElement(child, {
        className: childClassName,
      });
    });

    return (
      <SimpleDropdown
        className={dropdownClassName}
        onShow={this.onShow}
        onHide={this.onHide}
        active={isDropdownContentVisible}
        title={this.props.title}
      >
        {children}
      </SimpleDropdown>
    );
  }
}

export { DropdownTrigger, DropdownContent };
export default Dropdown;
