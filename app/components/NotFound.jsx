import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound () {
  return (
    <div id="content">
      <h1 className="page_title">404 – not found</h1>
      <Link to="/">return home</Link>
    </div>
  );
}
