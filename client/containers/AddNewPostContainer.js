import { connect } from 'react-redux';

import AddNewPost from '../components/AddNewPost';
import {
  handleDateChange,
  handleTimeChange,
  handleMessageChange,
  handleFacebookChange,
  handleLinkedinChange,
  handleTwitterChange,
  handleFormSubmit,
 } from '../actions/addNewPostActions';


const mapStateToProps = (state) => ({
  fields: state.addNewPost,
});

const mapDispatchToProps = (dispatch) => ({
  handleDateChange: (date) => { dispatch(handleDateChange(date)); },
  handleTimeChange: (time) => { dispatch(handleTimeChange(time)); },
  handleMessageChange: (message) => { dispatch(handleMessageChange(message)); },
  handleFacebookChange: (status) => { dispatch(handleFacebookChange(status)); },
  handleLinkedinChange: (status) => { dispatch(handleLinkedinChange(status)); },
  handleTwitterChange: (status) => { dispatch(handleTwitterChange(status)); },
  handleFormSubmit: (post) => { dispatch(handleFormSubmit(post)); },
});

const AddNewPostContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewPost);

export default AddNewPostContainer;
