import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const Login = ({ username, handleFieldChange, password, handleLoginSubmit }) => {
  return (
    <div className="AuthParent">
        <div className="AuthFields">
          <TextField
            className="AuthInput"
            name="username"
            value={username}
            onChange={handleFieldChange}
            hintText="Username"
            type="text"
            hintStyle={{fontSize: '1em', bottom: '6px',}}
            inputStyle={{fontSize: '1em', bottom: '3px',}}
            style={{
                backgroundColor: 'white',
                display: 'block',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
                width: '85%',
                height: '100%',
                lineHeight: '33px',
            }}
          />
          <TextField
            className="AuthInput"
            name="password"
            value={password}
            onChange={handleFieldChange}
            hintStyle={{fontSize: '1em', bottom: '6px',}}
            inputStyle={{fontSize: '1em', bottom: '3px',}}
            hintText="Password"
            type="password"
            style={{
                backgroundColor: 'white',
                display: 'block',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
                width: '85%',
                height: '100%',
                lineHeight: '33px',
            }}
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
  );
};

export default Login;
