import React from 'react';

const Signup = ({ username, password, handleFieldChange, handleSignupSubmit }) => {
  return (
    <div>
      <input
        name="username"
        value={username}
        onChange={handleFieldChange}
      />
      <input
        name="password"
        type="password"
        value={password}
        onChange={handleFieldChange}
      />
      <button onClick={handleSignupSubmit}> Submit </button>
    </div>
  );
};

export default Signup;
