import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentCard (props) {
  const { id, name, email, campusId } = props.student;
  const campuses = props.campuses;
  return (
    <li className="student_info">
      <h2 className="student_name">{name}</h2>
      <p className="student_email">{email}</p>
      { campuses ?
        <div className="student_campus">
          <label htmlFor={`${name}_campus`}>Campus:</label>
          <select id={`${name}_campus`} className="student_campus_select" value={campusId}>
            { campuses.map(campus => <option value={campus.id}>{campus.name}</option>) }
          </select>
        </div>
        : null
      }
    </li>
  );
}
