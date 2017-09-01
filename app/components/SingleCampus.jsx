import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentCard from './StudentCard';

class SingleCampus extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentCampus: {},
      currentStudents: []
    };
  }

  componentDidMount () {
    this.setCurrentCampus(this.props.campuses);
    this.setCurrentStudents(this.props.students);
  }

  componentWillReceiveProps (newProps) {
    if (newProps.campuses && newProps.campuses.length > 0) {
      this.setCurrentCampus(newProps.campuses);
    }

    if (newProps.students && newProps.students.length > 0) {
      this.setCurrentStudents(newProps.students);
    }
  }

  setCurrentCampus (campuses) {
    const newCampus = campuses.find(campus => campus.id === Number(this.props.match.params.id));
    if (newCampus) {
      this.setState({ currentCampus: newCampus });
    }
  }

  setCurrentStudents (students) {
    const newStudents = students.filter(student => student.campusId === Number(this.props.match.params.id));
    if (newStudents.length > 0) {
      this.setState({ currentStudents: newStudents });
    }
  }

  render () {
    const { currentCampus, currentStudents } = this.state;
    const { campuses } = this.props;
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
