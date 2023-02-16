import Motorcycle from '../Domains/Motorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import { IMotorcycle } from '../Interfaces';

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
}

export default MotorcycleService;
