import {
  isValidObjectId,
  Model,
  models,
  Schema,
  model,
  UpdateQuery,
} from 'mongoose';
import { UnprocessableEntityException } from '../exceptions';

const MESSAGE_ERROR = 'Invalid mongo id';

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
    if (!isValidObjectId(id)) throw new UnprocessableEntityException(MESSAGE_ERROR);

    return this.model.findById(id);
  }

  public async update(id: string, obj: T): Promise<T | null> {
    if (!isValidObjectId(id)) throw new UnprocessableEntityException(MESSAGE_ERROR);

    await this.model.updateOne(
      { _id: id },
      { ...obj } as UpdateQuery<T>,
    );
    
    return { id, ...obj } as T;
  }
}

export default AbstractODM;
