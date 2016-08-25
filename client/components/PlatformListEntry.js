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

  return (
    <div className={`list-group-item list-group-item-action PLEContainer ${platformStatus.class}`}>
      <div className="PlatformListEntry">
        <div
          className="PlatformListEntryHeader"
          style={{ backgroundImage: `url(../style/${platform.platform}icon.png)` }}
        />
        <div className="PLEText">
          <span className="PLEHeader text-capitalize">{platformStatus.header}</span>
          <p className="PLESubheader">{platformStatus.subheader}</p>
        </div>
        <div>
          <i className="material-icons">check</i>
          <i
            className="material-icons"
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
          <button type="button" className="btn btn-info">Login</button>
        </a>
      </div>
    </div>
  );
};

export default PlatformListEntry;
