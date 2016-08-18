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
    // <Button href={`http://www.localhost:3000/auth/${platform.platform}`}>
  const login = (
    <a href={`http://127.0.0.1:3000/auth/${platform.platform}`}>
      <FontIcon
        className="material-icons"
      >
        power_settings_new
      </FontIcon>
    </a>
  );
  const logout = (
    <FontIcon
      className="material-icons"
      onClick={() => { onLogoutClick(platform.platform); }}
    >
      power_settings_new
    </FontIcon>
  );

  // Use to toggle greyed out?
 // {`User  ${platform.userPlatformLoggedIn ? '' : 'not '}logged in`}


  const buttonToRender = platform.userPlatformLoggedIn ? logout : login;
  const iconToShow = platform.settings.isActive ? 'autorenew' : 'trending_down';
  return (
    <ListItem
      leftIcon={<FontIcon style={{left:"-23px"}} className="material-icons">{iconToShow}</FontIcon>}
      leftAvatar={<Avatar src="../style/ImpostrIcon.png" />}
      primaryText="JustinOfRoss"
      secondaryText={platform.platform}
      rightIcon={
        <span className="platformListEntryIcons">
          <FontIcon
            className="material-icons"
            onClick={() => { onToggleModalClick(platform.platform) } }
          >
            settings
          </FontIcon>
          {buttonToRender}
        </span>
      }
    >
      <div>
        <PlatformModal
          platform={platform}
          onSetSettingsClick={onSetSettingsClick}
          onToggleModalClick={onToggleModalClick}
          handleFieldChange={handleFieldChange}
        />
      </div>
    </ListItem>
  );
};

export default PlatformListEntry;
