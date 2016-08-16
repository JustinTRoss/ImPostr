import React from 'react';

import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import Slider from 'material-ui/Slider';

const PlatformModal = ({
  platform,
  handleFieldChange,
  onToggleModalClick,
  onSetSettingsClick,
}) => {
  const { isActive, interests, interval } = platform.settings;

  return (
    <Paper>
      <RaisedButton
        label="Change settings"
        primary={true}
        onClick={() => { onToggleModalClick(platform.platform); }}
      />
      <Dialog
        title={`${platform.platform}'s settings`}
        open={platform.showModal}
      >
        <TextField
          hintText="Enter your interests: NBA, Olympics, Wall Street"
          value={interests}
          onChange={({ target }) => { handleFieldChange(platform.platform, 'interests', target.value); }}
        />
        <Checkbox
          label="Autopost mode"
          checked={isActive}
          onCheck={({ target }) => { handleFieldChange(platform.platform, 'isActive', target.checked); }}
        />
        <Slider
          min={0}
          max={25}
          step={1}
          defaultValue={5}
          value={interval}
          onChange={(x, value) => { handleFieldChange(platform.platform, 'interval', value); }}
        />
        <span>{`${interval} posts per week`}</span>
        <RaisedButton
          label="Cancel"
          secondary={true}
          onClick={() => { onToggleModalClick(platform.platform); }}
        />
        <RaisedButton
          label="Save"
          primary={true}
          onClick={() => {
            onToggleModalClick(platform.platform);
            // onSetSettingsClick(platform, settings);
          }}
        />
      </Dialog>
    </Paper>
  );
};

export default PlatformModal;
