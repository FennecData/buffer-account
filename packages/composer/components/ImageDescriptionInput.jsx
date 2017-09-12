import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import styles from './css/ImageDescriptionInput.css';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';

class ImageDescriptionInput extends React.Component {
  static propTypes = {
    draftId: React.PropTypes.string,
    mediaAttachment: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      description: this.props.mediaAttachment.description || '',
      saveButtonText: 'Save',
    };
  }

  handleChange = (e) => {
    this.setState({
      description: e.target.value,
      saveButtonText: 'Save',
    });
  }

  onClick = () => {
    ComposerActionCreators.updateImageDescription(this.props.mediaAttachment, this.state.description);
    this.setState({ saveButtonText: 'Saved!' });
  }

  render() {
    return (
      <div className={styles.container}>
        <Input
          className={styles.textInput} type="text"
          value={this.state.description} onChange={this.handleChange}
          placeholder="Add a description for the visually impaired"
        />
        <Button className={styles.button} onClick={this.onClick}>
          {this.state.saveButtonText}
        </Button>
      </div>
    );
  }
}

export default ImageDescriptionInput;
