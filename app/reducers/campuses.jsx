import axios from 'axios';

/***     ACTIONS      ***/

const INIT_CAMPUSES = 'INIT_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const EDIT_CAMPUS = 'EDIT_CAMPUS';

/*** ACTIONS CREATORS ***/

export const initCampuses = campuses => ({ type: INIT_CAMPUSES, campuses });
export const addCampus = campus => ({ type: ADD_CAMPUS, campus });
export const removeCampus = campus => ({ type: REMOVE_CAMPUS, campus });
export const editCampus = campus => ({ type: EDIT_CAMPUS, campus });

/***     THUNKS       ***/

export const fetchCampuses = () => dispatch => {
  return axios.get('/api/campuses')
    .then(res => dispatch(initCampuses(res.data)))
    .catch(err => console.error(err));
};

export const createCampus = campus => dispatch => {
  return axios.post('/api/campuses', campus)
    .then(res => dispatch(addCampus(res.data)))
    .catch(err => console.error(err));
};

export const deleteCampus = campus => dispatch => {
  return axios.delete(`/api/campuses/${campus.id}`)
    .then(res => dispatch(removeCampus(campus)))
    .catch(err => console.error(err));
};

export const updateCampus = campus => dispatch => {
  return axios.put(`/api/campuses/${campus.id}`, campus)
    .then(res => dispatch(editCampus(campus)))
    .catch(err => console.error(err));
};

/***     REDUCER      ***/

export default (state = [], action) => {
  switch (action.type) {
    case INIT_CAMPUSES:
      return action.campuses;

    case ADD_CAMPUS:
      return state.concat(action.campus);

    case REMOVE_CAMPUS:
      return state.filter(campus => campus.id !== action.campus.id);

    case EDIT_CAMPUS:
      return state.map(campus => campus.id !== action.campus.id ? campus : action.campus);

    default: return state;
  }
};
