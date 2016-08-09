import React from 'react';
import { Panel, ListGroup } from 'react-bootstrap';

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
      <Panel header="Platforms">
        <ListGroup>
          {platforms.map(platform =>
            <PlatformListEntry
              onLoginClick={onLoginClick}
              onLogoutClick={onLogoutClick}
              onToggleModalClick={onToggleModalClick}
              onSetSettingsClick={onSetSettingsClick}
              platform={platform}
            />)}
        </ListGroup>
      </Panel>
    </div>
  );
};

export default PlatformList;
