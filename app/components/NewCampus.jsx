import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { createCampus } from '../reducers/campuses';
import CampusForm from './CampusForm';
// import CampusCard from './CampusCard'; // NEEDS OPTIONAL LINK WRAPPING

const NewCampus = (props) => {
  const { submitCampus } = props;
  const handleSubmit = (evt) => {
    evt.preventDefault();
    submitCampus({ name: evt.target.name.value, imageUrl: evt.target.image.value })
      .then(props.history.push('/campuses'));
  };

  return (
    <div id="content">
      <h1 className="page_title">Create new Campus</h1>
      <CampusForm handleSubmit={handleSubmit} />
    </div>
  );
};

const mapState = null;
const mapDispatch = dispatch => ({
  submitCampus: (campus) => {
    return dispatch(createCampus(campus));
  }
});

export default withRouter(connect(mapState, mapDispatch)(NewCampus));
