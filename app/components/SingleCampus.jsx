import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentCard from './StudentCard';

class SingleCampus extends Component {
  constructor (props) {
    super(props);
    console.log(props);
    this.state = {
      id: Number(props.match.params.id),
      campuses: [],
      currentCampus: {},
      students: [],
      currentStudents: []
    };
  }

  componentWillReceiveProps (newProps) {
    if (newProps.campuses && newProps.campuses.length > 0) {
      const currentCampus = newProps.campuses.find(campus => campus.id === this.state.id) || {};
      this.setState({ campuses: newProps.campuses, currentCampus });
    }

    if (newProps.students && newProps.students.length > 0) {
      const currentStudents = newProps.students.filter(student => student.campusId === this.state.id) || [];
      this.setState({ students: newProps.students, currentStudents });
    }
  }

  render () {
    const { currentCampus, currentStudents, campuses } = this.state;
    return (
      <div id="content">
        <header className="page_header">
          <h1 className="page_title">{currentCampus.name}</h1>
          <button className="btn edit_btn add_campus_button">Edit Campus</button>
        </header>
        <div className="campus_full">
          <div className="planet">
            <img src={currentCampus.imageUrl} alt={`${currentCampus.name} image`} />
          </div>
          <ul className="students_list">
            { currentStudents.map(student => <StudentCard key={student.id} student={student} campuses={campuses} />)}
          </ul>
        </div>
      </div>
    );
  }
}

const mapState = ({ campuses, students }) => ({ campuses, students });

export default connect(mapState)(SingleCampus);
