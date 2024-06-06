import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    _id : { type : mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true, unique: true }
},{
    timestamps: true,
  }
);

export default mongoose.model('Category', categorySchema);