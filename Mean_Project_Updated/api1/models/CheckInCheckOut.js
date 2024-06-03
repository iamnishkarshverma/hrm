import mongoose, { Schema } from "mongoose";
// const Schema = mongoose.Schema;

const checkInCheckOutSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
  checkInTime: { type: Date },
  checkOutTime: { type: Date }
});

export default mongoose.model('CheckInCheckOut', checkInCheckOutSchema);
