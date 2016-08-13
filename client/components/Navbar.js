import React from 'react';

const Navbar = ({ receiveLogout }) => {
	return (
		<div>
      Navbar
      <button
        onClick={receiveLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
