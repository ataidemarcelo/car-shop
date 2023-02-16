import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import MotorcycleService from '../../../src/Services/MotorcycleService';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import { NotFoundException, UnprocessableEntityException } from '../../../src/exceptions';

const RESULT_ERROR = 'Invalid mongo id';

const inputObject = {
  model: 'Honda Cb 600f Hornet',
  year: 2014,
  color: 'Red',
  status: true,
  buyValue: 45.000,
  category: 'Street',
  engineCapacity: 600,
};

const outputObject = {
  id: '634852326b35b59438fbea2f',
  model: 'Honda Cb 600f Hornet',
  year: 2014,
  color: 'Red',
  status: true,
  buyValue: 45.000,
  category: 'Street',
  engineCapacity: 600,
};

describe('MotorcycleService unit tests', function () {
  describe('"update" function', function () {
    it('should successfully update a motorcycle by ID', async function () {    
      sinon.stub(Model, 'findOne').resolves(outputObject);
      sinon.stub(Model, 'updateOne').resolves();
    
      const service = new MotorcycleService();
      const updatedMotorcycle = await service.update('634852326b35b59438fbea2f', inputObject);
    
      expect(updatedMotorcycle).to.deep.equal(outputObject);

      sinon.restore();
    });

    it(
      'should return status 422 and an Error if the ID is an invalid objectId', 
      async function () {    
        sinon.stub(Model, 'findOne').resolves();
        sinon.stub(Model, 'updateOne').resolves();
      
        try {
          const service = new MotorcycleService();
          await service.update('invalid_object_id', inputObject);
        } catch (error) {
          expect((error as UnprocessableEntityException).message)
            .to.be.equal(RESULT_ERROR);
          expect((error as UnprocessableEntityException).status).to.be.equal(422);
        } 

        sinon.restore();
      },
    );

    it(
      'should return status 404 and an Error if the ID is valid but does not exist in the DB', 
      async function () {    
        sinon.stub(MotorcycleODM.prototype, 'findById').resolves(null);

        try {
          const service = new MotorcycleService();
          await service.update('634852326b35b59438fbea', inputObject);
        } catch (error) {
          expect((error as NotFoundException).message)
            .to.be.equal('Motorcycle not found');
          expect((error as NotFoundException).status).to.be.equal(404);
        }

        sinon.restore();
      },
    );
  });
});