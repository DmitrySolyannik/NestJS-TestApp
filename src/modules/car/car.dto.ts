import { IsNotEmpty } from 'class-validator';

export class CarDto {
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  firstRegistrationDate: Date;
  manufacturerId: string
}
