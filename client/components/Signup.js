import React from 'react';

const Signup = ({ username, password, fullName, handleFieldChange, handleSignupSubmit }) => {
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
      <input
        name="fullName"
        value={fullName}
        onChange={handleFieldChange}
      />
      <button onClick={handleSignupSubmit}> Submit </button>
    </div>
  );
}

export default Signup;