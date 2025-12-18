import mongoose from "mongoose"

const connectDB =  async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/campus_confess")
        console.log("MongoDB Connected successfully");
    }catch(err){
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;