import React from 'react';

const Login = ({ username, handleFieldChange, password, handleLoginSubmit }) => {
  return (
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
          onClick={handleLoginSubmit}
        >Login!</button>
      </div>
    </div>
  );
};

export default Login;
