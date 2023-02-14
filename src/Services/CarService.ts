import Car from '../Domains/Car';
import { NotFoundException } from '../exceptions';
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

  public async getAll() {
    const carODM = new CarODM();
    const cars = await carODM.find();
    const carArray = cars.map((car) =>
      this.createCarDomain(car));
    return carArray;
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.findById(id);

    if (!car) throw new NotFoundException('Car not found');

    return this.createCarDomain(car);
  }
}

export default CarService;
