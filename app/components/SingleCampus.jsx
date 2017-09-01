import React from 'react';
import { connect } from 'react-redux';
import StudentCard from './StudentCard';

const SingleCampus = (props) => {
  const { campus, students } = props;
  const { name, imageUrl } = campus;

  return (
    <div id="content">
      <h1 className="page_title">{name}</h1>
      <div className="campus_full planet">
        <img src={imageUrl} alt={`${name} image`} />
      </div>
      <ul className="campus_list">
        { students.map(student => <StudentCard key={student.id} student={student} campuses={props.campuses} />)}
      </ul>
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
