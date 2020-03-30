import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnerSchema } from './owner.schema';
import { OwnerService } from './services/owner.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Owner', schema: OwnerSchema }])],
  providers: [OwnerService],
  exports: [OwnerService]
})
export class OwnerModule {}
