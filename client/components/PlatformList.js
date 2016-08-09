import React from 'react';

import PlatformListEntry from './PlatformListEntry';

const PlatformList = ({ platforms }) => {
  return (
    <div>
      <div>
        Platforms:
      </div>
      <div>
        {platforms.map(platform => <PlatformListEntry platform={platform} />)}
      </div>
    </div>
  );
};

export default PlatformList;
