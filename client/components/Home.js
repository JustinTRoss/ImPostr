import React from 'react';
import PlatformListContainer from '../containers/PlatformListContainer';
import PostQueueContainer from '../containers/PostQueueContainer';
import AddNewPostContainer from '../containers/AddNewPostContainer';
import HistoryListContainer from '../containers/HistoryListContainer';

const Home = () => (
  <div>
    <div>
      <PlatformListContainer />
    </div>
    <div>
      <AddNewPostContainer />
    </div>
    <div>
      <PostQueueContainer />
    </div>
    <div>
      <HistoryListContainer />
    </div>
  </div>
);

export default Home;
