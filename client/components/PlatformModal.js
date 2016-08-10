import React from 'react';
import { Button, Modal, Checkbox } from 'react-bootstrap';

const PlatformModal = ({
  platform,
  onToggleModalClick,
  onSetSettingsClick,
}) => {
  const settings = {
    interests: platform.settings.interests,
    interval: platform.settings.interval,
    isActive: platform.settings.isActive,
  };
  return (
    <div>
      <Button
        bsStyle="primary"
        bsSize="small"
        onClick={() => { onToggleModalClick(platform.platform); }}
      >
        Change settings
      </Button>

      <Modal show={platform.showModal}>
        <Modal.Header>
          <Modal.Title>{`${platform.platform}'s settings`}</Modal.Title>
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
            <Checkbox
              defaultChecked={settings.isActive}
              onChange={(e) => { settings.isActive = e.target.checked; }}
            >
              Autopost mode
            </Checkbox>
            <div>
              <label>Frequency</label>
              <div>
                <input
                  type="text"
                  defaultValue={settings.interval}
                  onChange={(e) => { settings.interval = e.target.value; }}
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => { onToggleModalClick(platform.platform); }}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onToggleModalClick(platform.platform);
              onSetSettingsClick(platform, settings);
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
