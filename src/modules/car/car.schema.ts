import * as mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({
  id: String,
  price: Number,
  firstRegistrationDate: Date,
  manufacturerId: String
});
