import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import MotorcycleService from '../../../src/Services/MotorcycleService';
import MotorcycleODM from '../../../src/Models/MotorcycleODM';
import { NotFoundException, UnprocessableEntityException } from '../../../src/exceptions';

const RESULT_ERROR = 'Invalid mongo id';

describe('MotorcycleService unit tests', function () {
  describe('"getById" function', function () {
    it('should successfully search for a motorcycle by ID', async function () {    
      sinon.stub(Model, 'findById').resolves({
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      });

      const service = new MotorcycleService();
      const result = await service.getById('634852326b35b59438fbea2f');

      expect(result).to.be.deep.equal({
        id: '634852326b35b59438fbea2f',
        model: 'Honda Cb 600f Hornet',
        year: 2005,
        color: 'Yellow',
        status: true,
        buyValue: 30.000,
        category: 'Street',
        engineCapacity: 600,
      });

      sinon.restore();
    });

    it(
      'should return status 422 and an Error if the ID is an invalid objectId', 
      async function () {    
        sinon.stub(Model, 'findById').resolves(new UnprocessableEntityException(RESULT_ERROR));

        try {
          const service = new MotorcycleService();
          await service.getById('invalid_object_id');
        } catch (error) {
          expect((error as UnprocessableEntityException).message)
            .to.be.equal('Invalid mongo id');
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
          await service.getById('634852326b35b59438fbea');
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