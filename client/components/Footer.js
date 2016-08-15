import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const Footer = () => {
	return (
		<Toolbar>
      <ToolbarGroup firstChild={true}>
        Footer the police
      </ToolbarGroup>
		</Toolbar>
	);
};

export default Footer;
