import express from "express"
import type { Request ,Response } from "express"
import confession from "../models/confession.js"
import { getRedisClient } from "../config/redis.js"

export const addConfession = async (req : Request , res : Response) => {
    try{
    const collegeId = req.params.collegeId;
    const { title , description , type , upvotes , reports} = req.body;
    const newConfession =  new confession({collegeId, title , description ,type , upvotes , reports});
    await newConfession.save();
    const redis = getRedisClient();
    if(redis){
        await redis.del(`confession:${collegeId}`)
    }
   return res.status(200).json({message : "Confession saved"});
    }catch(err){
        console.error(err);
    }
}


export const seeConfession = async (req : Request , res : Response) => {
    try{
        const collegeId = req.params.collegeId
        const redis = getRedisClient();
        if(redis){
        const cachedValue = await redis.get(`confession:${collegeId}`);
        if(cachedValue){
            return res.status(200).json({allConfessions : JSON.parse(cachedValue)});
        }
        }
        // const {collegeId} = req.body;
        const allConfessions = await confession.find({collegeId}).populate("collegeId");
        if(redis){
            await redis.setEx(`confession:${collegeId}` , 3600 ,    JSON.stringify(allConfessions))
        }
        return res.status(200).json({allConfessions});
    }catch(err){
        console.error('controller server error...' , err)
    }

}

