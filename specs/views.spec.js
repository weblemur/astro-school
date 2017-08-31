import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Campuses from '../app/components/Campuses';
import CampusCard from '../app/components/CampusCard';

describe('View Specs ––', () => {

  describe('<CampusCard /> Component', () => {
    const campus = { id: 1, name: 'campus1', imageUrl: '/test.jpg' };
    let campusCard;
    beforeEach(() => campusCard = shallow(<CampusCard campus={campus} />));

    it('renders the name and image passed to it');
    it('links to the single campus view');
  });

  describe('<Campuses /> Component', () => {
    const campuses = [{ id: 1, name: 'campus1' }, { id: 2, name: 'campus2' }];
    let campus;
    beforeEach(() => campus = shallow(<Campuses campuses={campuses} />));

    it('renders a <CampusCard /> for each campus');
    it('passes unique info to every <CampusCard />');
  });
});
