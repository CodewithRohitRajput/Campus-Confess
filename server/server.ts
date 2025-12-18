import express from "express"
import cors from "cors"
import connectDB from "./config/db.ts";
import collegeRouter from "./routes/collegeRoute.ts"
import confessionRouter from "./routes/confessionRoute.ts"
const app = express();

app.use(express.json());
app.use(cors(
        {
            origin : "http://localhost:3000",
            credentials : true
        }
));

await connectDB();


app.use('/college' , collegeRouter);
app.use('/confession' , confessionRouter);

app.listen(8000,()=>{
    console.log(`server is running on port ${8000}`);
})
