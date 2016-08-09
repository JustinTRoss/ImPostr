import React from 'react';

const Signup = ({ username, handleUsernameChange, password, handlePasswordChange, fullName, handleFullNameChange }) => {
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
      <input
        name="fullName"
        value={fullName}
        onChange={handleFullNameChange}
      />
    </div>
  );
}

export default Signup;