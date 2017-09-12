import React from 'react';
import styles from './UnshortenedLink.css';

class UnshortenedLink extends React.Component {
  static propTypes = {
    onMouseOver: React.PropTypes.func.isRequired,
    onMouseOut: React.PropTypes.func.isRequired,
    entityKey: React.PropTypes.string.isRequired,
    contentState: React.PropTypes.object.isRequired,
    children: React.PropTypes.node.isRequired,
  };

  // UNSHORTENED_LINK entities are mutable: don't offer to reshorten mutated entities
  onMouseOver = () => {
    const { contentState, entityKey } = this.props;
    const { unshortenedLink, shortLink } = contentState.getEntity(entityKey).getData();

    const entityText = this.props.children[0].props.text;
    const wasEntityMutated = unshortenedLink !== entityText;
    if (wasEntityMutated) return;

    const el = this.refs.unshortenedLink;
    const firstLineOfLinkPosition = el.getClientRects()[0];
    const parentPosition = el.offsetParent.getBoundingClientRect();

    const relativePosition = {
      top: firstLineOfLinkPosition.top - parentPosition.top,
      left: firstLineOfLinkPosition.left - parentPosition.left,
      width: firstLineOfLinkPosition.width,
      height: firstLineOfLinkPosition.height,
    };

    this.props.onMouseOver({ entityKey, unshortenedLink, shortLink, relativePosition });
  };

  onMouseOut = () => this.props.onMouseOut();

  render = () => (
    <span
      onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut}
      className={styles.link} ref="unshortenedLink"
    >
      {this.props.children}
    </span>
  );
}

export default UnshortenedLink;
