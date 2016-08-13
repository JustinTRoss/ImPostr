import React from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';

import PlatformModal from './PlatformModal';

const PlatformListEntry = ({
  platform,
  onLogoutClick,
  onToggleModalClick,
  onSetSettingsClick,
}) => {
  const login = (
    // <Button href={`http://127.0.0.1:3000/auth/${platform.platform}`}>
    <Button href={`http://www.localhost:3000/auth/${platform.platform}`}>
      {`Login to ${platform.platform}`}
    </Button>
  );
  const logout = (
    <Button
      onClick={() => { onLogoutClick(platform.platform); }}
    >
      {`Logout of ${platform.platform}`}
    </Button>
  );

  const buttonToRender = platform.userPlatformLoggedIn ? logout : login;

  return (
    <ListGroupItem>
      <div>
        {platform.platform}
      </div>
      <div>
        {`Autopost is currently ${platform.settings.isActive ? 'on' : 'off'}`}
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
