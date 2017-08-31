import React from 'react';
import { Link } from 'react-router-dom';

export default function Campuses (props) {
  const { id, name, imageUrl } = props.campus;
  return (
    <div>
      <Link to={`/campuses/${id}`}>
        <h2>{name}</h2>
        <img src={imageUrl} alt={`${name} image`} />
      </Link>
    </div>
  );
}
