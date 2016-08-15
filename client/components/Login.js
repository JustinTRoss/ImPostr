import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const Login = ({ username, handleFieldChange, password, handleLoginSubmit }) => {
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
            hintStyle={{fontSize: '1em', bottom: '6px',}}
            inputStyle={{fontSize: '1em', bottom: '3px',}}
            style={{ width: '90%', height: '80%', backgroundColor: 'white', }}
            />
          <TextField
            className="AuthPassword"
            name="password"
            value={password}
            onChange={handleFieldChange}
            hintStyle={{fontSize: '1em', bottom: '6px',}}
            inputStyle={{fontSize: '1em', bottom: '3px',}}
            hintText="password"
            type="password"
            style={{ width: '90%', height: '80%', backgroundColor: 'white', }}
            />
        </div>
        <div className="AuthButton">
          <RaisedButton
            label="Log In"
            backgroundColor="#e6e6e6"
            onClick={handleLoginSubmit}
            />
        </div>
      </div>
    </div>
  );
};

export default Login;
