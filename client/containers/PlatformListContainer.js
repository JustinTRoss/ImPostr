import { connect } from 'react-redux';

import PlatformList from '../components/PlatformList';
import { requestPlatformLogin, logoutPlatform, toggleModal, setSettingsFields } from '../actions/platformListActions';

const mapStateToProps = (state) => {
  return {
    platforms: state.platformList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginClick: (platform) => dispatch(requestPlatformLogin(platform)),
    onLogoutClick: (platform) => dispatch(logoutPlatform(platform)),
    onToggleModalClick: (platform) => dispatch(toggleModal(platform)),
    onSetSettingsClick: (platform, settings) => dispatch(setSettingsFields(platform, settings)),
  };
};

const PlatformListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlatformList);

export default PlatformListContainer;
