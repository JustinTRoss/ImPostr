import React from 'react';
import PlatformListEntry from './PlatformListEntry';

const PlatformList = ({
  platforms,
  onLoginClick,
  onLogoutClick,
  onToggleModalClick,
  onSetSettingsClick,
}) => {
  return (
    <div>
      <div>
        Platforms:
      </div>
      <div>
        {platforms.map(platform =>
          <PlatformListEntry
            onLoginClick={onLoginClick}
            onLogoutClick={onLogoutClick}
            onToggleModalClick={onToggleModalClick}
            onSetSettingsClick={onSetSettingsClick}
            platform={platform}
          />)}
      </div>
    </div>
  );
};

export default PlatformList;
