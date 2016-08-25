import React from 'react';
import ContentTabs from './ContentTabs';
import ContentSwitch from './ContentSwitch';

const Home = ({ requestLogout }) => (
  <div id="Home">
    <ContentTabs requestLogout={requestLogout} />
  </div>
);

export default Home;
