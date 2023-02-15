import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import CarService from '../../../src/Services/CarService';

const carInput = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
};

const carOutput = {
  id: '634852326b35b59438fbea2f',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
};

describe('CarService unit tests', function () {
  describe('"create" function', function () {
    it('should create a car with success', async function () {    
      sinon.stub(Model, 'create').resolves(carOutput);

      const service = new CarService();
      const result = await service.create(carInput);

      expect(result).to.be.deep.equal(carOutput);

      sinon.restore();
    });
  });
});