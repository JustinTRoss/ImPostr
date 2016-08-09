import React from 'react';

import PlatformModal from '../containers/PlatformModal';

const PlatformListEntry = ({
  platform,
  onLoginClick,
  onLogoutClick,
  onToggleModalClick,
  onSetSettingsClick,
}) => (
  <div>
    <div>
      {platform.platformName}
    </div>
    <div>
      Userlogged in: {platform.userPlatformLoggedIn.toString()}
    </div>
    <div>
      <PlatformModal
        platform={platform}
        onToggleModalClick={onToggleModalClick}
        onSetSettingsClick={onSetSettingsClick}
      />
    </div>
  </div>
);


export default PlatformListEntry;
