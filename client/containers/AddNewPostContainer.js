import { connect } from 'react-redux';

import AddNewPost from '../components/AddNewPost';
import {
  handleFieldChange,
  handleFormSubmit,
  validateForm,
  resetForm,
 } from '../actions/addNewPostActions';


const mapStateToProps = (state) => ({
  fields: state.addNewPost,
  platforms: state.platformList,
});

const mapDispatchToProps = (dispatch) => ({
  handleFieldChange: (field, data) => { dispatch(handleFieldChange(field, data)); },
  handleFormSubmit: (post) => { dispatch(handleFormSubmit(post)); },
  validateForm: (fields) => { dispatch(validateForm(fields)); },
  resetForm: () => { dispatch(resetForm()); },
});

const AddNewPostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewPost);

export default AddNewPostContainer;
