import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ManufacturerDto } from '../manufacturer.dto';

@Injectable()
export class ManufacturerService {
  constructor(@InjectModel('Manufacturer') private manufacturerModel: Model<IManufacturer>) {}

  async create(manufacturer: ManufacturerDto): Promise<IManufacturer> {
    return new this.manufacturerModel(manufacturer).save();
  }

  async findOneById(_id: string): Promise<IManufacturer> {
    return this.manufacturerModel.findOne({_id}).exec();
  }
}
