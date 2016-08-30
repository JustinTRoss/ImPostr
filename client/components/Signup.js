import React from 'react';

const Signup = ({ username, password, handleFieldChange, handleSignupSubmit, error }) => {
  return (
    <div className="maxSize">
    <span className="errorMsg text-capitalize">{error}</span>
    <div className="AuthParent">
      <div className="AuthFields">
        <input
          type="text"
          name="username"
          className="form-control"
          placeholder="Username"
          onChange={handleFieldChange}
          value={username}
        />
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={handleFieldChange}
        />
      </div>
      <div className="AuthButton">
        <button
          type="button"
          className="btn btn-info"
          onClick={handleSignupSubmit}
        >Signup!</button>
      </div>
    </div>
    </div>
  );
};

export default Signup;
