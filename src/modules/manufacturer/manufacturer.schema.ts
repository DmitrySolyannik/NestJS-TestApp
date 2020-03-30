import * as mongoose from 'mongoose';

export const ManufacturerSchema = new mongoose.Schema({
  id: String,
  name: String,
  phone: String,
  siret: Number
});
