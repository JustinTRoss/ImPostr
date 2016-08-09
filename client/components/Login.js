import React from 'react';

const Login = ({ username, handleUsernameChange, password, handlePasswordChange, handleLoginSubmit }) => {
  return (
    <div>
      <input
        name="username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        name="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleLoginSubmit}> Submit </button>
    </div>
  );
}

export default Login;