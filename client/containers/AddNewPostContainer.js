import { connect } from 'react-redux';

import AddNewPost from '../components/AddNewPost';
import {
  handleFieldChange,
  handleFormSubmit,
  resetForm,
 } from '../actions/addNewPostActions';


const mapStateToProps = (state) => ({
  fields: state.addNewPost,
});

const mapDispatchToProps = (dispatch) => ({
  handleFieldChange: (field, data) => { dispatch(handleFieldChange(field, data)); },
  handleFormSubmit: (post) => { dispatch(handleFormSubmit(post)); },
  resetForm: () => { dispatch(resetForm()); },
});

const AddNewPostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewPost);

export default AddNewPostContainer;
