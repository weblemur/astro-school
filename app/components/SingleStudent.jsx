import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const SingleStudent = (props) => {
  const { campus, student } = props;

  return (
    <div id="content">
      <h1 className="page_title">{student.name}</h1>
      <p className="student_email">{student.email}</p>
      <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
    </div>
  );
};

const mapState = (state, ownProps) => {
  const thisId = Number(ownProps.match.params.id);
  const thisStudent = state.students.find(student => student.id === thisId) || {};
  const thisCampus = state.campuses.find(campus => campus.id === thisStudent.campusId) || {};
  return { campus: thisCampus, student: thisStudent };
};

export default connect(mapState)(SingleStudent);
