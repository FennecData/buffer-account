import React, { Component } from 'react';
import PropTypes from 'prop-types';

const containerStyle = {
  flexGrow: 1,
  overflowY: 'auto',
  marginTop: '1rem',
  paddingRight: '1rem',
};

// Taken from underscore.js
const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments; // eslint-disable-line
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

class ScrollableContainer extends Component {
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
    this.debouncedHandleScroll = debounce(this.handleScroll, 500);
  }
  componentDidMount() {
    if (this.containerEl) {
      this.containerEl.addEventListener('scroll', this.debouncedHandleScroll);
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.tabId !== prevProps.tabId) {
      this.containerEl.scrollTop = 0;
    }
  }

  handleScroll() {
    const isBottomOfPage =
      this.containerEl.scrollHeight - this.containerEl.scrollTop === this.containerEl.clientHeight;
    if (isBottomOfPage) {
      this.props.onReachBottom();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div
        ref={(container) => { this.containerEl = container; }}
        style={containerStyle}
      >
        {children}
      </div>
    );
  }
}

ScrollableContainer.propTypes = {
  tabId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onReachBottom: PropTypes.func.isRequired,
};

export default ScrollableContainer;
