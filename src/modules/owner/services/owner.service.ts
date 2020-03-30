import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OwnerDto } from '../owner.dto';

@Injectable()
export class OwnerService {
  constructor(@InjectModel('Owner') private ownerModel: Model<IOwner>) {}

  async create(owner: OwnerDto): Promise<IOwner> {
    return new this.ownerModel(owner).save();
  }

  async deleteByDate() {
    const date = new Date();
    date.setMonth(date.getMonth() - 18);
    return this.ownerModel.find({purchaseDate: { $lt: date}}).deleteMany().exec()
  }
}
