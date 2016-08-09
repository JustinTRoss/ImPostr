import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const PlatformModal = ({
  platform,
  onToggleModalClick,
  onSetSettingsClick,
}) => {
  return (
    <div>
      <p>Click to edit</p>
      <Button
        bsStyle="primary"
        bsSize="small"
        onClick={() => { onToggleModalClick(platform.platformName); }}
      >
        Launch demo modal
      </Button>

      <Modal show={platform.showModal}>
        <Modal.Header>
          <Modal.Title>{`${platform.platformName}'s settings`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Text in a modal</h4>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => { onToggleModalClick(platform.platformName); }}>Close</Button>
          <Button onClick={() => { onToggleModalClick(platform.platformName); }}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlatformModal;
