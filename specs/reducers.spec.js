import chai from 'chai';
import chaiThings from 'chai-things';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import campusReducer, { initCampuses, addCampus, removeCampus, editCampus, fetchCampuses, createCampus, deleteCampus, updateCampus } from '../app/reducers/campuses';

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
      let mock = new MockAdapter(axios);
      beforeEach(() => mock.reset());
      after(() => mock.restore());

      it('can fetch all the campuses', () => {
        mock.onGet('/api/campuses').reply(200, [{ id: 1 }, { id: 2 }]);
        return store.dispatch(fetchCampuses())
          .then(() => {
            expect(store.getState().length).to.equal(2);
          });
      });
      it('can create a campus', () => {
        store.dispatch(initCampuses([{ id: 1 }, { id: 2 }]));
        mock.onPost('/api/campuses').reply(config =>
          [201, Object.assign({ id: 3 }, JSON.parse(config.data))]);
        return store.dispatch(createCampus({ name: 'New Campus' }))
          .then(() => {
            expect(store.getState()[2]).to.have.property('id', 3);
            expect(store.getState()[2]).to.have.property('name', 'New Campus');
          });
      });
      it('can delete a campus', () => {
        store.dispatch(initCampuses([{ id: 1 }, { id: 2 }]));
        mock.onDelete('/api/campuses/1').reply(204);
        return store.dispatch(deleteCampus({ id: 1 }))
          .then(() => {
            expect(store.getState().length).to.equal(1);
            expect(store.getState()[0]).to.have.property('id', 2);
          });
      });
      it('can update a campus', () => {
        store.dispatch(initCampuses([{ id: 1 }, { id: 2, name: 'init' }]));
        mock.onPut('/api/campuses/2').reply(config =>
          [201, Object.assign({ id: 2, name: 'init' }, JSON.parse(config.data))]);
        return store.dispatch(updateCampus({ id: 2, name: 'updated' }))
          .then(() => {
            expect(store.getState()[1]).to.have.property('name', 'updated');
          });
      });
    });
  });
});
