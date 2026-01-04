import {createClient} from 'redis'

let redisClient : ReturnType<typeof createClient> | null = null;

export const  connectRedis = async () =>{
    try{
        redisClient = createClient({
            url : process.env.REDIS_URL || 'redis://localhost:6379'
        })
        if(!process.env.REDIS_URL){
            console.log('redis is not connected env is not present');
            redisClient = null;
            return;
        }
        redisClient.on("error" , (err)=>{
            console.error('redis facing issues...' , err);
        })
        await redisClient.connect();
        console.log("Redis Connected Successfully");
    }catch(err){
        redisClient = null;
    }
}

export const getRedisClient = () => redisClient;