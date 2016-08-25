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
  return (
    <div className="list-group-item list-group-item-action PLEContainer">
      <div className="PlatformListEntry">
        <div
          className="avatar"
          style={{"backgroundImage": "url('https://pbs.twimg.com/profile_images/739532954431426562/6_o9x8It_normal.jpg')"}}
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
