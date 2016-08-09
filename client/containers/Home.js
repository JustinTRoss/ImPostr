import React from 'react';
import { connect } from 'react-redux';
<<<<<<< 67239dfa5ccfb2c8554cf42aa6882dfb22a8381c
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
=======
import PlatformList from '../components/PlatformList';
import PostQueue from '../components/PostQueue';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>Home
        <div>
          <PlatformList platforms={this.props.platformList} />
        </div>
        <div>
          <PostQueue posts={this.props.postQueue} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    platformList: state.platformList,
    postQueue: state.postQueue,
  };
}

Home = connect(mapStateToProps)(Home);

export default Home;
>>>>>>> Implement broken auth
