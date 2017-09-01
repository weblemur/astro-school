import React from 'react';
import { connect } from 'react-redux';
import StudentCard from './StudentCard';

const Students = (props) => {
  const { students } = props;
  return (
    <div id="content">
      <h1 className="page_title">Students</h1>
      <ul className="students_list">
        { students.map(student => <StudentCard key={student.id} student={student} campuses={props.campuses} />) }
      </ul>
    </div>
  );
};

const mapState = ({ students, campuses }) => ({ students, campuses });

export default connect(mapState)(Students);
