import { IsNotEmpty } from 'class-validator';

export class OwnerDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  purchaseDate: Date;
  carId: string;
}
