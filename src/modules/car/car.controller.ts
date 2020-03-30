import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CarService } from './services/car.service';
import { CarDto } from './car.dto';
import { ManufacturerDto } from '../manufacturer/manufacturer.dto';
import { OwnerDto } from '../owner/owner.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  /**
   * Get list of cars
   */
  @Get('list')
    getAllCars(): ICar[] {
    return this.carService.findAll()
  }

  /**
   * Process which will automatically remove the owners by date and calculate car discount
   */
  @Get('calculate')
  calculateCarAndOwnerDates(): Promise<boolean> {
    return this.carService.calculateCarAndOwnerDates()
  }

  /**
   * Get car information by id
   */
  @Get('detailed/:id')
  getOneCar(@Param('id') id): Promise<ICar> {
    return this.carService.findCarById(id)
  }

  /**
   * Get manufacturer information by car
   * @param id
   */
  @Get('manufacturer/:id')
  getManufacturerByCar(@Param('id') id): Promise<IManufacturer> {
    return this.carService.findManufactureByCarId(id)
  }

  /**
   * Create car, manufacturer and owner in one request
   * @param car
   * @param manufacturer
   * @param owner
   */
  @Post('create')
  createCar(
    @Body('car') car: CarDto,
    @Body('manufacturer') manufacturer: ManufacturerDto,
    @Body('owner') owner: OwnerDto
  ): Promise<ICar> {
    return this.carService.create(car, manufacturer, owner)
  }

  /**
   * Delete car
   * @param id
   */
  @Delete(':id')
  deleteCar(@Param('id') id): Promise<boolean> {
    return this.carService.delete(id)
  }
}
