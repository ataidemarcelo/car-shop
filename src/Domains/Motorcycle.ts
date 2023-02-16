import { IMotorcycle } from '../Interfaces';

export default class Motorcycle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean;
  protected buyValue: number;
  private category: string;
  private engineCapacity: number;

  constructor(params: IMotorcycle) {
    this.id = params.id;
    this.model = params.model;
    this.year = params.year;
    this.color = params.color;
    this.status = params.status;
    this.buyValue = params.buyValue;
    this.category = params.category;
    this.engineCapacity = params.engineCapacity;
  }

  getCategory(): string {
    return this.category;
  }

  setCategory(value: string) {
    this.category = value;
  }

  getEngineCapacity(): number {
    return this.engineCapacity;
  }

  setEngineCapacity(value: number) {
    this.engineCapacity = value;
  }
}