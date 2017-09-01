import { combineReducers } from 'redux';
import campuses from './campuses';
import students from './students';
import currentCampus from './currentCampus';

export default combineReducers({ campuses, students, currentCampus });
