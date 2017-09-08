import React from 'react';
import { NavLink } from 'react-router-dom';


// Possible opportunity to refactor:
//
// import { AppLink } from './AppLink';
//
// where `AppLink` would be a component that you write to wrap NavLink
//
// const AppLink = (props) => <NavLink activeClassName="active" {...props}/>
//
// AppLink could pass through all props and keep your activeClassName defined in
// a single place.
export default function Home () {
  return (
    <nav className="nav_bar">
      <NavLink to="/campuses" activeClassName="active">Campuses</NavLink>
      <NavLink to="/students" activeClassName="active">Students</NavLink>
    </nav>
  );
}
