import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';



const Navbar = ({ receiveLogout, showLogout }) => {
const style = showLogout === 'Logout' ? {backgroundColor:'rgba(210, 196, 196, 1)'} : {backgroundColor:'rgba(210, 196, 196, 0.11)'};
	return (
		<Toolbar style={style} >
      <ToolbarGroup firstChild={true}>
        <a href="http://127.0.0.1:3000" className="logo" />
      </ToolbarGroup>
      <ToolbarGroup lastChild={true}>
        <RaisedButton label={showLogout} primary={true} onClick={receiveLogout} />
      </ToolbarGroup>
    </Toolbar>
  );
};

export default Navbar;
