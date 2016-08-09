import React from 'react';

const Login = ({ username, handleFieldChange, password, handleLoginSubmit }) => {
  return (
    <div>
      <input
        name="username"
        value={username}
        onChange={handleFieldChange}
      />
      <input
        name="password"
        value={password}
        onChange={handleFieldChange}
      />
      <button onClick={handleLoginSubmit}> Submit </button>
    </div>
  );
}

export default Login;