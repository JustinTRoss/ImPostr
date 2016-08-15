import React from 'react';

const Navbar = ({ receiveLogout }) => {
	return (
		<Toolbar>
      <ToolbarGroup firstChild={true}>

      </ToolbarGroup>
      <ToolbarGroup lastChild={true}>
        <RaisedButton label="Primary" primary={true} onClick={receiveLogout}>
          Logout
        </RaisedButton>
      </ToolbarGroup>
    </Toolbar>
  );
};

export default Navbar;
