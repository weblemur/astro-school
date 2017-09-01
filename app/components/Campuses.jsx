import React from 'react';
import { connect } from 'react-redux';
import CampusCard from './CampusCard';

const Campuses = (props) => {
  const { campuses } = props;
  return (
    <div id="content">
      <h1 className="page_title">Campuses</h1>
      { campuses.map(campus => <CampusCard key={campus.id} campus={campus} />) }
    </div>
  );
};

const mapState = ({ campuses }) => ({ campuses });

export default connect(mapState)(Campuses);
