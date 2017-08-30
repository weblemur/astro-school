import React from 'react';
import { NavLink } from 'react-router-dom';


export default function Home () {
  return (
    <nav>
      <NavLink to="/campuses" activeClassName="active">Campuses</NavLink>
      <NavLink to="/students" activeClassName="active">Students</NavLink>
    </nav>
  );
}
