import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { writeCampusName, writeCampusImageUrl } from '../reducers/newCampusEntry';
import { createCampus } from '../reducers/campuses';
// import CampusCard from './CampusCard'; // NEEDS OPTIONAL LINK WRAPPING

const NewCampus = (props) => {
  const { changeName, changeUrl, submitCampus } = props;
  const { name, imageUrl } = props.newCampusEntry;
  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitCampus({ name: evt.target.name.value, imageUrl: evt.target.image.value })
      .then(props.history.push('/campuses'));
  };

  return (
    <div id="content">
      <h1 className="page_title">Create new Campus</h1>
      <form className="new_entry_form new_campus_form" onSubmit={handleSubmit}>
        <div className="form_group">
          <label htmlFor="campus_name_input">Name</label>
          <input
            id="campus_name_input"
            name="name"
            type="text"
            value={name}
            onChange={changeName} />
        </div>
        <div className="form_group">
          <label htmlFor="campus_image_input">Image URL</label>
          <input
            id="campus_image_input"
            name="image"
            type="text"
            value={imageUrl}
            onChange={changeUrl} />
        </div>
        <input className="btn btn_submit" type="submit" value="Create" />
      </form>
    </div>
  );
};

const mapState = ({ newCampusEntry }) => ({ newCampusEntry });
const mapDispatch = dispatch => ({
  changeName: (evt) => {
    evt.preventDefault();
    dispatch(writeCampusName(evt.target.value));
  },
  changeUrl: (evt) => {
    evt.preventDefault();
    dispatch(writeCampusImageUrl(evt.target.value));
  },
  submitCampus: (campus) => {
    dispatch(writeCampusName(''));
    dispatch(writeCampusImageUrl(''));
    return dispatch(createCampus(campus));
  }
});

export default withRouter(connect(mapState, mapDispatch)(NewCampus));
