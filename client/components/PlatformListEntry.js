import React from 'react';
import { ListGroupItem } from 'react-bootstrap';

import PlatformModal from './PlatformModal';

const PlatformListEntry = ({
  platform,
  onLoginClick,
  onLogoutClick,
  onToggleModalClick,
  onSetSettingsClick,
}) => (
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
      <PlatformModal
        platform={platform}
        onToggleModalClick={onToggleModalClick}
        onSetSettingsClick={onSetSettingsClick}
      />
    </div>
  </ListGroupItem>
);

export default PlatformListEntry;
