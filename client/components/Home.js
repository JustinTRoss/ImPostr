import React from 'react';

import PlatformListContainer from '../containers/PlatformListContainer';
import PostQueueContainer from '../containers/PostQueueContainer';

const Home = () => (
  <div>Home
    <div>
      <PlatformListContainer />
    </div>
    <div>
      <PostQueueContainer />
    </div>
  </div>
);

export default Home;
