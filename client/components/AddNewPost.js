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
  handleFormSubmit,
}) => {
  let post = {
    date: new Date(),
    time: new Date(),
    message: '',
    facebook: false,
    linkedin: false,
    twitter: false,
  };

  return (
    <Paper>
      <Paper>
        <Subheader>Add New Post</Subheader>
      </Paper>
      <Paper>
        <TextField
          hintText="Enter a new message"
          defaultValue={post.message}
          onChange={(e) => { post.message = e.target.value; }}
        />
      </Paper>
      <Paper>
        <Paper>
          <DatePicker
            hintText="Pick a date"
            onChange={(x, date) => { post.date = date; }}
          />
          <TimePicker
            hintText="Pick a time"
            onChange={(x, time) => { post.time = time; }}

          />
        </Paper>
        <Paper>
          <List>
            <Subheader>Select platforms to post</Subheader>
            <ListItem
              leftCheckbox={
                <Checkbox
                  defaultChecked={post.facebook}
                  onCheck={(e) => { post.facebook = e.target.checked; }}
                />
              }
              primaryText="Facebook"
            />
            <ListItem
              leftCheckbox={
                <Checkbox
                  defaultChecked={post.linkedin}
                  onCheck={(e) => { post.linkedin = e.target.checked; }}
                />
              }
              primaryText="LinkedIn"
            />
            <ListItem
              leftCheckbox={
                <Checkbox
                  defaultChecked={post.twitter}
                  onCheck={(e) => { post.twitter = e.target.checked; }}
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
            onClick={() => { handleFormSubmit(post); }}
          />
          <RaisedButton
            label="Cancel"
            secondary={true}
          />
        </Paper>
      </Paper>
    </Paper>
  )
} 

export default AddNewPost;

