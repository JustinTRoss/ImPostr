import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const Signup = ({ username, password, handleFieldChange, handleSignupSubmit }) => {
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
            hintStyle={{fontSize: '1em', bottom: '6px', fontWeight: 'normal'}}
            inputStyle={{fontSize: '1em', bottom: '3px', fontWeight: 'normal'}}
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
            hintStyle={{fontSize: '1em', bottom: '6px'}}
            inputStyle={{fontSize: '1em', bottom: '3px'}}
            hintText="Password"
            type="password"
            style={{ backgroundColor: 'white',
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
            label="Sign Up!"
            backgroundColor="#e6e6e6"
            onClick={handleSignupSubmit}
            />
        </div>
    </div>
  );
};

export default Signup;
