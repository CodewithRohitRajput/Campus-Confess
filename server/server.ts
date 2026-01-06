import express from "express"
import cors from "cors"
import connectDB from "./config/db.js";
import collegeRouter from "./routes/collegeRoute.js"
import confessionRouter from "./routes/confessionRoute.js"
import { connectRedis } from "./config/redis.js";
// import cluster from "cluster";
// import os from 'os'
// import process from "process";


// const cpuCores = os.cpus().length;
// console.log('cpu',cpuCores)

// if(cluster.isPrimary){
//     for(let i=0; i<cpuCores;i++){
//         cluster.fork();
//     }
// }else{

    
    const app = express();
    
    app.use(express.json());
    app.use(cors(
        {
            origin : ["https://campus-confess.vercel.app" , "http://localhost:3000"],
            credentials : true
        }
    ));
    
     connectDB();
     connectRedis();
    
    
    app.use('/college' , collegeRouter);
    app.use('/confession' , confessionRouter);
    
    app.listen(8000,()=>{
        console.log(`server is running on port ${8000}`);
    })
    
// }