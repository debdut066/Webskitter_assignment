import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    _id : { type : mongoose.Schema.Types.ObjectId },
    username: { type: String, required: true, unqiue: true, trim: true },
    img: { type: String, required: false, default : "http://storage.googleapis.com/dexbros_files/7a8ffc50-ec78-11ec-b0c6-9578be74f170-blank-profile-picture-973460_640.webp" },
    password : { type : String , required : true }
  },
  {
    timestamps: true,
  }
);

userSchema.index({ username: 1 }, { unique: true });

export default mongoose.model("User", userSchema);
