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
    <div className="list-group" id="PlatformListContainer">
      {platforms.map(platform =>
        <PlatformListEntry
          platform={platform}
          handleFieldChange={handleFieldChange}
          validateForm={validateForm}
          onLogoutClick={onLogoutClick}
          onToggleModalClick={onToggleModalClick}
          onSetSettingsClick={onSetSettingsClick}
        />)}
    </div>
  );
};

export default PlatformList;
