import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';
import PlatformListEntry from './PlatformListEntry';

const PlatformList = ({
  platforms,
  handleFieldChange,
  validateForm,
  onLogoutClick,
  onToggleModalClick,
  onSetSettingsClick,
}) => {
  return (
    <div>
      <Panel header="Platforms">
        <ListGroup>
          {platforms.map(platform =>
            <PlatformListEntry
              platform={platform}
              handleFieldChange={handleFieldChange}
              validateForm={validateForm}
              onLogoutClick={onLogoutClick}
              onToggleModalClick={onToggleModalClick}
              onSetSettingsClick={onSetSettingsClick}
            />)}
        </ListGroup>
      </Panel>
    </div>
  );
};

export default PlatformList;
