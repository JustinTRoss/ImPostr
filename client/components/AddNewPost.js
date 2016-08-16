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
  handleFieldChange,
  handleFormSubmit,
  resetForm,
}) => {
  const {
    date,
    time,
    message,
    facebook,
    linkedin,
    twitter,
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
                  checked={facebook}
                  onCheck={({ target }) => { handleFieldChange('facebook', target.checked); }}
                />
              }
              primaryText="Facebook"
            />
            <ListItem
              leftCheckbox={
                <Checkbox
                  defaultChecked={linkedin}
                  onCheck={({ target }) => { handleFieldChange('linkedin', target.checked); }}
                />
              }
              primaryText="LinkedIn"
            />
            <ListItem
              leftCheckbox={
                <Checkbox
                  defaultChecked={twitter}
                  onCheck={({ target }) => { handleFieldChange('twitter', target.checked); }}
                />
              }
              primaryText="Twitter"
            />
          </List>
        </Paper>
        <Paper>
          <RaisedButton
            label="Post"
            primary={true}
            onClick={() => {
              handleFormSubmit(fields);
              resetForm();
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

