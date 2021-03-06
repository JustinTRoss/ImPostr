import { connect } from 'react-redux';

import PlatformList from '../components/PlatformList';
import { requestPlatformLogout, toggleModal, setSettingsFields, handleFieldChange, validateForm } from '../actions/platformListActions';


const mapStateToProps = (state) => ({
  platforms: state.platformList,
});

const mapDispatchToProps = (dispatch) => ({
  validateForm: (platform, fields) => { dispatch(validateForm(platform, fields)); },
  handleFieldChange: (platform, field, data) => { dispatch(handleFieldChange(platform, field, data)); },
  onLogoutClick: (platform) => dispatch(requestPlatformLogout(platform)),
  onToggleModalClick: (platform) => dispatch(toggleModal(platform)),
  onSetSettingsClick: (platform, settings) => dispatch(setSettingsFields(platform, settings)),
});

const PlatformListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PlatformList);

export default PlatformListContainer;
