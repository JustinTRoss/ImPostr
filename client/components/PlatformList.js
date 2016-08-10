<<<<<<< HEAD
import React from 'react' ;
=======
import React from 'react';
>>>>>>> 66a499b2f6191d9d6272b1fe78aeb3caa17892fd
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
