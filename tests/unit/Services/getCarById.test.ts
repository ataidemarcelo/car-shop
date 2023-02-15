import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import CarService from '../../../src/Services/CarService';
import CarODM from '../../../src/Models/CarODM';
import { NotFoundException, UnprocessableEntityException } from '../../../src/exceptions';

const RESULT_ERROR = 'Invalid mongo id';

describe('CarService unit tests', function () {
  describe('"getById" function', function () {
    it('should successfully search for a car by ID', async function () {    
      sinon.stub(Model, 'findById').resolves({
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
        status: true,
      });

      const service = new CarService();
      const result = await service.getById('634852326b35b59438fbea31');

      expect(result).to.be.deep.equal({
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
        status: true,
      });

      sinon.restore();
    });

    it(
      'should return status 422 and an Error if the ID is an invalid objectId', 
      async function () {    
        sinon.stub(Model, 'findById').resolves(new UnprocessableEntityException(RESULT_ERROR));

        try {
          const service = new CarService();
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
        sinon.stub(CarODM.prototype, 'findById').resolves(null);

        try {
          const service = new CarService();
          await service.getById('634852326b35b59438fbea');
        } catch (error) {
          expect((error as NotFoundException).message)
            .to.be.equal('Car not found');
          expect((error as NotFoundException).status).to.be.equal(404);
        }

        sinon.restore();
      },
    );
  });
});