import Car from '../Domains/Car';
import CarODM from '../Models/CarODM';
import { ICar } from '../Interfaces';
import { NotFoundException } from '../exceptions';

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

  public async update(id: string, newCarData: ICar) {
    const carODM = new CarODM();
    const car = await carODM.findById(id);

    if (!car) throw new NotFoundException('Car not found');

    const updatedCar = await carODM.update(id, newCarData);

    return updatedCar;
  }
}

export default CarService;
