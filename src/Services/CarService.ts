import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car({
        id: car.id,
        model: car.model,
        color: car.color,
        status: car.status,
        year: car.year,
        doorsQty: car.doorsQty,
        seatsQty: car.seatsQty,
        buyValue: car.buyValue,
      });
    }
    return null;
  }

  public async create(carData: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(carData);
    return this.createCarDomain(newCar);
  }
}

export default CarService;
