import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
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

  if (isValid) {
    handleFormSubmit(fields);
    resetForm();
  }

  return (
    <div id="AddNewPost">
      <div id="APSelectPlatform">
        <button
          className="APAvatar"
          style={{
            "backgroundImage": "url(../style/facebookicon.png)",
            "opacity": facebook ? "1" : ".4",
          }}
          onClick={({ target }) => { handleFieldChange('facebook', target); }}
          disabled={!platforms.filter(platform => platform.platform === 'facebook')[0].userPlatformLoggedIn}
        />
        <button
          className="APAvatar"
          style={{
            "backgroundImage": "url(../style/linkedinicon.png)",
            "opacity": linkedin ? "1" : ".4",
          }}
          onClick={({ target }) => { handleFieldChange('linkedin', target); }}
          disabled={!platforms.filter(platform => platform.platform === 'linkedin')[0].userPlatformLoggedIn}
        />
        <button
          className="APAvatar"
          style={{
            "backgroundImage": "url(../style/twittericon.png)",
            "opacity": twitter ? "1" : ".4",
          }}
          onClick={({ target }) => { handleFieldChange('twitter', target); }}
          disabled={!platforms.filter(platform => platform.platform === 'twitter')[0].userPlatformLoggedIn}
        />
      </div>
        <div id="APFormFeedback">{formFeedback}</div>
        <textarea
          id="APTextarea"
          placeholder="You're ready to share content with your users!"
          value={message}
          onChange={({ target }) => { handleFieldChange('message', target.value); }}
        />
      <div>
        <div id="APFooter">
          <div id="APSchedule">
            <span>Schedule:</span>
            <span id="APDateTime">
              <DatePicker
                hintText="Date"
                value={date}
                onChange={(x, date) => { handleFieldChange('date', date); }}
                style={{"width": "100px"}}
                textFieldStyle={{"width": "100px"}}
              />
              <TimePicker
                hintText="Time"
                value={time}
                onChange={(x, time) => { handleFieldChange('time', time); }}
                style={{"width": "100px"}}
                textFieldStyle={{"width": "100px"}}
              />
            </span>
          </div>
          <button
            type="button"
            className="btn"
            id="APSubmitBtn"
            onClick={() => { validateForm(fields); }}
          >Add to Queue</button>
        </div>
      </div>
    </div>
  )
} 

export default AddNewPost;

