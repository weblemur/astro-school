import React from 'react';
import { connect } from 'react-redux';
import StudentCard from './StudentCard';

const SingleCampus = (props) => {
  const { campus, students } = props;
  const { name, imageUrl } = campus;

  return (
    <div id="content">
      <header className="page_header">
        <h1 className="page_title">{name}</h1>
        <button className="btn edit_btn add_campus_button">Edit Campus</button>
      </header>
      <div className="campus_full">
        <div className="planet">
          <img src={imageUrl} alt={`${name} image`} />
        </div>
        <ul className="campus_list">
          { students.map(student => <StudentCard key={student.id} student={student} campuses={props.campuses} />)}
        </ul>
      </div>
    </div>
  );
};

const mapState = (state, ownProps) => {
  const thisId = Number(ownProps.match.params.id);
  const thisCampus = state.campuses.find(campus => campus.id === thisId);
  const students = state.students.filter(student => student.campusId === thisId);
  return { campus: thisCampus || {}, students };
};

export default connect(mapState)(SingleCampus);
