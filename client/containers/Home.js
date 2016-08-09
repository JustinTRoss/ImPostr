import React from 'react';

import PlatformListContainer from './PlatformListContainer';
import PostQueueContainer from './PostQueueContainer';

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
