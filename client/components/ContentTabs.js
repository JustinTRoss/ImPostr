import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import PostQueueContainer from '../containers/PostQueueContainer';
import AddNewPostContainer from '../containers/AddNewPostContainer';
import HistoryListContainer from '../containers/HistoryListContainer';
import PlatformListContainer from '../containers/PlatformListContainer';


const ContentTabs = ({ requestLogout }) => (
  <div className="fluid-container">
    <div className="row">
      <div className="nav nav-tabs col-xs-3 row" role="tablist">
        <li className="nav-item col-xs topTab">
          <a
            className="nav-link active text-nowrap accountTab"
            data-toggle="tab"
            href="#account"
            role="tab"
          >Accounts</a>
        </li>
      </div>
      <div className="col-xs p-x-0 m-x-0">
        <ul className="nav nav-tabs row" role="tablist">
          <li className="nav-item col-xs topTab">
            <a
              className="nav-link text-nowrap centerAll mainLink"
              data-toggle="tab"
              href="#postNew"
              role="tab"
            >New Post<i className="material-icons">queue</i></a>
          </li>
          <li className="nav-item col-xs topTab">
            <a
              className="nav-link active text-nowrap centerAll mainLink"
              data-toggle="tab"
              href="#postQueue"
              role="tab"
            >Queue<i className="material-icons">layers</i></a>
          </li>
          <li className="nav-item col-xs topTab">
            <a
              className="nav-link text-nowrap centerAll mainLink"
              data-toggle="tab"
              href="#postHistory"
              role="tab"
            >History<i className="material-icons">history</i></a>
          </li>
          <li className="col-xs row topTab">
            <span className="nav-item dropdown col-xs-8">
              <a
                className="nav-link dropdown-toggle text-xs-center text-nowrap centerAll mainLink"
                data-toggle="dropdown"
                href="#"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >Settings<i className="material-icons">settings</i></a>
              <div className="dropdown-menu text-xs-right">
                <a className="dropdown-item" onClick={requestLogout} >Logout</a>
              </div>
            </span>
            <span className="col-xs" />
          </li>
        </ul>
      </div>
    </div>
    <div className="row">
      <ul className="tab-content col-xs-3">
        <li className="tab-pane active accountBack" id="account" role="tabpanel">
          <PlatformListContainer />
        </li>
      </ul>
      <ul className="tab-content col-xs white">
        <li className="tab-pane white" id="postNew" role="tabpanel">
          <AddNewPostContainer />
        </li>
        <li className="tab-pane active white" id="postQueue" role="tabpanel">
          <PostQueueContainer />
        </li>
        <li className="tab-pane white" id="postHistory" role="tabpanel">
          <HistoryListContainer />
        </li>
      </ul>
    </div>
  </div>

);

export default ContentTabs;
