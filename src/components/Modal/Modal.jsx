import { Component } from 'react';
import { ModalBackdrop, ModalContent } from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <ModalBackdrop onClick={this.handleClick}>
        <ModalContent>
          <img src={this.props.image} alt="" />
        </ModalContent>
      </ModalBackdrop>
    );
  }
}
