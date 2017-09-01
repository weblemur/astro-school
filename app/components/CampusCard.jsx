import React from 'react';
import { Link } from 'react-router-dom';

export default function CampusCard (props) {
  const { id, name, imageUrl } = props.campus;
  return (
    <div className="campus_preview">
      <Link to={`/campuses/${id}`}>
        <h2 className="planet_name">{name}</h2>
        <div className="planet">
          <img src={imageUrl} alt={`${name} image`} />
        </div>
      </Link>
    </div>
  );
}
