import {createClient} from 'redis'
import dotenv from 'dotenv'
dotenv.config()

let redisClient : ReturnType<typeof createClient> | null = null;

export const  connectRedis = async () =>{
    try{
        redisClient = createClient({
            url : process.env.REDIS_URL || 'redis://localhost:6379'
        })
        
        redisClient.on("error" , (err)=>{
            console.error('redis facing issues...' , err);
        })
        await redisClient.connect();
        console.log("Redis Connected Successfully");
    }catch(err){
        console.error('Failed to connect to Redis:', err);
        redisClient = null;
    }
}

export const getRedisClient = () => redisClient;