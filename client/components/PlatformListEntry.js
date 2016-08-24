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
  const login = (
    <a href={`www.localhost:3000/auth/${platform.platform}`}>
      <i
        className="material-icons"
      >
        power_settings_new
      </i>
    </a>
  );
  const logout = (
    <i
      className="material-icons"
      onClick={() => { onLogoutClick(platform.platform); }}
    >
      power_settings_new
    </i>
  );

  // Use to toggle greyed out?
 // {`User  ${platform.userPlatformLoggedIn ? '' : 'not '}logged in`}


  const buttonToRender = platform.userPlatformLoggedIn ? logout : login;
  const iconToShow = platform.settings.isActive ? 'autorenew' : 'trending_down';
  return (

    <div className="list-group-item list-group-item-action PlatformListEntry">
      
      <div>
        <div
          className="avatar"
          style={{"backgroundImage": "url('https://pbs.twimg.com/profile_images/739532954431426562/6_o9x8It_normal.jpg')"}}
        />
      </div>

      <div>
        <span className="">JustinOfRoss</span>
        <p className="">{platform.platform}</p>
      </div>

      <div>
        <i className="material-icons">{iconToShow}</i>
        <span className="">
        <i
          className="material-icons"
          onClick={() => { onToggleModalClick(platform.platform) } }
        >settings</i>
          {buttonToRender}
        </span>
        <div>
          <PlatformModal
            platform={platform}
            onSetSettingsClick={onSetSettingsClick}
            onToggleModalClick={onToggleModalClick}
            handleFieldChange={handleFieldChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PlatformListEntry;
