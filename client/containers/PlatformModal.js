import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const PlatformModal = ({
  platform,
  onToggleModalClick,
  onSetSettingsClick,
}) => {
  let settings = {
    interests: platform.settings.interests.join(', '),
    frequency: platform.settings.frequency,
  };
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
          <form>
            <div>
              <label>Topics of interest</label>
              <div>
                <input
                  type="text"
                  defaultValue={settings.interests}
                  onChange={(e) => { settings.interests = e.target.value; }}
                />
              </div>
            </div>
            <div>
              <label>Frequency</label>
              <div>
                <input
                  type="text"
                  defaultValue={settings.frequency}
                  onChange={(e) => { settings.frequency = e.target.value; }}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => { onToggleModalClick(platform.platformName); }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onToggleModalClick(platform.platformName);
              onSetSettingsClick(platform.platformName, settings);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PlatformModal;