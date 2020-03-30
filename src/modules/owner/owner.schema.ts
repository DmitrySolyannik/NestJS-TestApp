import * as mongoose from 'mongoose';

export const OwnerSchema = new mongoose.Schema({
  id: String,
  name: String,
  purchaseDate: Date,
  carId: String
});
