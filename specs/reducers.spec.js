import chai from 'chai';
import chaiThings from 'chai-things';
import { createStore, applyMiddleware } from 'redux';
import campusReducer from '../app/reducers/campuses';
import thunkMiddleware from 'redux-thunk';

const expect = chai.use(chaiThings).expect;
describe('Reducer Specs ––', () => {
  let store;

  describe('Campus Store', () => {
    beforeEach(() => {
      store = createStore(campusReducer, applyMiddleware(thunkMiddleware));
      store = createStore(campusReducer);
    });
    it('is an array', () => {
      expect(store.getState()).to.be.an('array');
    });
    describe('actions:', () => {
      it('can initialize the whole array');
      it('can add a campus');
      it('can remove a campus');
      it('can edit a campus');
    });
    describe('thunks:', () => {
      it('can fetch all the campuses');
      it('can create a campus');
      it('can delete a campus');
      it('can update a campus');
    });
  });
});
