import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';

const inputArray = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Honda Cb 600f Hornet',
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Honda Cbr 1000rr',
    year: 2011,
    color: 'Orange',
    status: true,
    buyValue: 59.900,
    category: 'Street',
    engineCapacity: 1000,
  },
];

describe('MotorcycleService unit tests', function () {
  describe('"getAll" function', function () {
    it('should fetch all motorcycles successfully', async function () {
      const motorcycleArrayOutput = inputArray.map((item) => new Motorcycle({
        id: item.id,
        model: item.model,
        color: item.color,
        status: item.status,
        year: item.year,
        category: item.category,
        engineCapacity: item.engineCapacity,
        buyValue: item.buyValue,
      }));
    
      sinon.stub(Model, 'find').resolves(motorcycleArrayOutput);

      const service = new MotorcycleService();
      const result = await service.getAll();

      expect(result).to.be.deep.equal(motorcycleArrayOutput);

      sinon.restore();
    });
  });
});