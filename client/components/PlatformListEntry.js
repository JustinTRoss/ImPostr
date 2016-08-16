import React from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';

import PlatformModal from './PlatformModal';

const PlatformListEntry = ({
  platform,
  handleFieldChange,
  validateForm,
  onLogoutClick,
  onToggleModalClick,
  onSetSettingsClick,
}) => {
    // <Button href={`http://www.localhost:3000/auth/${platform.platform}`}>
  const login = (
    <Button href={`http://127.0.0.1:3000/auth/${platform.platform}`}>
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
      <span>
        {buttonToRender}
      </span>
      <span>
        {`Autopost ${platform.settings.isActive ? 'on' : 'off'}`}
      </span>
      <span>
        {`User  ${platform.userPlatformLoggedIn ? '' : 'not '}logged in`}
      </span>
      <div>
        <PlatformModal
          platform={platform}
          handleFieldChange={handleFieldChange}
          validateForm={validateForm}
          onToggleModalClick={onToggleModalClick}
          onSetSettingsClick={onSetSettingsClick}
        />
      </div>
    </ListGroupItem>
  );
};

export default PlatformListEntry;
