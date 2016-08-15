import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const Login = ({ username, handleFieldChange, password, handleLoginSubmit }) => {
  return (
    <div className="AuthContainer">
      <div className="AuthFields">
        <TextField
          className="AuthUser"
          name="username"
          value={username}
          onChange={handleFieldChange}
          hintText="username"
          type="text"
          hintStyle={{fontSize: '0.88em'}}
          style={{ width: '80%' }}
          />
        <TextField
          className="AuthPassword"
          name="password"
          value={password}
          onChange={handleFieldChange}
          hintStyle={{fontSize: '0.88em'}}
          hintText="password"
          type="password"
          style={{ width: '80%' }}
          />
      </div>
      <div className="AuthButton">
        <RaisedButton
          label="Log In"
          backgroundColor="#7F7F7F"
          />
      </div>
    </div>
  );
};

export default Login;


/*
return (
  <div>
    <input
      name="username"
      value={username}
      onChange={handleFieldChange}
    />
    <input
      type="password"
      name="password"
      value={password}
      onChange={handleFieldChange}
    />
    <button onClick={handleLoginSubmit}> Log In </button>
  </div>
);
*/
