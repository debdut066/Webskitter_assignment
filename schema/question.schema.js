import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    _id : { type : mongoose.Schema.Types.ObjectId },
    text: { type: String, required: true },
    category: { type : String, required : true }
},{
    timestamps: true,
});

export default mongoose.model('Question', questionSchema);