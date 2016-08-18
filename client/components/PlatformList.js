import React from 'react';
import PlatformListEntry from './PlatformListEntry';
import { List } from 'material-ui/List';

const PlatformList = ({
  platforms,
  handleFieldChange,
  validateForm,
  onLogoutClick,
  onToggleModalClick,
  onSetSettingsClick,
}) => {
  return (
    <div id="PlatformListContainer">
      <List style={{backgroundColor: 'white', height: '100vh'}}>
        {platforms.map(platform =>
          <PlatformListEntry
            platform={platform}
            handleFieldChange={handleFieldChange}
            validateForm={validateForm}
            onLogoutClick={onLogoutClick}
            onToggleModalClick={onToggleModalClick}
            onSetSettingsClick={onSetSettingsClick}
          />)}
      </List>
    </div>
  );
};

export default PlatformList;
