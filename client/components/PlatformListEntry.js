import React from 'react';
import PlatformModal from './PlatformModal';

const PlatformListEntry = ({
  platform,
  onLogoutClick,
  onToggleModalClick,
  onSetSettingsClick,
  handleFieldChange,
}) => {
  const loggedInHeader = {
    header: 'logged in',
    subheader: platform.platform,
    class: 'PLELoggedIn',
  };

  const loggedOutHeader = {
    header: platform.platform,
    subheader: 'Connect now!',
    class: '',
  };

  const platformStatus = platform.userPlatformLoggedIn
    ? loggedInHeader
    : loggedOutHeader;

  const autoCheck = platform.settings.isActive ? 'PLEAutoOn' : '';

  return (
    <div className={`list-group-item list-group-item-action PLEContainer ${platformStatus.class}`}>
      <div className="PlatformListEntry">
        <div className="PLELeft">
          <div
            className="PlatformListEntryIcon"
            style={{ backgroundImage: `url(../style/${platform.platform}icon.png)` }}
          />
          <div className="PLEText">
            <span className="PLEHeader text-capitalize">{platformStatus.header}</span>
            <span className="PLESubheader text-capitalize">{platformStatus.subheader}</span>
          </div>
        </div>
        <div>
          <i className={`material-icons PLEAutopilot ${autoCheck}`}>check</i>
          <i
            className="material-icons PLESettings"
            onClick={() => { onToggleModalClick(platform.platform); }}
          >settings</i>
          <div>
            <PlatformModal
              platform={platform}
              onSetSettingsClick={onSetSettingsClick}
              onToggleModalClick={onToggleModalClick}
              handleFieldChange={handleFieldChange}
              onLogoutClick={onLogoutClick}
            />
          </div>
        </div>
      </div>
      <div className="PLELogin">
        <a href={`/auth/${platform.platform}`}>
          <button type="button" className="btn btn-info">Login to {platform.platform}</button>
        </a>
      </div>
    </div>
  );
};

export default PlatformListEntry;
