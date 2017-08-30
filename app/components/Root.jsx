import React from 'react';
import Navbar from './Navbar';

export default function RootWrapper ({ children }) {
  return (
    <div id="main">
      <Navbar />
      { children }
    </div>
  );
}
