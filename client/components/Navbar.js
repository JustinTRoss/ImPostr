import React from 'react';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

const Navbar = ({ receiveLogout, showLogout }) => {
  const style = showLogout === 'Logout' ? {backgroundColor:'#cec3a4'} : {backgroundColor:'rgba(56,49,38, 0.31)'};
  const toggleLogoColor = showLogout === 'Logout' ? 'logoSmallHome' : 'logoSmallAuth';
	return (
		<Toolbar style={style} >
      <ToolbarGroup firstChild={true}>
        <a href="/" className={toggleLogoColor} />
      </ToolbarGroup>
      <ToolbarGroup lastChild={true}>
        <RaisedButton label={showLogout} primary={true} onClick={receiveLogout} />
      </ToolbarGroup>
    </Toolbar>
  );
};

export default Navbar;
