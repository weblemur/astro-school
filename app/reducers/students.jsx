import axios from 'axios';

/***     ACTIONS      ***/

const INIT_STUDENTS = 'INIT_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const EDIT_STUDENT = 'EDIT_STUDENT';

/*** ACTIONS CREATORS ***/

export const initStudents = students => ({ type: INIT_STUDENTS, students });
export const addStudent = student => ({ type: ADD_STUDENT, student });
export const removeStudent = student => ({ type: REMOVE_STUDENT, student });
export const editStudent = student => ({ type: EDIT_STUDENT, student });

/***     THUNKS       ***/

export const fetchStudents = () => dispatch => {
  return axios.get('/api/students')
    .then(res => dispatch(initStudents(res.data)))
    .catch(err => console.error(err));
};

export const createStudent = student => dispatch => {
  return axios.post('/api/students', student)
    .then(res => dispatch(addStudent(res.data)))
    .catch(err => console.error(err));
};

export const deleteStudent = student => dispatch => {
  return axios.delete(`/api/students/${student.id}`)
    .then(res => dispatch(removeStudent(student)))
    .catch(err => console.error(err));
};

export const updateStudent = student => dispatch => {
  return axios.put(`/api/students/${student.id}`, student)
    .then(res => dispatch(editStudent(student)))
    .catch(err => console.error(err));
};

/***     REDUCER      ***/

export default (state = [], action) => {
  switch (action.type) {
    case INIT_STUDENTS:
      return action.students;

    case ADD_STUDENT:
      return state.concat(action.student);

    case REMOVE_STUDENT:
      return state.filter(student => student.id !== action.student.id);

    case EDIT_STUDENT:
      return state.map(student => student.id !== action.student.id ? student : action.student);

    default: return state;
  }
};
