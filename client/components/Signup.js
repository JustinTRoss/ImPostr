import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const Signup = ({ username, password, handleFieldChange, handleSignupSubmit }) => {
  return (
    <div className="AuthParent">
      <div className="AuthContainer">
        <div className="AuthFields">
          <TextField
            className="AuthUser"
            name="username"
            value={username}
            onChange={handleFieldChange}
            hintText="username"
            type="text"
            hintStyle={{fontSize: '1em', bottom: '6px', fontWeight: 'normal'}}
            inputStyle={{fontSize: '1em', bottom: '3px', fontWeight: 'normal'}}
            style={{ width: '90%', height: '80%', backgroundColor: 'white', }}
            />
          <TextField
            className="AuthPassword"
            name="password"
            value={password}
            onChange={handleFieldChange}
            hintStyle={{fontSize: '1em', bottom: '6px'}}
            inputStyle={{fontSize: '1em', bottom: '3px'}}
            hintText="password"
            type="password"
            style={{ width: '90%', height: '80%', backgroundColor: 'white', }}
            />
        </div>
        <div className="AuthButton">
          <RaisedButton
            label="Sign Up!"
            backgroundColor="#e6e6e6"
            onClick={handleSignupSubmit}
            />
        </div>
      </div>
    </div>
  );
};

export default Signup;
