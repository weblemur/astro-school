import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound () {
  return (
    <div>
      <h1>404 – not found</h1>
      <Link to="/">return home</Link>
    </div>
  );
}
