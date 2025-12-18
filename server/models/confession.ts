import mongoose from "mongoose"

const confessionSchema = new mongoose.Schema({
    collegeId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "college"
    },
    title : String,
    description : String,
    type : {
        type : String,
        enum : ["confession" , "crush" , "missed"],
        default : "confession"
    },
    upvotes : { type : Number , default : 0 },
    reports : { type : Number , default : 0}
})

export default mongoose.model("confession" , confessionSchema)