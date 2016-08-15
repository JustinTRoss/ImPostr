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
            hintStyle={{fontSize: '0.88em', bottom: '7px'}}
            inputStyle={{fontSize: '0.88em', bottom: '7px'}}
            style={{ width: '80%', height: '80%' }}
            />
          <TextField
            className="AuthPassword"
            name="password"
            value={password}
            onChange={handleFieldChange}
            hintStyle={{fontSize: '0.88em', bottom: '7px'}}
            inputStyle={{fontSize: '0.88em', bottom: '7px'}}
            hintText="password"
            type="password"
            style={{ width: '80%', height: '80%' }}
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
