import React from 'react';
import PlatformListContainer from '../containers/PlatformListContainer';
import PostQueueContainer from '../containers/PostQueueContainer';
import AddNewPostContainer from '../containers/AddNewPostContainer';
import HistoryListContainer from '../containers/HistoryListContainer';

const Home = () => (
  <div id="Home">
    <div id="homeLeft">
      <div id="platformListContainer">
        <PlatformListContainer />
      </div>
      <div id="addNewPostContainer">
        <AddNewPostContainer />
      </div>
    </div>
    <div id="homeRight">
      <div id="postQueueContainer">
        <PostQueueContainer />
      </div>
    </div>
    <div>
      <HistoryListContainer />
    </div>
  </div>
);

export default Home;
