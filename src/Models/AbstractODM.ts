import {
  isValidObjectId,
  Model,
  models,
  Schema,
  model,
} from 'mongoose';
import { UnprocessableEntityException } from '../exceptions';

abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }

  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) throw new UnprocessableEntityException('Invalid mongo id');

    return this.model.findById(id);
  }
}

export default AbstractODM;
