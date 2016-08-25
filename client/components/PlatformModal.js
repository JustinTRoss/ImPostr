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
        title={`${platform.platform}'s settings`}
        open={platform.showModal}
      >
        <TextField
          hintText="Enter your interests"
          defaultValue={interests}
          onChange={({ target }) => { settings.interests = target.value; }}
        />
        <Checkbox
          label="Autopost mode"
          defaultChecked={isActive}
          onCheck={({ target }) => { settings.isActive = target.checked; }}
        />
        <TextField
          label="Posts per week"
          type="number"
          hintText="Enter posts per week"
          min="1"
          max="25"
          defaultValue={interval}
          onChange={(x, value) => { settings.interval = value; }}
        />
        <RaisedButton
          label="Cancel"
          secondary={true}
          onClick={() => { onToggleModalClick(platform.platform); }}
        />
        <RaisedButton
          label="Save"
          primary={true}
          onClick={() => {
            onSetSettingsClick(platform, settings);
            onToggleModalClick(platform.platform);
          }}
        />
        <button
          type="button"
          class="btn btn-danger"
          onClick={() => {
            onLogoutClick(platform.platform);
            onToggleModalClick(platform.platform);
          }}
        >Logout</button>
      </Dialog>
    </Paper>
  );
};

export default PlatformModal;
