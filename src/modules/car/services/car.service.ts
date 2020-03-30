import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CarDto } from '../car.dto';
import { ManufacturerService } from '../../manufacturer/services/manufacturer.service';
import { ManufacturerDto } from '../../manufacturer/manufacturer.dto';
import { OwnerDto } from '../../owner/owner.dto';
import { OwnerService } from '../../owner/services/owner.service';

@Injectable()
export class CarService {
  constructor(
    @InjectModel('Car') private carModel: Model<ICar>,
    private readonly manufacturerService: ManufacturerService,
    private readonly ownerService: OwnerService
  ) {}

  async findCarById(_id: string): Promise<ICar> {
    return this.carModel.findOne({_id}).exec();
  }

  findAll(): ICar[] {
    return this.carModel.find().exec();
  }

  async calculateCarAndOwnerDates() {
    await this.ownerService.deleteByDate();
    await this.carDiscount();
    return true
  }

  async carDiscount() {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 18);
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() - 12);
    const cars = await this.carModel.find(
      {
        firstRegistrationDate: { $gt: startDate, $lt: endDate },
      }
    ).exec();
    cars.forEach(car => {
      car.price = car.price - ((car.price * 20) / 100);
      return this.carModel.updateOne({_id: car._id}, car).exec()
    });
  }

  async create(car: CarDto, manufacturer: ManufacturerDto, owner: OwnerDto): Promise<ICar> {
    const m = await this.manufacturerService.create(manufacturer);
    car.manufacturerId = m._id;
    const carModel = await this.carModel(car).save();
    owner.carId = carModel._id;
    await this.ownerService.create(owner);
    return carModel
  }

  async findManufactureByCarId(carId: string): Promise<IManufacturer> {
     const car = await this.findCarById(carId);
     return this.manufacturerService.findOneById(car.manufacturerId);
    }

  async delete(_id: string): Promise<boolean> {
   await this.carModel.findOneAndDelete({_id}).exec();
    return true
  }
}
