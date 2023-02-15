import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';

import CarService from '../../../src/Services/CarService';
import CarODM from '../../../src/Models/CarODM';
import { NotFoundException, UnprocessableEntityException } from '../../../src/exceptions';

const RESULT_ERROR = 'Invalid mongo id';

describe('CarService unit tests', function () {
  describe('"update" function', function () {
    it('should successfully update a car by ID', async function () {    
      sinon.stub(Model, 'findOne').resolves({
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
        status: true,
      });
      sinon.stub(Model, 'updateOne').resolves();
    
      const service = new CarService();
      const updatedCar = await service.update('634852326b35b59438fbea31', {
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
        status: true,
      });
    
      expect(updatedCar).to.deep.equal({
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
        sinon.stub(Model, 'findOne').resolves();
        sinon.stub(Model, 'updateOne').resolves();
      
        try {
          const service = new CarService();
          await service.update('invalid_object_id', {
            model: 'Tempra',
            year: 1995,
            color: 'Black',
            buyValue: 39,
            doorsQty: 2,
            seatsQty: 5,
            status: true,
          });
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
        sinon.stub(CarODM.prototype, 'findById').resolves(null);

        try {
          const service = new CarService();
          await service.update('634852326b35b59438fbea', {
            model: 'Tempra',
            year: 1995,
            color: 'Black',
            buyValue: 39,
            doorsQty: 2,
            seatsQty: 5,
            status: true,
          });
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