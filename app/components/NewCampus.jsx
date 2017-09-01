import React from 'react';
import { connect } from 'react-redux';
// import CampusCard from './CampusCard'; // NEEDS OPTIONAL LINK WRAPPING

const NewCampus = (props) => {

  return (
    <div id="content">
      <h1 className="page_title">Create new Campus</h1>
      <form className="new_entry_form new_campus_form">
        <div className="form_group">
          <label htmlFor="campus_name_input">Name</label>
          <input id="campus_name_input" type="text" />
        </div>
        <div className="form_group">
          <label htmlFor="campus_image_input">Image URL</label>
          <input id="campus_image_input" type="text" />
        </div>
        <input className="btn btn_submit" type="submit" value="Create" />
      </form>
    </div>
  );
};

const mapState = () => ({});

export default connect(mapState)(NewCampus);
