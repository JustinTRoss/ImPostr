import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';

const PlatformModal = ({
  platform,
  validateForm,
  handleFieldChange,
  onToggleModalClick,
  onSetSettingsClick,
  onLogoutClick,
}) => {
  const { isActive, interests, interval } = platform.settings;

  const settings = {
    interests,
    isActive,
    interval,
  };

  return (
    <Paper>
      <Dialog
        className="text-capitalize"
        title={`${platform.platform}'s settings`}
        open={platform.showModal}
      >
        <div className="SettingModalContainer fluid-container">
          <div className="SMText">
            <input
              type="text"
              defaultValue={interests}
              placeholder="Enter, comma-delimited, interests"
              onChange={({ target }) => { settings.interests = target.value; }}
              className="form-control"
            />
            <input
              type="number"
              defaultValue={interval}
              placeholder="How many posts per week?"
              onChange={(x, value) => { settings.interval = value; }}
              className="form-control"
            />
          </div>
          <div className=" SMMid row">
            <div className="SMCheckbox col-xs">
              <Checkbox
                label="Autopost mode"
                defaultChecked={isActive}
                onCheck={({ target }) => { settings.isActive = target.checked; }}
              />
            </div>
            <div className="SMLogout col-xs">
              <button
                type="button"
                className="btn btn-secondary text-capitalize"
                onClick={() => {
                  onLogoutClick(platform.platform);
                  onToggleModalClick(platform.platform);
                }}
              >Logout of {platform.platform}</button>
            </div>
          </div>
          <div className="SMButtons">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => { onToggleModalClick(platform.platform); }}
            >Cancel</button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onSetSettingsClick(platform, settings);
                onToggleModalClick(platform.platform);
              }}
            >Save</button>
          </div>
        </div>
      </Dialog>
    </Paper>
  );
};

export default PlatformModal;
