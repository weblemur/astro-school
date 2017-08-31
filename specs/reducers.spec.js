import chai from 'chai';
import chaiThings from 'chai-things';
import { createStore, applyMiddleware } from 'redux';
import campusReducer, { initCampuses, addCampus, removeCampus, editCampus } from '../app/reducers/campuses';
import thunkMiddleware from 'redux-thunk';

const expect = chai.use(chaiThings).expect;
describe('Reducer Specs ––', () => {
  let store;

  describe('Campus Store', () => {
    beforeEach(() => {
      store = createStore(campusReducer, applyMiddleware(thunkMiddleware));
      Object.freeze(store.getState());
    });
    it('is an array', () => {
      expect(store.getState()).to.be.an('array');
      expect(store.getState().length).to.equal(0);
    });
    describe('actions:', () => {
      it('can initialize the whole array', () => {
        store.dispatch(initCampuses([{ id: 1 }, { id: 2 }]));
        expect(store.getState().length).to.equal(2);
      });
      it('can add a campus', () => {
        store.dispatch(addCampus({ id: 1 }));
        store.dispatch(addCampus({ id: 2 }));
        expect(store.getState().length).to.equal(2);
      });
      it('can remove a campus', () => {
        store.dispatch(initCampuses([{ id: 1 }, { id: 2 }]));
        store.dispatch(removeCampus({ id: 1 }));
        expect(store.getState().length).to.equal(1);
        expect(store.getState()[0]).to.have.property('id', 2);
      });
      it('can edit a campus', () => {
        store.dispatch(initCampuses([{ id: 1 }, { id: 2 }]));
        store.dispatch(editCampus({ id: 2, name: 'updated' }));
        expect(store.getState()[1]).to.have.property('name', 'updated');
      });
    });
    describe('thunks:', () => {
      it('can fetch all the campuses');
      it('can create a campus');
      it('can delete a campus');
      it('can update a campus');
    });
  });
});
