import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Paper from 'material-ui/Paper';

const AddNewPost = () => {
  return (
    <Paper>
      <Paper>
        <Header>Add New Post</Header>
      </Paper>
      <Paper>
        <TextField
          hintText="Enter a new message"
        />
      </Paper>
      <Paper>
        <Paper>
          <DatePicker hintText="Pick a date" />
          <TimePicker hintText="Pick a time" />
        </Paper>
        <Paper>
          <List>
            <Subheader>Select platforms to post</Subheader>
            <ListItem
              leftCheckbox={<Checkbox />}
              primaryText="Facebook"
            />
            <ListItem
              leftCheckbox={<Checkbox />}
              primaryText="LinkedIn"
            />
            <ListItem
              leftCheckbox={<Checkbox />}
              primaryText="Twitter"
            />
          </List>
        </Paper>
        <Paper>
          <RaisedButton label="Post" primary={true} />
          <RaisedButton label="Cancel" secondary={true} />
        </Paper>
      </Paper>
    </Paper>
  )
} 

export default AddNewPost;
