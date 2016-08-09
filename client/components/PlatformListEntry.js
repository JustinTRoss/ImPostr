import React from 'react';

import PlatformModal from '../containers/PlatformModal';

const PlatformListEntry = ({ platform }) => {
	return (
		<div>
      <div>
        {platform.platformName}
      </div>
      <div>
        Userlogged in: {platform.userPlatformLoggedIn.toString()}
      </div>
      <div>
        <PlatformModal platform={platform} />
      </div>
		</div>
	);
}

export default PlatformListEntry;