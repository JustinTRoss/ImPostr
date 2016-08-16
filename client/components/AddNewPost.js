import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Paper from 'material-ui/Paper';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const AddNewPost = ({
  fields,
  platforms,
  handleFieldChange,
  handleFormSubmit,
  validateForm,
  resetForm,
}) => {
  const {
    date,
    time,
    message,
    facebook,
    linkedin,
    twitter,
    isValid,
    formFeedback,
  } = fields;

  return (
    <Paper>
      <Paper>
        <Subheader>Add New Post</Subheader>
      </Paper>
      <Paper>
        <TextField
          hintText="Enter a new message"
          value={message}
          onChange={({ target }) => { handleFieldChange('message', target.value); }}
        />
      </Paper>
      <Paper>
        <Paper>
          <DatePicker
            hintText="Pick a date"
            value={date}
            onChange={(x, date) => { handleFieldChange('date', date); }}
          />
          <TimePicker
            hintText="Pick a time"
            value={time}
            onChange={(x, time) => { handleFieldChange('time', time); }}

          />
        </Paper>
        <Paper>
          <List>
            <Subheader>Select platforms to post</Subheader>
            <ListItem
              leftCheckbox={
                <Checkbox
                  disabled={!platforms.filter(platform => platform.platform === 'facebook')[0].userPlatformLoggedIn}
                  checked={facebook}
                  onCheck={({ target }) => { handleFieldChange('facebook', target.checked); }}
                />
              }
              primaryText="Facebook"
            />
            <ListItem
              leftCheckbox={
                <Checkbox
                  disabled={!platforms.filter(platform => platform.platform === 'linkedin')[0].userPlatformLoggedIn}
                  defaultChecked={linkedin}
                  onCheck={({ target }) => { handleFieldChange('linkedin', target.checked); }}
                />
              }
              primaryText="LinkedIn"
            />
            <ListItem
              leftCheckbox={
                <Checkbox
                  disabled={!platforms.filter(platform => platform.platform === 'twitter')[0].userPlatformLoggedIn}
                  defaultChecked={twitter}
                  onCheck={({ target }) => { handleFieldChange('twitter', target.checked); }}
                />
              }
              primaryText="Twitter"
            />
          </List>
        </Paper>
        <Paper>{`Formfeedback: ${formFeedback}, isValid: ${isValid}`}</Paper>
        <Paper>
          <RaisedButton
            label="Post"
            primary={true}
            onClick={() => {
              validateForm(fields);
              // handleFormSubmit(fields);
              // resetForm();
            }}
          />
          <RaisedButton
            label="Cancel"
            secondary={true}
            onClick={() => {
              resetForm();
            }}
          />
        </Paper>
      </Paper>
    </Paper>
  )
} 

export default AddNewPost;

