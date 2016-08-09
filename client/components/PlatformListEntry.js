import React from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';
<<<<<<< 657c9aa9bccb7611191e526726ddaa0423af00ca
import { ListGroupItem } from 'react-bootstrap';
=======

>>>>>>> server communicates to client for all platform list actions
import PlatformModal from './PlatformModal';

const PlatformListEntry = ({
  platform,
  onLoginClick,
  onLogoutClick,
  onToggleModalClick,
  onSetSettingsClick,
}) => {
  const login = (
    <Button
      onClick={() => { onLoginClick(platform.platformName); }}
    >
      {`Login to ${platform.platformName}`}
    </Button>
  );

  const logout = (
    <Button
      onClick={() => { onLogoutClick(platform.platformName); }}
    >
      {`Logout of ${platform.platformName}`}
    </Button>
  );

  const buttonToRender = platform.userPlatformLoggedIn ? logout : login;

  return (
    <ListGroupItem>
      <div>
        {platform.platformName}
      </div>
      <div>
        {`Autopost is currently ${platform.settings.autoPilot ? 'on' : 'off'}`}
      </div>
      <div>
        {`User is currently ${platform.userPlatformLoggedIn ? '' : 'not '}logged in`}
      </div>
      <div>
        {buttonToRender}
      </div>
      <div>
        <PlatformModal
          platform={platform}
          onToggleModalClick={onToggleModalClick}
          onSetSettingsClick={onSetSettingsClick}
        />
      </div>
    </ListGroupItem>
  );
};

export default PlatformListEntry;
