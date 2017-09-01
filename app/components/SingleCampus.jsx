import React, { Component } from 'react';
import { connect } from 'react-redux';
import StudentCard from './StudentCard';
import CampusForm from './CampusForm';
import { setCampus } from '../reducers/currentCampus';
import { updateCampus } from '../reducers/campuses';

class SingleCampus extends Component {
  constructor (props) {
    super(props);
    this.state = {
      currentStudents: [],
      editing: false
    };

    this.startEditing = this.startEditing.bind(this);
    this.discardEdits = this.discardEdits.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    this.setCurrentCampus(this.props.campuses);
    this.setCurrentStudents(this.props.students);
  }

  componentWillReceiveProps (newProps) {
    if (!this.props.currentCampus.name && newProps.campuses && newProps.campuses.length > 0) {
      this.setCurrentCampus(newProps.campuses);
    }

    if (newProps.students && newProps.students.length > 0) {
      this.setCurrentStudents(newProps.students);
    }
  }

  setCurrentCampus (campuses) {
    const newCampus = campuses.find(campus => campus.id === Number(this.props.match.params.id));
    if (newCampus) {
      this.props.initCampus(newCampus);
    }
  }

  setCurrentStudents (students) {
    const newStudents = students.filter(student => student.campusId === Number(this.props.match.params.id));
    if (newStudents.length > 0) {
      this.setState({ currentStudents: newStudents });
    }
  }

  discardEdits () {
    this.setState({ editing: false });
    this.setCurrentCampus(this.props.campuses);
  }

  startEditing () {
    this.setState({ editing: true });
  }

  handleSubmit (evt) {
    evt.preventDefault();
    this.setState({ editing: false });
    this.props.submitEdits({
      id: Number(this.props.match.params.id),
      name: evt.target.name.value,
      imageUrl: evt.target.image.value
    });
  }

  render () {
    const { currentStudents, editing } = this.state;
    const { currentCampus, campuses } = this.props;
    return (
      <div id="content">
        <header className="page_header">
          <h1 className="page_title">{currentCampus.name}</h1>
            <div className="page_controls">
              <button
                className="btn edit_btn edit_campus_button"
                onClick={ editing ? this.discardEdits : this.startEditing }>
                  { editing ? 'Discard Edits' : 'Edit Campus' }
                </button>
            </div>
        </header>
        { editing && <CampusForm handleSubmit={this.handleSubmit}  /> }
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

const mapState = ({ campuses, students, currentCampus }) => ({ campuses, students, currentCampus });
const mapDispatch = (dispatch) => ({
  initCampus: campus => dispatch(setCampus(campus)),
  submitEdits: campus => dispatch(updateCampus(campus))
});

export default connect(mapState, mapDispatch)(SingleCampus);
