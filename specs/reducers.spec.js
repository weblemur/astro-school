const { expect } = require('chai').use(require('chai-things'));
const { createStore, applyMiddleware } = require('redux');
const reducers = require('../app/reducers');
const thunkMiddleware = require('redux-thunk');
let store = {};

describe('Reducer Specs ––', () => {
  beforeEach(() => store = createStore(reducers, applyMiddleware(thunkMiddleware)));

  describe('Campus Store', () => {
    let state;
    it('is an array');
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
