import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';

const inputArray = [
  {
    id: '634852326b35b59438fbea2f',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    doorsQty: 4,
    seatsQty: 5,
  },
  {
    id: '634852326b35b59438fbea31',
    model: 'Tempra',
    year: 1995,
    color: 'Black',
    buyValue: 39,
    doorsQty: 2,
    seatsQty: 5,
  },
];

describe('CarService unit tests', function () {
  describe('"getAll" function', function () {
    it('should fetch all cars successfully', async function () {
      const carArrayOutput = inputArray.map((item) => new Car({
        id: item.id,
        model: item.model,
        color: item.color,
        status: item.status,
        year: item.year,
        doorsQty: item.doorsQty,
        seatsQty: item.seatsQty,
        buyValue: item.buyValue,
      }));
    
      sinon.stub(Model, 'find').resolves(carArrayOutput);

      const service = new CarService();
      const result = await service.getAll();

      expect(result).to.be.deep.equal(carArrayOutput);

      sinon.restore();
    });
  });
});