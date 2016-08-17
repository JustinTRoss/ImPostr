import React from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import PlatformModal from './PlatformModal';

const PlatformListEntry = ({
  platform,
  onLogoutClick,
  onToggleModalClick,
  onSetSettingsClick,
}) => {
    // <Button href={`http://www.localhost:3000/auth/${platform.platform}`}>
  const login = (
    <Button href={`http://127.0.0.1:3000/auth/${platform.platform}`}>
      Login
    </Button>
  );
  const logout = (
    <Button onClick={() => { onLogoutClick(platform.platform); }}>
      Logout
    </Button>
  );

  // Use to toggle greyed out?
 // {`User  ${platform.userPlatformLoggedIn ? '' : 'not '}logged in`}

  const buttonToRender = platform.userPlatformLoggedIn ? logout : login;

  return (
    <Paper>
      <RaisedButton label={platform.platform} />
      <RaisedButton
        label="Change settings"
        primary={true}
        onClick={() => { onToggleModalClick(platform.platform); }}
      />
      <span>
        {buttonToRender}
      </span>
      <span>
        <Button>
          {`Autopost ${platform.settings.isActive ? 'on' : 'off'}`}
        </Button>
      </span>
      <span>
      </span>
      <div>
        <PlatformModal
          platform={platform}
          onSetSettingsClick={onSetSettingsClick}
          onToggleModalClick={onToggleModalClick}
        />
      </div>
    </Paper>
  );
};

export default PlatformListEntry;
