import { combineReducers } from 'redux';
import campuses from './campuses';
import students from './students';
import newCampusEntry from './newCampusEntry';

export default combineReducers({ campuses, students, newCampusEntry });
