/***     ACTIONS      ***/

const WRITE_CAMPUS_NAME = 'WRITE_CAMPUS_NAME';
const WRITE_CAMPUS_IMAGE_URL = 'WRITE_CAMPUS_IMAGE_URL';

/*** ACTIONS CREATORS ***/

export const writeCampusName = name => ({ type: WRITE_CAMPUS_NAME, name });
export const writeCampusImageUrl = imageUrl => ({ type: WRITE_CAMPUS_IMAGE_URL, imageUrl });

/***     REDUCER      ***/

export default (state = { name: '', imageUrl: ''}, action) => {
  switch (action.type) {
    case WRITE_CAMPUS_NAME:
      return Object.assign({}, state, { name: action.name });

    case WRITE_CAMPUS_IMAGE_URL:
      return Object.assign({}, state, { imageUrl: action.imageUrl });

    default: return state;
  }
};
