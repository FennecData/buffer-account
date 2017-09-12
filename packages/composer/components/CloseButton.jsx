import React from 'react';
import Button from '../components/Button';
import styles from './css/CloseButton.css';

class closeButton extends React.Component {
  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    label: React.PropTypes.string,
    title: React.PropTypes.string,
    className: React.PropTypes.string,
  };

  onClick = (e) => {
    e.preventDefault();
    this.props.onClick(e);
  };

  render() {
    const closeButtonClassName = [
      'bi bi-circle-x',
      styles.closeButton,
      this.props.className,
      'js-disable-dragging',
    ].join(' ');

    return (
      <Button
        className={closeButtonClassName}
        onClick={this.onClick}
        data-tip={this.props.title}
        aria-label={this.props.label}
      />
    );
  }
}

export default closeButton;
