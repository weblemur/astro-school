import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentCard (props) {
  const { id, name, email, campusId } = props.student;
  const campuses = props.campuses;
  return (
    <li>
      <h2>{name}</h2>
      <p>{email}</p>
      <select value={campusId}>
        { campuses.map(campus => <option value={campus.id}>{campus.name}</option>) }
      </select>
    </li>
  );
}
