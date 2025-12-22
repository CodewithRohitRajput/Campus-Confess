import mongoose from "mongoose"

const connectDB =  async() =>{
    try{
        const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017/campus_confess";
        await mongoose.connect(mongoUrl)
        console.log("MongoDB Connected successfully");
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;