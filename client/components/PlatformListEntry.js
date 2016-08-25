import React from 'react';
import { Button, ListGroupItem } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';

import PlatformModal from './PlatformModal';

const PlatformListEntry = ({
  platform,
  onLogoutClick,
  onToggleModalClick,
  onSetSettingsClick,
  handleFieldChange,
}) => {
  const platformStatus = platform.userPlatformLoggedIn ?
    {
      header: 'logged in',
      subheader: platform.platform,
      class: 'PLELoggedIn',
    }
    :
    {
      header: platform.platform,
      subheader: 'Connect now!',
      class: '',
    };

  return (
    <div className={`list-group-item list-group-item-action PLEContainer ${platformStatus.class}`}>
      <div className="PlatformListEntry">
        <div
          className="PlatformListEntryHeader"
          style={{ backgroundImage: `url(../style/${platform.platform}icon.png)` }}
        />
        <div className="PLEText">
          <span className="PLEHeader text-capitalize">{platform.platform}</span>
          <p className="PLESubheader">Connect it!</p>
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
