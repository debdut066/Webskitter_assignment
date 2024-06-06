import mongoose from "mongoose";
mongoose.set("strictQuery", true);

const db = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("database connected......");
  } catch (err) {
    console.log(err, "database not connected");
  }
};

export default db;
