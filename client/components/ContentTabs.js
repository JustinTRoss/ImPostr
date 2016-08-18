import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import PostQueueContainer from '../containers/PostQueueContainer';
import AddNewPostContainer from '../containers/AddNewPostContainer';
import HistoryListContainer from '../containers/HistoryListContainer';
import PlatformListContainer from '../containers/PlatformListContainer';


const ContentTabs = () => (
  <div id="ContentTabs">
    <Tabs style={{display: 'block',}}>
      <Tab label="Accounts">
        <PlatformListContainer />
      </Tab>
    </Tabs>
    <Tabs style={{display: 'block',}}>
      <Tab label="Post New" >
        <div id="addNewPostContainer">
          <AddNewPostContainer />
        </div>
      </Tab>
      <Tab label="Post Queue" >
        <div id="postQueueContainer">
          <PostQueueContainer />
        </div>
      </Tab>
      <Tab label="Post History" >
        <div id="HistoryList">
            <HistoryListContainer />
        </div>
      </Tab>
    </Tabs>
  </div>
);

export default ContentTabs;