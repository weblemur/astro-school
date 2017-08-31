import React from 'react';
import chai from 'chai';
import chaiThings from 'chai-things';
import { shallow } from 'enzyme';

import Campuses from '../app/components/Campuses';
import CampusCard from '../app/components/CampusCard';

const expect = chai.use(chaiThings).expect;

describe('View Specs ––', () => {

  describe('<CampusCard /> Component', () => {
    const campus = { id: 1, name: 'campus1', imageUrl: '/test.jpg' };
    let campusCard;
    beforeEach(() => campusCard = shallow(<CampusCard campus={campus} />));

    it('renders the campus name and image passed to it', () => {
      expect(campusCard.findWhere(node => node.text().includes('campus1')).length).to.be.above(0);
      expect(campusCard.find('img[src="/test.jpg"]').length).to.equal(1);
    });
    it('links to the single campus view', () => {
      expect(campusCard.find('Link[to="/campuses/1"]').length).to.equal(1);
    });
  });

  describe('<Campuses /> Component', () => {
    const campuses = [{ id: 1, name: 'campus1' }, { id: 2, name: 'campus2' }];
    let campus;
    beforeEach(() => campus = shallow(<Campuses campuses={campuses} />));

    it('renders a <CampusCard /> for each campus');
    it('passes unique info to every <CampusCard />');
  });
});
