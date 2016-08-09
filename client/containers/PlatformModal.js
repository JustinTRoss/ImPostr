import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';

import { toggleModal } from '../actions/platformListActions';

class PlatformModal extends React.Component {
  constructor(props) {
    super(props)

    console.log(props.platform.showModal)
  }

  render() {
    return (
      <div>
        <p>Click to edit</p>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={() => {this.props.onToggleModalClick(this.props.platform)}}
        >
          Launch demo modal
        </Button>

        <Modal show={this.props.platform.showModal}>
          <Modal.Header>
            <Modal.Title>{`${this.props.platform.platformName}'s settings`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {this.props.onToggleModalClick(this.props.platform)}}>Close</Button>
            <Button onClick={() => {this.props.onToggleModalClick(this.props.platform)}}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
};


// function mapStateToProps(state) {
//   const state = state;
//   return {
//     state,
//   };
// }

const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModalClick: (platform) => {
      dispatch(toggleModal(platform.platformName));
    }
  }
}

PlatformModal = connect(
  null,
  mapDispatchToProps
)(PlatformModal);

export default PlatformModal;
