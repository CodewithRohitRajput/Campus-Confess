import mongoose from "mongoose"

const collegeSchema = new mongoose.Schema({
        collegeName : String
})


export default mongoose.model("college" , collegeSchema);
