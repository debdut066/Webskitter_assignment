import express from "express";
import dotenv from "dotenv";
import db from "./config/database.js";
import fileUpload from "express-fileupload"
import authRoute from "./routes/auth.routes.js";
import userRoute from "./routes/user.routes.js"
import categoryRoutes from "./routes/category.routes.js"
import Question from "./schema/question.schema.js"
import questionRoutes from "./routes/question.routes.js"
import mongoose from "mongoose";
dotenv.config();

const app = express();
db();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload({
    limits : { fileSize : 50 * 1024 * 1024 },
    useTempFiles : true,
    tempFileDir : "/tmp/"
}))

//Importing auth routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/categories", categoryRoutes);
app.use("/api/questions", questionRoutes);

app.post('/question',async (req, res)=>{
    try {
        const CategoryData = new Question({
            _id : new mongoose.Types.ObjectId(),
            text : "Who painted the Mona Lisa?",
            category : "art"
        });

        const category = await CategoryData.save();
        res.status(200).json(category)
    } catch (error) {
        console.log(error);
    }
})

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
  
    return res.status(errorStatus).send(errorMessage);
});

app.listen(process.env.PORT, () => {
    console.log(`backend server running at ${process.env.PORT}`);
});
  