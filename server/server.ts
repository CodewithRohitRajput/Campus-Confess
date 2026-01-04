import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import collegeRouter from "./routes/collegeRoute.js"
import confessionRouter from "./routes/confessionRoute.js"
import { connectRedis } from "./config/redis.js";
const app = express();

app.use(express.json());
app.use(cors(
        {
            origin : ["https://campus-confess.vercel.app" , "http://localhost:3000"],
            credentials : true
        }
));

await connectDB();
await connectRedis();


app.use('/college' , collegeRouter);
app.use('/confession' , confessionRouter);

app.listen(8000,()=>{
    console.log(`server is running on port ${8000}`);
})
