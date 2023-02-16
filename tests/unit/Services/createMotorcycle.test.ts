import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import MotorcycleService from '../../../src/Services/MotorcycleService';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';

const motorcycleInput = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  category: 'Street',
  engineCapacity: 600,
};

const motorcycleOutput = {
  id: '634852326b35b59438fbea2f',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  category: 'Street',
  engineCapacity: 600,
};

describe('MotorcycleService unit tests', function () {
  describe('"create" function', function () {
    it('should create a motorcycle with success', async function () {    
      sinon.stub(Model, 'create').resolves(motorcycleOutput);

      const service = new MotorcycleService();
      const result = await service.create(motorcycleInput);

      expect(result).to.be.deep.equal(motorcycleOutput);

      sinon.restore();
    });

    it('should return null if MotorcycleODM.create returns undefined', async function () {    
      sinon.stub(MotorcycleODM.prototype, 'create').resolves(undefined);

      const service = new MotorcycleService();
      const result = await service.create(motorcycleInput);

      expect(result).to.be.equal(null);

      sinon.restore();
    });
  });
});