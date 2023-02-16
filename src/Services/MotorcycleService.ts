import Motorcycle from '../Domains/Motorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import { IMotorcycle } from '../Interfaces';
import { NotFoundException } from '../exceptions';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle({
        id: motorcycle.id,
        model: motorcycle.model,
        color: motorcycle.color,
        status: motorcycle.status,
        year: motorcycle.year,
        category: motorcycle.category,
        engineCapacity: motorcycle.engineCapacity,
        buyValue: motorcycle.buyValue,
      });
    }
    return null;
  }

  public async create(motorcycleData: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycleData);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAll() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.find();
    const motorcycleArray = motorcycles.map((motorcycle) =>
      this.createMotorcycleDomain(motorcycle));
      
    return motorcycleArray;
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);

    if (!motorcycle) throw new NotFoundException('Motorcycle not found');

    return this.createMotorcycleDomain(motorcycle);
  }

  public async update(id: string, newMotorcycleData: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);

    if (!motorcycle) throw new NotFoundException('Motorcycle not found');

    const updatedMotorcycle = await motorcycleODM.update(id, newMotorcycleData);

    return updatedMotorcycle;
  }
}

export default MotorcycleService;
