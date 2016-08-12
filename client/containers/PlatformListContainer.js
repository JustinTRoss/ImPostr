import { connect } from 'react-redux';

import PlatformList from '../components/PlatformList';
import { selectPlatformLogin, selectPlatformLogout, toggleModal, setSettingsFields } from '../actions/platformListActions';


const mapStateToProps = (state) => ({
  platforms: state.platformList,
});

const mapDispatchToProps = (dispatch) => ({
  onLoginClick: (platform) => dispatch(selectPlatformLogin(platform)),
  onLogoutClick: (platform) => dispatch(selectPlatformLogout(platform)),
  onToggleModalClick: (platform) => dispatch(toggleModal(platform)),
  onSetSettingsClick: (platform, settings) => dispatch(setSettingsFields(platform, settings)),
});

const PlatformListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlatformList);

export default PlatformListContainer;
