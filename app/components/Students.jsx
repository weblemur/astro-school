import React from 'react';
import { connect } from 'react-redux';
import StudentCard from './StudentCard';

const Students = (props) => {
  const { students } = props;
  return (
    <div>
      <h1>Students</h1>
      { students.map(student => <StudentCard key={student.id} student={student} campuses={props.campuses} />) }
    </div>
  );
};

const mapState = ({ students, campuses }) => ({ students, campuses });

export default connect(mapState)(Students);
