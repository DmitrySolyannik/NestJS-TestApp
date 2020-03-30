import { IsNotEmpty } from 'class-validator';

export class ManufacturerDto {
  name: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  siret: number
}
