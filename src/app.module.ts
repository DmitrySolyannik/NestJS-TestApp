import { Module } from '@nestjs/common';
import { CarModule } from './modules/car/car.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ManufacturerModule } from './modules/manufacturer/manufacturer.module';
import { OwnerModule } from './modules/owner/owner.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './core/error.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://mongo/nest',  { useNewUrlParser: true, useUnifiedTopology: true } ),
    CarModule,
    ManufacturerModule,
    OwnerModule
  ],
  controllers: [],
  providers: [{
    provide: APP_INTERCEPTOR,
    useClass: ErrorsInterceptor,
  },],
})
export class AppModule {}
