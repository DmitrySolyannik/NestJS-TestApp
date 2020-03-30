import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './services/car.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './car.schema';
import { ManufacturerModule } from '../manufacturer/manufacturer.module';
import { OwnerModule } from '../owner/owner.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
    ManufacturerModule,
    OwnerModule
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}
